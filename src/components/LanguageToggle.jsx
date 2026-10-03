import { useLanguage } from '../language.js'

// Frosted pill with a white thumb that slides under the active language.
// It's one <button> (so the magnetic cursor moves it as a whole):
// clicking a label picks that language, the keyboard (Enter/Space) flips it.
export default function LanguageToggle() {
  const { lang, setLang, t } = useLanguage()

  function handleClick(e) {
    const picked = e.target.closest('[data-lang]')?.dataset.lang
    setLang(picked ?? (lang === 'en' ? 'tr' : 'en'))
  }

  return (
    <button
      type="button"
      className={`lang-toggle is-${lang}`}
      onClick={handleClick}
      aria-label={t.switchTo}
    >
      <span className="lang-thumb" aria-hidden="true" />
      <span className="lang-option" data-lang="en" aria-hidden="true">EN</span>
      <span className="lang-option" data-lang="tr" aria-hidden="true">TR</span>
    </button>
  )
}
