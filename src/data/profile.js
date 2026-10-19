// About-page content: story, experience, education and skills.
// Same pattern as projects.js: language-dependent text is an { en, tr } pair.

export const story = {
  en: [
    'I graduated in Computer Programming from Mersin University and I’m continuing with a bachelor’s degree in Management Information Systems at Istanbul University. I’m also an AI Fellow at the Artificial Intelligence and Technology Academy, in a program focused on Python and AI.',
    'I like working where frontend development and interface design meet: I design interfaces in Figma, and I’m building my web skills step by step with HTML, CSS, JavaScript and React.',
  ],
  tr: [
    'Mersin Üniversitesi Bilgisayar Programcılığı mezunuyum; İstanbul Üniversitesi’nde Yönetim Bilişim Sistemleri lisans eğitimime devam ediyorum. Yapay Zeka ve Teknoloji Akademisi’nde AI Fellow olarak Python ve yapay zekâ odaklı bir programda yer alıyorum.',
    'Frontend geliştirme ile arayüz tasarımının buluştuğu yerde çalışmayı seviyorum: Figma’da arayüz tasarlıyor, web becerilerimi HTML, CSS, JavaScript ve React ile adım adım geliştiriyorum.',
  ],
}

export const experience = [
  {
    role: { en: 'Artificial Intelligence Fellow', tr: 'Yapay Zeka Bursiyeri (AI Fellow)' },
    org: 'Yapay Zeka ve Teknoloji Akademisi',
    period: { en: 'Dec 2025 – present', tr: 'Ara 2025 – devam ediyor' },
    place: { en: 'Remote', tr: 'Uzaktan' },
    description: {
      en: 'One of ~1,500 fellows selected from 31,700 applicants (~4.7% acceptance), in a program run with Google Türkiye, the Turkish Entrepreneurship Foundation and T3. Focus: AI development with Python and technology entrepreneurship.',
      tr: '31.700 başvuru arasından seçilen yaklaşık 1.500 bursiyerden biriyim (~%4,7 kabul). Google Türkiye, Türkiye Girişimcilik Vakfı ve T3 iş birliğiyle yürütülen program; odak: Python ile yapay zekâ geliştirme ve teknoloji girişimciliği.',
    },
  },
  {
    role: { en: 'Software Development Intern', tr: 'Yazılım Geliştirme Stajyeri' },
    org: 'Adana Büyükşehir Belediyesi',
    period: { en: 'Jun – Aug 2025', tr: 'Haz – Ağu 2025' },
    place: { en: 'Adana', tr: 'Adana' },
    description: {
      en: 'Built a responsive web prototype with HTML, CSS and JavaScript for following municipal events and sending citizen requests. Researched the groundwork for a minibus tracking system.',
      tr: 'Belediye etkinliklerinin takip edilebileceği ve vatandaş taleplerinin iletilebileceği, farklı ekranlara uyumlu bir web prototipi geliştirdim (HTML, CSS, JavaScript). Minibüs takip sistemi altyapısı için araştırma yaptım.',
    },
  },
]

export const education = [
  {
    degree: { en: 'Management Information Systems (BSc)', tr: 'Yönetim Bilişim Sistemleri (Lisans)' },
    school: { en: 'Istanbul University', tr: 'İstanbul Üniversitesi' },
    period: { en: 'In progress', tr: 'Devam ediyor' },
  },
  {
    degree: { en: 'Computer Programming (Associate degree)', tr: 'Bilgisayar Programcılığı (Önlisans)' },
    school: { en: 'Mersin University', tr: 'Mersin Üniversitesi' },
    period: { en: 'Sep 2023 – May 2025', tr: 'Eyl 2023 – May 2025' },
  },
]

// learning: true -> shown with a "learning" badge (honest about where I am)
export const skills = [
  {
    group: { en: 'Web', tr: 'Web' },
    items: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript', learning: true }, { name: 'React', learning: true }],
  },
  {
    group: { en: 'Design & mobile', tr: 'Tasarım & mobil' },
    items: [{ name: 'Figma' }, { name: 'Android', learning: true }, { name: 'React Native', learning: true }],
  },
  {
    group: { en: 'AI & backend', tr: 'Yapay zekâ & backend' },
    items: [{ name: 'Python' }, { name: 'LangChain' }, { name: 'FastAPI' }, { name: 'Streamlit' }, { name: 'Claude' }],
  },
  {
    group: { en: 'Tools & data', tr: 'Araçlar & veri' },
    items: [{ name: 'Git' }, { name: 'GitHub' }, { name: 'SQL Server' }],
  },
]
