import { createContext, useContext } from 'react'

// Every page needs the current language, so it lives in a context instead of
// being passed down through props one level at a time.
// (The provider component is in LanguageContext.jsx.)
export const LanguageContext = createContext(null)

// Usage in any component: const { t, lang, setLang } = useLanguage()
export function useLanguage() {
  return useContext(LanguageContext)
}
