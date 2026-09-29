"""
Pre-extract head-direction frames from public/character.mp4.

The video is NOT a clean 360° loop: the head wanders
(up -> right -> down -> left -> up -> right -> up-left -> left -> center).
So instead of slicing the timeline, we MEASURE where the character is looking
in every frame (nose position = head turn, iris position = eye gaze), then pick
the best frame for each of 64 target angles.

Output:
  public/frames/00.webp .. 63.webp   (frame i looks at angle i * 5.625°, 0° = right, clockwise, screen coords)
  public/frames/center.webp          (neutral, looking at the camera)
  public/frames/manifest.json        (background color, face center, source frame numbers)

Run:  python scripts/extract_frames.py
Needs: pip install opencv-python mediapipe
"""
import json
from pathlib import Path

import cv2
import mediapipe as mp
import numpy as np
from mediapipe.tasks.python import BaseOptions, vision

ROOT = Path(__file__).resolve().parent.parent
VIDEO = ROOT / "public" / "character.mp4"
MODEL = Path(__file__).resolve().parent / "models" / "face_landmarker.task"
OUT = ROOT / "public" / "frames"

N_FRAMES = 64
CROP_X = (0, 1920)            # full frame: the hero canvas covers the whole viewport
WEBP_QUALITY = 84
NEUTRAL_RANGE = range(180, 192)  # last half second: looking straight at the camera
MIN_MAGNITUDE = 0.5           # ignore frames that are too close to neutral to count as a direction
CONTINUITY = 0.6              # degrees of error we accept per frame-index jump (keeps neighbours similar)

COMPASS = {"RIGHT": 0, "DOWN_RIGHT": 45, "DOWN": 90, "DOWN_LEFT": 135,
           "LEFT": 180, "UP_LEFT": -135, "UP": -90, "UP_RIGHT": -45}


def read_frames():
    cap = cv2.VideoCapture(str(VIDEO))
    fps = cap.get(cv2.CAP_PROP_FPS)
    frames = []
    while True:
        ok, f = cap.read()
        if not ok:
            break
        frames.append(f)
    return frames, fps


def measure(frames):
    """Per frame: nose (x, y) in pixels, iris gaze (x, y), eye openness."""
    opts = vision.FaceLandmarkerOptions(base_options=BaseOptions(model_asset_path=str(MODEL)),
                                        output_face_blendshapes=True, num_faces=1)
    lm = vision.FaceLandmarker.create_from_options(opts)
    h, w = frames[0].shape[:2]
    rows = []
    for f in frames:
        r = lm.detect(mp.Image(image_format=mp.ImageFormat.SRGB, data=cv2.cvtColor(f, cv2.COLOR_BGR2RGB)))
        L = r.face_landmarks[0]
        P = lambda k: np.array([L[k].x, L[k].y])

        def gaze(iris, a, b):
            return (P(iris) - (P(a) + P(b)) / 2) / np.linalg.norm(P(b) - P(a))

        g = (gaze(468, 33, 133) + gaze(473, 362, 263)) / 2
        blend = {c.category_name: c.score for c in r.face_blendshapes[0]}
        blink = max(blend["eyeBlinkLeft"], blend["eyeBlinkRight"])
        rows.append([L[1].x * w, L[1].y * h, g[0], g[1], blink])
    return np.array(rows)


def look_vectors(m):
    neutral = m[list(NEUTRAL_RANGE)].mean(0)
    head_x = (m[:, 0] - neutral[0]) / 150
    head_y = (m[:, 1] - neutral[1]) / 90
    gaze_x = (m[:, 2] - neutral[2]) / 0.3
    gaze_y = (m[:, 3] - neutral[3]) / 0.15
    vx, vy = head_x + 0.6 * gaze_x, head_y + 0.6 * gaze_y
    return np.degrees(np.arctan2(vy, vx)), np.hypot(vx, vy), neutral


def ang_diff(a, b):
    return np.abs((a - b + 180) % 360 - 180)


def choose_frames(angles, mags, blinks):
    """Viterbi: for each of the 64 target angles pick a frame, minimising
    angular error + a penalty for jumping far in the video between neighbours."""
    cand = np.where((mags > MIN_MAGNITUDE) & (blinks < 0.35))[0]
    targets = np.arange(N_FRAMES) * 360 / N_FRAMES
    unary = np.array([ang_diff(angles[cand], t) for t in targets])          # (64, C)
    trans = CONTINUITY * np.abs(cand[:, None] - cand[None, :])               # (C, C)
    cost, back = unary[0].copy(), []
    for k in range(1, N_FRAMES):
        total = cost[:, None] + trans
        back.append(total.argmin(0))
        cost = total.min(0) + unary[k]
    path = [int(cost.argmin())]
    for b in reversed(back):
        path.append(int(b[path[-1]]))
    path.reverse()
    return [int(cand[p]) for p in path], targets


def main():
    frames, fps = read_frames()
    print(f"video: {len(frames)} frames @ {fps:.0f} fps = {len(frames) / fps:.2f}s, {frames[0].shape[1]}x{frames[0].shape[0]}")

    m = measure(frames)
    angles, mags, neutral = look_vectors(m)

    # 8 compass directions: strongest frame whose angle is within 22.5° of the direction
    print("\ncompass directions (source frame numbers):")
    compass = {}
    for name, deg in COMPASS.items():
        ok = np.where((ang_diff(angles, deg) < 22.5) & (m[:, 4] < 0.35))[0]
        best = int(ok[mags[ok].argmax()]) if len(ok) else None
        compass[name] = best
        print(f"  {name:10s} {deg:5d}°  frame {best}")
    center_idx = min(NEUTRAL_RANGE, key=lambda i: mags[i])
    print(f"  CENTER            frame {center_idx}")

    picks, targets = choose_frames(angles, mags, m[:, 4])

    OUT.mkdir(parents=True, exist_ok=True)
    x0, x1 = CROP_X
    save = lambda idx, name: cv2.imwrite(str(OUT / name), frames[idx][:, x0:x1],
                                         [cv2.IMWRITE_WEBP_QUALITY, WEBP_QUALITY])
    print("\n64 frames (target angle -> source frame, measured angle):")
    for k, idx in enumerate(picks):
        save(idx, f"{k:02d}.webp")
        print(f"  {k:02d}  {targets[k]:6.1f}°  <- frame {idx:3d} ({angles[idx]:6.1f}°)")
    save(center_idx, "center.webp")

    # Background: the band right next to the character at head height (the video has a slight vignette)
    ref = frames[center_idx]
    band = np.concatenate([ref[0:600, x0:x0 + 40].reshape(-1, 3), ref[0:600, x1 - 40:x1].reshape(-1, 3)])
    b, g, r = np.median(band, axis=0).astype(int)
    bg = f"#{r:02x}{g:02x}{b:02x}"
    print(f"\nbackground: {bg}")

    manifest = {
        "count": N_FRAMES,
        "width": x1 - x0,
        "height": ref.shape[0],
        "background": bg,
        # face center (neutral nose tip) as a fraction of the cropped frame
        "face": {"x": round((neutral[0] - x0) / (x1 - x0), 4), "y": round(neutral[1] / ref.shape[0], 4)},
        "compass": compass,
        "center": center_idx,
        "sources": picks,
    }
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2))
    print("wrote", OUT)


if __name__ == "__main__":
    main()
