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
      bio: 'Full stack developer building fast, thoughtful web apps — from pixel-perfect React interfaces to the APIs and databases behind them.',
      resume: 'Resume',
      talk: "Let's Talk",
      portrait: 'Illustrated portrait of Ece that follows your cursor',
    },
    work: {
      title: 'Work',
      intro: 'Selected projects I have built.',
    },
    about: {
      title: 'About',
      intro: 'Who I am and how I got here.',
    },
    contact: {
      title: 'Contact',
      intro: 'Have a project in mind? Let’s talk.',
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
      bio: 'Hızlı ve özenli web uygulamaları geliştiren full stack geliştiriciyim — piksel piksel React arayüzlerinden arkalarındaki API ve veritabanlarına kadar.',
      resume: 'Özgeçmiş',
      talk: 'Konuşalım',
      portrait: 'Ece’nin imleci takip eden illüstrasyon portresi',
    },
    work: {
      title: 'Projeler',
      intro: 'Geliştirdiğim projelerden seçmeler.',
    },
    about: {
      title: 'Hakkımda',
      intro: 'Kimim ve buraya nasıl geldim.',
    },
    contact: {
      title: 'İletişim',
      intro: 'Aklında bir proje mi var? Konuşalım.',
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
