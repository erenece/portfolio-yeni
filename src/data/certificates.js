// Certificates shown on the About page.
//  kind: 'completion'    -> finished a course/program (shown as cards)
//        'participation' -> attended an event (shown in a compact list)
//  featured: true        -> the big card at the top
//  date: 'YYYY-MM'       -> formatted per language by the page (e.g. "Jul 2026" / "Tem 2026")
//  inProgress: true      -> still studying it: shows "In progress" instead of a date
//  tags                  -> topics covered, shown as small chips
//  url                   -> adds a "Verify" button
//  description           -> optional { en, tr } "what I learned" text (coming later)
//  show: false           -> kept here but hidden on the site
export const certificates = [
  {
    kind: 'completion',
    featured: true,
    title: { en: 'Google Project Management Professional Certificate', tr: 'Google Proje Yönetimi Profesyonel Sertifikası' },
    issuer: 'Google · Coursera',
    date: '2026-07',
    url: 'https://www.coursera.org/account/accomplishments/specialization/FNIEBU8DW3OX',
    tags: ['Agile', 'Scrum', { en: 'Project planning', tr: 'Proje planlama' }],
  },
  {
    kind: 'completion',
    inProgress: true,
    title: { en: 'The Complete Web Development Bootcamp', tr: 'The Complete Web Development Bootcamp' },
    issuer: 'Udemy · Angela Yu',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    kind: 'completion',
    title: { en: 'Deep Learning', tr: 'Derin Öğrenme' },
    issuer: 'YZTA',
    date: '2026-04',
    tags: ['NLP', 'LLM Engineering', 'AI Agents'],
  },
  {
    kind: 'completion',
    title: { en: 'Web Application Development', tr: 'Web Uygulamaları Geliştirme' },
    issuer: 'YZTA',
    date: '2026-03',
    tags: ['FastAPI', 'Docker', 'Gemini API'],
  },
  {
    kind: 'completion',
    title: { en: 'Legal Essentials for Entrepreneurs', tr: 'Girişimciler için Hukuk' },
    issuer: 'YZTA',
    date: '2026-03',
  },
  {
    kind: 'completion',
    title: { en: 'Human Resources for Entrepreneurs', tr: 'Girişimciler için İK' },
    issuer: 'YZTA',
    date: '2026-03',
  },
  {
    kind: 'completion',
    title: { en: 'Fundamentals of Entrepreneurship', tr: 'Temel Girişimcilik' },
    issuer: 'YZTA',
    date: '2026-02',
  },
  {
    kind: 'completion',
    title: { en: 'Finance for Entrepreneurs', tr: 'Girişimciler için Finans' },
    issuer: 'YZTA',
    date: '2026-02',
  },
  {
    kind: 'completion',
    title: { en: 'Game Development from Scratch: Unity & C#', tr: 'Sıfırdan Oyun Geliştirme: Unity & C#' },
    issuer: 'Udemy',
    date: '2025-10',
    url: 'https://www.udemy.com/certificate/UC-e2d40ee0-10ef-4b08-bf95-795d904fab28/',
  },

  {
    kind: 'participation',
    title: { en: 'Women in Tech: Inspiring Women Stories', tr: 'Women in Tech: Inspiring Women Stories' },
    issuer: 'coderspace',
    date: '2026-03',
  },
  {
    kind: 'participation',
    title: { en: 'Yapay Zekaya Meydan Oku (Challenge AI)', tr: 'Yapay Zekaya Meydan Oku' },
    issuer: 'Kodluyoruz',
    date: '2025-07',
  },
  {
    kind: 'participation',
    title: { en: 'Occupational Health and Safety', tr: 'İş Sağlığı ve Güvenliği' },
    issuer: 'MEÜ',
    date: '2025-05',
    show: false, // not related to software roles
  },
  {
    kind: 'participation',
    title: { en: 'Traditional and Advanced Entrepreneurship', tr: 'Geleneksel ve İleri Girişimcilik' },
    issuer: 'KOSGEB',
    date: '2025-03',
  },
  {
    kind: 'participation',
    title: { en: 'TechVision Summit', tr: 'TechVision Summit' },
    issuer: 'Talent Coders',
    date: '2024-04',
  },
  {
    kind: 'participation',
    title: { en: 'Blockchain Anadolu Seminars', tr: 'Blockchain Anadolu Seminerleri' },
    issuer: 'MEÜ',
    date: '2024-03',
  },
]
