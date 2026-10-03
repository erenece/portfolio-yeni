import { useEffect, useState } from 'react'
import { getInitialLang, saveLang, translations } from './i18n.js'
import { LanguageContext } from './language.js'

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  // <html lang> matters: screen readers pick the voice from it, and CSS
  // uppercase needs it to turn Turkish "i" into "İ" (not "I").
  useEffect(() => {
    document.documentElement.lang = lang
    saveLang(lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}
