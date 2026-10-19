// Every piece of text on the site, once per language.
// Components read from here instead of hard-coding strings.
export const translations = {
  en: {
    nav: { home: 'Home', work: 'Work', about: 'About', contact: 'Contact' },
    switchTo: 'Türkçe’ye geç',
    comingSoon: 'Content coming soon.',

    home: {
      title: 'Ece — Portfolio',
      hello: "Hi, I'm",
      bio: 'I bring frontend development and interface design together: I design in Figma and build with HTML, CSS, JavaScript and React, which I’m learning right now.',
      resume: 'Resume',
      resumeUrl: '/cv/Ece_Eren_CV_EN.pdf',
      talk: "Let's Talk",
      portrait: 'Illustrated portrait of Ece that follows your cursor',
    },
    work: {
      title: 'Work',
      intro: 'Selected projects I have built.',
      view: 'View project',
      back: 'All projects',
      role: 'Role',
      context: 'Context',
      period: 'Date',
      highlights: 'Highlights',
      contributions: 'My contributions',
      stack: 'Tech stack',
      productStack: 'Product tech stack (team)',
      github: 'View on GitHub',
      noVideo: 'Your browser can’t play this video.',
    },
    about: {
      title: 'About',
      intro: 'Who I am and how I got here.',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      learning: 'learning',
      inProgress: 'In progress',
      certificates: 'Certificates',
      completed: 'Courses & programs',
      events: 'Events & participation',
      verify: 'Verify',
    },
    contact: {
      title: 'Contact',
      intro: 'Frontend, UI/UX or a small web project? Email is the best way to reach me.',
      emailLabel: 'Email',
      write: 'Write to me',
      copy: 'Copy address',
      copied: 'Copied ✓',
      reply: 'I usually reply within 24 hours. A short hello is enough.',
      nowLabel: 'Right now',
      open: 'Open to internships and junior frontend roles',
      location: 'Adana, Türkiye · open to remote work',
    },
    notFound: {
      title: 'Page not found',
      intro: 'The page you’re looking for doesn’t exist.',
      back: 'Back to home',
    },
  },

  tr: {
    nav: { home: 'Ana sayfa', work: 'Projeler', about: 'Hakkımda', contact: 'İletişim' },
    switchTo: 'Switch to English',
    comingSoon: 'İçerik yakında eklenecek.',

    home: {
      title: 'Ece — Portfolyo',
      hello: 'Merhaba, ben',
      bio: 'Frontend geliştirmeyi ve arayüz tasarımını bir araya getiriyorum: Figma’da tasarlıyor, HTML, CSS, JavaScript ve şu an öğrendiğim React ile hayata geçiriyorum.',
      resume: 'Özgeçmiş',
      resumeUrl: '/cv/Ece_Eren_CV_TR.pdf',
      talk: 'Konuşalım',
      portrait: 'Ece’nin imleci takip eden illüstrasyon portresi',
    },
    work: {
      title: 'Projeler',
      intro: 'Geliştirdiğim projelerden seçmeler.',
      view: 'Projeyi incele',
      back: 'Tüm projeler',
      role: 'Rol',
      context: 'Kapsam',
      period: 'Tarih',
      highlights: 'Öne çıkanlar',
      contributions: 'Katkılarım',
      stack: 'Teknolojiler',
      productStack: 'Ürünün teknolojileri (takım)',
      github: 'GitHub’da incele',
      noVideo: 'Tarayıcın bu videoyu oynatamıyor.',
    },
    about: {
      title: 'Hakkımda',
      intro: 'Kimim ve buraya nasıl geldim.',
      experience: 'Deneyim',
      education: 'Eğitim',
      skills: 'Yetenekler',
      learning: 'öğreniyorum',
      inProgress: 'Devam ediyor',
      certificates: 'Sertifikalar',
      completed: 'Eğitimler ve programlar',
      events: 'Etkinlik ve katılımlar',
      verify: 'Doğrula',
    },
    contact: {
      title: 'İletişim',
      intro: 'Frontend, UI/UX ya da küçük bir web projesi için en kolay yol e-posta.',
      emailLabel: 'E-posta',
      write: 'E-posta gönder',
      copy: 'Adresi kopyala',
      copied: 'Kopyalandı ✓',
      reply: 'Genelde 24 saat içinde dönüş yaparım. Kısa bir merhaba bile yeterli.',
      nowLabel: 'Şu an',
      open: 'Staj ve junior frontend pozisyonlarına açığım',
      location: 'Adana · uzaktan çalışmaya uygun',
    },
    notFound: {
      title: 'Sayfa bulunamadı',
      intro: 'Aradığın sayfa mevcut değil.',
      back: 'Ana sayfaya dön',
    },
  },
}

export const LANGUAGES = ['en', 'tr']
const STORAGE_KEY = 'lang'

// Saved choice first, then the browser's language, then English.
export function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (LANGUAGES.includes(saved)) return saved
  } catch {
    // storage can be blocked (private mode); fall through
  }
  return navigator.language?.toLowerCase().startsWith('tr') ? 'tr' : 'en'
}

export function saveLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // not critical: the site still works, it just won't remember
  }
}
