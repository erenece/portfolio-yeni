// All projects in one place. Work.jsx lists them, ProjectDetail.jsx shows one.
// Text that changes with the language is an { en, tr } pair; names of
// technologies stay the same in both languages.
//
// To add a project: copy one object, give it a unique `slug` (it becomes the
// URL: /work/<slug>) and fill in the fields. Newest first.
// image / video are paths inside /public (optional: without an image the card
// shows the accent-colour artwork instead).
export const projects = [
  {
    slug: 'gastromic',
    title: 'Gastromic',
    accent: '#ff7a59',
    period: { en: 'Jun – Aug 2026', tr: 'Haz – Ağu 2026' },
    context: { en: 'YZTA Bootcamp · Team of 5', tr: 'YZTA Bootcamp · 5 kişilik takım' },
    role: { en: 'Product Owner · UI design', tr: 'Product Owner · UI tasarımı' },
    summary: {
      en: 'A cross-platform mobile app that plans food routes for travellers based on budget, location and dietary restrictions, filtering out tourist traps.',
      tr: 'Gezginlere bütçe, konum ve beslenme kısıtlarına göre yemek rotası çıkaran, turist tuzaklarını eleyen çapraz platform mobil uygulama.',
    },
    highlights: {
      en: [
        'Product Owner across three Scrum sprints: prioritised a ~340-point backlog with MoSCoW in GitHub Projects',
        'Designed the app icon and the splash animation',
        'Designed and built the Settings and profile screens in Flutter',
        'Wrote the sprint documentation and reviews, and worked with the developers on design consistency',
      ],
      tr: [
        'Üç Scrum sprinti boyunca Product Owner: yaklaşık 340 puanlık backlog’u GitHub Projects’te MoSCoW ile önceliklendirdim',
        'Uygulama ikonunu ve splash animasyonunu tasarladım',
        'Ayarlar ve profil ekranlarını tasarlayıp Flutter ile kodladım',
        'Sprint dokümantasyonunu ve review’ları yazdım, tasarım tutarlılığı için geliştiricilerle birlikte çalıştım',
      ],
    },
    // team project: this is the product's stack, not only what I wrote
    teamStack: true,
    stack: ['Flutter', 'Dart', 'FastAPI', 'Firebase', 'CrewAI', 'RAG', 'Google Places API'],
    links: { github: 'https://github.com/erenece/Gastromic' },
    image: '/projects/gastromic.jpg',
    imagePosition: 'center 18%', // tall phone screenshot: show its upper part
    video: '/videos/gastromic.webm',
    videoPortrait: true,
  },
  {
    slug: 'aura-ai',
    title: 'Aura.AI',
    accent: '#c9a2ff',
    period: { en: 'May 2026', tr: 'Mayıs 2026' },
    context: { en: 'YZTA 5.0 Hackathon · Solo', tr: 'YZTA 5.0 Hackathon · Solo' },
    role: { en: 'Solo developer', tr: 'Tek geliştirici' },
    summary: {
      en: 'A WhatsApp assistant for boutique jewellery stores that handles orders, stock, shipping and customer messages in one place.',
      tr: 'Butik takı mağazaları için sipariş, stok, kargo ve müşteri mesajlarını tek yerde yöneten WhatsApp asistanı.',
    },
    highlights: {
      en: [
        'A Gemini 2.5 Flash agent with function calling (13 tools) answers customers on WhatsApp: order status, stock and shipping',
        'RAG search over the product catalogue with Gemini embeddings',
        'Inventory, orders, suppliers and shipment tracking in a FastAPI + SQLite backend, managed from a web admin panel',
        'Built solo for the “Autonomous AI Agents” category of the YZTA 5.0 Hackathon',
      ],
      tr: [
        'Function calling (13 araç) kullanan bir Gemini 2.5 Flash ajanı, WhatsApp’tan müşterilerin sipariş, stok ve kargo sorularını yanıtlıyor',
        'Gemini embeddings ile ürün kataloğunda RAG tabanlı arama',
        'Stok, sipariş, tedarikçi ve kargo takibi FastAPI + SQLite backend’inde; yönetimi web paneli üzerinden',
        'YZTA 5.0 Hackathon “Otonom Yapay Zeka Ajanları” kategorisi için tek başıma geliştirdim',
      ],
    },
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Gemini 2.5 Flash', 'RAG', 'Twilio', 'WhatsApp Business API'],
    links: { github: 'https://github.com/erenece/aura.ai' },
    image: '/projects/aura-ai.jpg',
    video: '/videos/aura-ai.mp4',
  },
  {
    slug: 'docmind-ai',
    title: 'DocMind-AI',
    accent: '#7fd6c2',
    period: { en: 'Apr 2026', tr: 'Nisan 2026' },
    context: { en: 'Personal project', tr: 'Kişisel proje' },
    role: { en: 'Solo developer', tr: 'Tek geliştirici' },
    summary: {
      en: 'Upload PDF, Word or text files and ask questions about them; the answers come only from your documents.',
      tr: 'PDF, Word ya da metin dosyalarını yükleyip onlar hakkında soru sorabildiğin, cevapları yalnızca belgelerden üreten bir analiz aracı.',
    },
    highlights: {
      en: [
        'RAG pipeline with LangChain: documents are split, embedded (all-MiniLM-L6-v2) and indexed in FAISS',
        'Llama 3.1 8B on Groq generates answers within seconds',
        'Streamlit interface, plus a FastAPI service with streaming responses',
        'Dockerised for a one-command setup',
      ],
      tr: [
        'LangChain ile RAG akışı: belgeler parçalanıyor, vektöre çevriliyor (all-MiniLM-L6-v2) ve FAISS’te indeksleniyor',
        'Groq üzerinde çalışan Llama 3.1 8B, cevapları saniyeler içinde üretiyor',
        'Streamlit arayüzü ve cevapları akış halinde gönderen bir FastAPI servisi',
        'Tek komutla kurulum için Docker desteği',
      ],
    },
    stack: ['Python', 'LangChain', 'FAISS', 'Groq', 'Llama 3.1', 'Streamlit', 'FastAPI', 'Docker'],
    links: { github: 'https://github.com/erenece/DocMind-AI' },
    image: '/projects/docmind-ai.jpg',
    video: '/videos/docmind-ai.mp4',
  },
  {
    slug: 'expotrack',
    title: 'ExpoTrack',
    accent: '#ffd36e',
    period: { en: 'May 2025', tr: 'Mayıs 2025' }, // first database migration: 20 May 2025
    context: { en: 'Mersin University · Graduation project', tr: 'Mersin Üniversitesi · Bitirme projesi' },
    role: { en: 'Developer', tr: 'Geliştirici' },
    summary: {
      en: 'A web app for organising trade fairs: events, participating companies and their relations, with Excel import and export.',
      tr: 'Fuar organizasyonu için bir web uygulaması: fuarlar, katılımcı firmalar ve aralarındaki ilişkiler; Excel’e içe ve dışa aktarım ile.',
    },
    highlights: {
      en: [
        'Create, update and list fairs and the companies taking part in each one',
        'Bulk import participant lists from Excel and export event data back to Excel',
        'ASP.NET Core MVC structure with Entity Framework Core and SQL Server',
        'User accounts with login',
      ],
      tr: [
        'Fuarları ve her fuara katılan firmaları oluşturma, güncelleme ve listeleme',
        'Katılımcı listelerini Excel’den toplu içe aktarma, fuar verilerini Excel’e dışa aktarma',
        'Entity Framework Core ve SQL Server ile ASP.NET Core MVC yapısı',
        'Giriş yapılan kullanıcı hesapları',
      ],
    },
    stack: ['C#', 'ASP.NET Core MVC', 'Entity Framework Core', 'SQL Server', 'Excel'],
    links: { github: 'https://github.com/erenece/ExpoTrack' },
  },
]

export function findProject(slug) {
  return projects.find((project) => project.slug === slug)
}
