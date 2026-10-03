import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import { LanguageProvider } from './LanguageContext.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import Work from './pages/Work.jsx'

// URL -> page. Every route sits inside <Layout>, so the navbar,
// language toggle and cursor are shared; only the page in the middle changes.
export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="work" element={<Work />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
