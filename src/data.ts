// Everything the site says lives here, in Turkish and English, so a text
// change never touches a component. `METINLER.md` mirrors the Turkish texts.

export type Lang = 'tr' | 'en'
export const LANGS: Lang[] = ['tr', 'en']

export const CV_URL = `${import.meta.env.BASE_URL}Sila-Bayram-CV.pdf`

/* ---------- Ids shared by both languages ---------- */

export type SceneId = 'cover' | 'curiosity' | 'order' | 'product' | 'bridge' | 'music'
export const SCENE_IDS: SceneId[] = ['cover', 'curiosity', 'order', 'product', 'bridge', 'music']

export type ProjectId = 'talentagent' | 'ajan' | 'devops' | 'ofis' | 'hukuk'
export const TEAM_FILES: ProjectId[] = ['ajan', 'devops', 'ofis', 'hukuk']

export type HobbyId = 'koro' | 'baglama'
export type ContactKind = 'mail' | 'linkedin' | 'github' | 'cv'

/* ---------- The shape of one language ---------- */

export interface Scene {
  label: string
  title: string
  text: string
}

export interface Project {
  id: ProjectId
  label: string
  title: string
  text: string
  points?: string[]
  role: string
  tags: string[]
  /** Shown in the project list of the side panel. */
  kind: string
  /** One line on the project's card in Bölüm 3. */
  summary: string
  /** A short status shown with a green dot, on the card and in the panel. */
  status?: string
  year: string
}

/** Words written by hand inside the drawings, and each drawing's description. */
export interface DrawingWords {
  data: string
  todo: string
  doing: string
  done: string
  idea: string
  product: string
  need: string
  solution: string
  labels: Record<SceneId, string>
}

export interface Content {
  meta: { title: string }
  ui: {
    progress: (n: number, of: number) => string
    chapters: string
    contact: string
    closePanel: string
    experience: string
    projects: string
    education: string
    skills: string
    certificates: string
    cvButton: string
    myPart: string
    now: string
    projectsHeading: string
    projectsHint: string
    mainKind: string
    details: string
    howto: string
    howtoAria: string
    langLabel: string
    toDark: string
    toLight: string
  }
  scenes: Record<SceneId, Scene>
  cover: {
    role: string
    ctaNote: string
    /** The button that opens the side panel; it says what the panel holds. */
    more: string
    facts: { label: string; value: string }[]
  }
  steps: { title: string; text: string }[]
  projects: Record<ProjectId, Project>
  experience: { company: string; roles: { title: string; year: string }[] }[]
  education: { years: string; program: string; school: string; detail: string }
  skills: string[]
  certificates: string[]
  hobbies: { id: HobbyId; title: string; text: string }[]
  contacts: { kind: ContactKind; label: string; value: string; href: string }[]
  last: { eyebrow: string; title: string; footer: string }
  drawing: DrawingWords
}

const LINKS = {
  mail: 'mailto:sila.byrm07@gmail.com',
  linkedin: 'https://www.linkedin.com/in/s%C4%B1la-bayram',
  github: 'https://github.com/Ssillaa',
}

/* ---------- Türkçe ---------- */

const tr: Content = {
  meta: { title: 'Sıla Bayram — Portfolyo' },
  ui: {
    progress: (n, of) => `Bölüm ${n} / ${of}`,
    chapters: 'Bölümler',
    contact: 'İletişim',
    closePanel: 'Paneli kapat',
    experience: 'Deneyim',
    projects: 'Projeler',
    education: 'Eğitim',
    skills: 'Yetkinlikler',
    certificates: 'Sertifikalar',
    cvButton: 'CV indir (PDF)',
    myPart: 'Katkım',
    now: 'bugün',
    projectsHeading: 'Projelerim',
    projectsHint: 'Ayrıntısı için bir karta tıklayın',
    mainKind: 'Bitirme projem · tek başıma',
    details: 'Ayrıntılar',
    howto: 'Nasıl çalışırım',
    howtoAria: 'Çalışma adımları',
    langLabel: 'Dil',
    toDark: 'Gece moduna geç',
    toLight: 'Gündüz moduna geç',
  },
  scenes: {
    cover: {
      label: 'Merhaba, ben',
      title: 'Sıla Bayram',
      text: 'Teknolojiyle iş ihtiyaçları arasında bağ kuruyorum. Yazılım geliştiriyor, yapay zekâ çözümleri üzerinde çalışıyor ve fikirleri işleyen ürünlere dönüştürüyorum. Bu sayfa, buraya nasıl geldiğimin kısa hikâyesi.',
    },
    curiosity: {
      label: 'Bölüm 1 · Temeller',
      title: 'Teknolojiyi anlamak',
      text: 'Yönetim Bilişim Sistemleri eğitimiyle iş ve teknoloji arasındaki ilişkiyi keşfettim. Zamanla bu ilgimi yazılım geliştirmeye ve teknik problemleri çözmeye taşıdım.',
    },
    order: {
      label: 'Bölüm 2 · Gelişim',
      title: 'Öğrenmekten üretmeye',
      text: 'Farklı teknolojiler, ekipler ve çalışma biçimleriyle deneyim kazandım. Her yeni problem, teknik becerilerimi geliştirirken çözümün bütününü görmeyi de öğretti.',
    },
    product: {
      label: 'Bölüm 3 · Üretim',
      title: 'Fikirleri hayata geçirmek',
      text: 'Kendi projelerimi geliştirerek fikirlerin çalışan sistemlere dönüşme sürecini deneyimledim. Yazılım, yapay zekâ ve ürün geliştirme yaklaşımımı bir araya getirdim.',
    },
    bridge: {
      label: 'Bölüm 4 · Bugün',
      title: 'İhtiyaçtan çözüme',
      text: 'Teknik bilgiyle iş ihtiyaçlarını buluşturuyorum. Bir problemi anlamaktan çözüm geliştirmeye ve iyileştirmeye kadar sürecin farklı aşamalarında yer almayı çok seviyorum.',
    },
    music: {
      label: 'Bölüm 5 · Müzik',
      title: 'Mesai bittiğinde',
      text: 'Hobilerim benim için önemli; müzik de hayatımın büyük bir parçası. Ekranı kapattığımda şarkı söylemeye devam ediyorum. Bir de kedileri ve bitkileri çok severim :)',
    },
  },
  cover: {
    role: 'Junior Yazılım Uzmanı',
    ctaNote: 'Kaydırıp hikâyeyi okuyun',
    more: 'Deneyim, eğitim ve yetkinliklerim',
    facts: [
      { label: 'Şehir', value: 'Ankara' },
      { label: 'Eğitim', value: 'Ostim Teknik Üniversitesi MIS (İngilizce, %100 Burslu ) · 2026' },
    ],
  },
  steps: [
    { title: 'Dinlerim', text: 'Departmanla oturup işin bugün nasıl yürüdüğünü ve nerede zorlandığını dinlerim.' },
    { title: 'Netleştiririm', text: 'İhtiyacı herkesin aynı şeyi anladığı, kısa ve test edilebilir gereksinimlere çeviririm.' },
    { title: 'Geliştiririm', text: 'Çözümü ekiple birlikte, çoğunlukla LLM tabanlı ajanlar ve otomasyonlarla geliştiririm.' },
    { title: 'Test ederim', text: 'Gerçek senaryolarla dener, geri bildirimi toplar ve bir sonraki tura taşırım.' },
  ],
  projects: {
    talentagent: {
      id: 'talentagent',
      kind: 'Tek başına',
      summary: 'Yapay zekâ destekli işe alım platformu',
      status: 'Şirkette aktif olarak kullanılıyor',
      year: '2026',
      label: 'Bitirme projem · Baştan sona ben geliştirdim',
      title: 'TalentAgent',
      text: 'Yapay zekâ destekli mülakat ve işe alım platformu. Beni ekibe dahil eden projem.',
      points: [
        'Adayın CV’sini okuyup ayrıştırır',
        'İlana göre bağlama uygun mülakat soruları hazırlar',
        'Cevapları yazıya döküp değerlendirir',
        'Her puanın gerekçesini gösterir',
      ],
      role: 'Ürün kurgusundan ekranlara, yapay zekâ akışlarından veritabanına kadar tek başıma.',
      tags: ['Python', 'Angular', 'PostgreSQL', 'Yerel LLM', 'MinIO'],
    },
    ajan: {
      id: 'ajan',
      kind: 'Ekip projesi',
      summary: 'Yetki kontrollü yapay zekâ ajanları',
      year: '2026',
      label: 'Ekip projesi',
      title: 'Kurumsal ajan platformu',
      text: 'İş birimlerinin yetki kontrollü yapay zekâ ajanları ve otomatik süreçler kurup kullandığı, kurumun kendi altyapısında çalışan platform.',
      role: 'İş birimlerini dinleyerek ajan, yetenek ve araç tasarımı; son kullanıcı deneyimi ve geri bildirim.',
      tags: ['Python', 'FastAPI', 'React', 'LLM'],
    },
    devops: {
      id: 'devops',
      kind: 'Ekip projesi',
      summary: 'Hata kaydı ve kod inceleyen ajanlar',
      year: '2026',
      label: 'Ekip projesi',
      title: 'DevOps ajan ekibi',
      text: 'Hata kayıtlarını ve pull request’leri okuyup puanlayan, geliştiricilere gerekçeli inceleme yorumları bırakan ajanlar.',
      role: 'Kayıt kalitesi ve kod inceleme kurallarının belirlenmesi; ajan çıktılarının iyileştirilmesi.',
      tags: ['Node.js', 'Azure DevOps', 'LLM'],
    },
    ofis: {
      id: 'ofis',
      kind: 'Ekip projesi',
      summary: 'Ajanların işini canlı izleten ofis',
      year: '2026',
      label: 'Ekip projesi · İkinci versiyonunu geliştirdim',
      title: 'Dijital ofis',
      text: 'Departmanlardaki yapay zekâ ajanlarının iş akışını çok katlı bir ofis olarak canlı izleten arayüz.',
      role: 'Etkileşimli ofis arayüzü ve departman senaryoları.',
      tags: ['React', 'Vite', 'Node.js'],
    },
    hukuk: {
      id: 'hukuk',
      kind: 'Ekip projesi',
      summary: 'Kişisel bilgiyi gizleyen belge platformu',
      year: '2026',
      label: 'Ekip projesi',
      title: 'Hukuki belge anonimleştirme',
      text: 'Türkçe hukuki belgelerdeki kişisel bilgileri bulup gizleyen, belgeler içinde arama yapılabilen bir platform.',
      role: 'Elasticsearch entegrasyonu, ödeme sistemi geliştirme ve tanıtım sayfası tasarımı.',
      tags: ['Elasticsearch', 'Ödeme sistemi', 'Tanıtım sayfası'],
    },
  },
  experience: [
    {
      company: 'ARD Grup Bilişim Teknolojileri',
      roles: [
        { title: 'Junior Yazılım Uzmanı', year: '2026' },
        { title: 'Yazılım Geliştirme Stajyeri', year: '2026' },
        { title: 'Ulusal Ar-Ge Stajyeri', year: '2025' },
        { title: 'Yapay Zekâ Stajyeri', year: '2023–24' },
      ],
    },
    { company: 'Eti Maden İşletmeleri Genel Müdürlüğü', roles: [{ title: 'Yönetim Bilişim Sistemleri Stajyeri', year: '2025' }] },
    { company: 'Fidanboy IT Academy & Consulting Center', roles: [{ title: 'Yazılım Kalite Güvence Stajyeri', year: '2024' }] },
  ],
  education: {
    years: '2021–2026',
    program: 'Yönetim Bilişim Sistemleri',
    school: 'OSTİM Teknik Üniversitesi',
    detail: 'GANO 3,41 · %100 burslu',
  },
  skills: ['Gereksinim analizi', 'Test ve geri bildirim', 'Python', 'LLM entegrasyonu', 'NLP', 'Flask · FastAPI', 'Angular', 'Scrum · Jira', 'İngilizce B2'],
  certificates: [
    'Energy Transition Entrepreneurs in Action (AB onaylı)',
    'Scrum · temel ve ileri',
    'Jira · ileri yeterlilik',
    'Yazılım Kalite Güvence · temel',
  ],
  hobbies: [
    { id: 'koro', title: 'Koro', text: 'Bir koroda şarkı söylüyorum.' },
    { id: 'baglama', title: 'Bağlama', text: 'Bağlama çalıp söylüyorum.' },
  ],
  contacts: [
    { kind: 'mail', label: 'E-posta', value: 'sila.byrm07@gmail.com', href: LINKS.mail },
    { kind: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/sıla-bayram', href: LINKS.linkedin },
    { kind: 'github', label: 'GitHub', value: 'github.com/Ssillaa', href: LINKS.github },
    { kind: 'cv', label: 'Özgeçmiş', value: 'CV’mi indir (PDF)', href: CV_URL },
  ],
  last: {
    eyebrow: 'İletişim',
    title: 'Okuduğunuz için teşekkürler. :)',
    footer: 'Ankara · Referanslar istek üzerine paylaşılır.',
  },
  drawing: {
    data: 'veri',
    todo: 'Yapılacak',
    doing: 'Yapılıyor',
    done: 'Bitti',
    idea: 'fikir',
    product: 'ürün',
    need: 'ihtiyaç',
    solution: 'çözüm',
    labels: {
      cover: 'Ufka uzanan uzun bir yolda, uzun saçlı, fiyonklu ve sırt çantalı bir kız yürüyor; yolun kenarında 2023 ve 2026 yazan kilometre taşları, iki yanda ağaçlar ve tepeler, uzakta dağlar, bulutlar ve güneş',
      curiosity: 'Etrafına ışık saçan bir ampul, dönen iki çark, el yazısıyla soru işareti ve kod işaretleri; altında ilk grafiğin çizildiği açık bir defter, bir kupa ve bir kalem',
      order: 'Sprint 1 yazan bir pano: Yapılacak, Yapılıyor ve Bitti sütunlarında yapışkan notlar; bir not Bitti sütununa taşınıyor, köşede bir büyüteç',
      product: 'Duvara iğnelenmiş, fikir yazan bir kâğıt taslak; bir okla, ürün yazan ve ekranında aday kartı ile puan çubukları olan bir dizüstü bilgisayara dönüşüyor; ekranın üstünde bir mezuniyet kepi',
      bridge: 'Solda ihtiyaç balonlu bir ofis binası, sağda ekranında küçük bir yapay zekâ ajanı olan bir dizüstü bilgisayar; aradaki köprünün üstünde elinde dosyayla yürüyen bir kişi, altında akan bir dere, bilgisayarın üstünde çözüm balonu',
      music: 'Sahne ışığı altında, gövdesi armut biçiminde bir bağlama; arkada küçük bir koro, yanda nota sehpası ve bağlamadan yükselen bir porte üzerinde notalar; önde mutlu bakan sarı bir kedi, saksıda bir bitki ve bir saksı çiçek',
    },
  },
}

/* ---------- English ---------- */

const en: Content = {
  meta: { title: 'Sıla Bayram — Portfolio' },
  ui: {
    progress: (n, of) => `Chapter ${n} / ${of}`,
    chapters: 'Chapters',
    contact: 'Contact',
    closePanel: 'Close panel',
    experience: 'Experience',
    projects: 'Projects',
    education: 'Education',
    skills: 'Skills',
    certificates: 'Certificates',
    cvButton: 'Download CV (PDF)',
    myPart: 'My part',
    now: 'today',
    projectsHeading: 'My projects',
    projectsHint: 'Tap a card for details',
    mainKind: 'Graduation project · solo',
    details: 'Details',
    howto: 'How I work',
    howtoAria: 'Working steps',
    langLabel: 'Language',
    toDark: 'Switch to night mode',
    toLight: 'Switch to day mode',
  },
  scenes: {
    cover: {
      label: 'Hello, I’m',
      title: 'Sıla Bayram',
      text: 'I connect technology with business needs. I build software, work on AI solutions and turn ideas into products that work. This page is the short story of how I got here.',
    },
    curiosity: {
      label: 'Chapter 1 · Foundations',
      title: 'Understanding technology',
      text: 'Studying Management Information Systems, I discovered how business and technology shape each other. Over time I carried that interest into building software and solving technical problems.',
    },
    order: {
      label: 'Chapter 2 · Growth',
      title: 'From learning to building',
      text: 'I gained experience with different technologies, teams and ways of working. Every new problem sharpened my technical skills and taught me to see the whole solution.',
    },
    product: {
      label: 'Chapter 3 · Making',
      title: 'Bringing ideas to life',
      text: 'Building my own projects, I saw ideas turn into working systems. I brought software, AI and a product mindset together.',
    },
    bridge: {
      label: 'Chapter 4 · Today',
      title: 'From need to solution',
      text: 'I bring technical knowledge and business needs together. I love taking part in every stage, from understanding a problem to building and improving the solution.',
    },
    music: {
      label: 'Chapter 5 · Music',
      title: 'After hours',
      text: 'My hobbies matter to me, and music is a big part of my life. When the screen goes off, I keep singing. I also love cats and plants :)',
    },
  },
  cover: {
    role: 'Junior Software Specialist',
    ctaNote: 'Scroll to read the story',
    more: 'My experience, education and skills',
    facts: [
      { label: 'City', value: 'Ankara, Türkiye' },
      { label: 'Education', value: 'OSTİM Technical University, MIS (English, full scholarship) · 2026' },
    ],
  },
  steps: [
    { title: 'Listen', text: 'I sit with the department and listen to how the work runs today and where it gets stuck.' },
    { title: 'Clarify', text: 'I turn the need into short, testable requirements that everyone reads the same way.' },
    { title: 'Build', text: 'I build the solution with the team, mostly with LLM-based agents and automations.' },
    { title: 'Test', text: 'I try it with real scenarios, gather feedback and carry it into the next round.' },
  ],
  projects: {
    talentagent: {
      id: 'talentagent',
      kind: 'Solo',
      summary: 'AI-assisted hiring platform',
      status: 'In active use at the company',
      year: '2026',
      label: 'Graduation project · built end to end by me',
      title: 'TalentAgent',
      text: 'An AI-assisted interview and hiring platform. The project that brought me onto the team.',
      points: [
        'Reads and parses the candidate’s CV',
        'Prepares interview questions that fit the job post',
        'Transcribes and evaluates the answers',
        'Shows the reasoning behind every score',
      ],
      role: 'Everything, on my own: from product design to screens, from AI flows to the database.',
      tags: ['Python', 'Angular', 'PostgreSQL', 'Local LLM', 'MinIO'],
    },
    ajan: {
      id: 'ajan',
      kind: 'Team project',
      summary: 'Permission-aware AI agents',
      year: '2026',
      label: 'Team project',
      title: 'Enterprise agent platform',
      text: 'An on-premises platform where business units build and use permission-aware AI agents and automated processes.',
      role: 'Designing agents, skills and tools by listening to business units; end-user experience and feedback.',
      tags: ['Python', 'FastAPI', 'React', 'LLM'],
    },
    devops: {
      id: 'devops',
      kind: 'Team project',
      summary: 'Agents that review work items and code',
      year: '2026',
      label: 'Team project',
      title: 'DevOps agent team',
      text: 'Agents that read and score work items and pull requests, and leave reasoned review comments for developers.',
      role: 'Setting the rules for work-item quality and code review; improving the agents’ output.',
      tags: ['Node.js', 'Azure DevOps', 'LLM'],
    },
    ofis: {
      id: 'ofis',
      kind: 'Team project',
      summary: 'An office to watch agents at work',
      year: '2026',
      label: 'Team project · I built its second version',
      title: 'Digital office',
      text: 'An interface that shows the work of AI agents across departments live, as a multi-storey office.',
      role: 'The interactive office interface and department scenarios.',
      tags: ['React', 'Vite', 'Node.js'],
    },
    hukuk: {
      id: 'hukuk',
      kind: 'Team project',
      summary: 'A document platform that hides personal data',
      year: '2026',
      label: 'Team project',
      title: 'Legal document anonymisation',
      text: 'A platform that finds and hides personal data in Turkish legal documents and lets you search across them.',
      role: 'Elasticsearch integration, the payment system and the landing page.',
      tags: ['Elasticsearch', 'Payments', 'Landing page'],
    },
  },
  experience: [
    {
      company: 'ARD Grup Bilişim Teknolojileri',
      roles: [
        { title: 'Junior Software Specialist', year: '2026' },
        { title: 'Software Development Intern', year: '2026' },
        { title: 'National R&D Intern', year: '2025' },
        { title: 'AI Intern', year: '2023–24' },
      ],
    },
    { company: 'Eti Maden İşletmeleri Genel Müdürlüğü', roles: [{ title: 'Management Information Systems Intern', year: '2025' }] },
    { company: 'Fidanboy IT Academy & Consulting Center', roles: [{ title: 'Software Quality Assurance Intern', year: '2024' }] },
  ],
  education: {
    years: '2021–2026',
    program: 'Management Information Systems',
    school: 'OSTİM Technical University',
    detail: 'GPA 3.41 · full scholarship',
  },
  skills: ['Requirements analysis', 'Testing and feedback', 'Python', 'LLM integration', 'NLP', 'Flask · FastAPI', 'Angular', 'Scrum · Jira', 'English B2'],
  certificates: [
    'Energy Transition Entrepreneurs in Action (EU-accredited)',
    'Scrum · foundation and advanced',
    'Jira · advanced proficiency',
    'Software Quality Assurance · foundation',
  ],
  hobbies: [
    { id: 'koro', title: 'Choir', text: 'I sing in a choir.' },
    { id: 'baglama', title: 'Bağlama', text: 'I play the bağlama and sing.' },
  ],
  contacts: [
    { kind: 'mail', label: 'Email', value: 'sila.byrm07@gmail.com', href: LINKS.mail },
    { kind: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/sıla-bayram', href: LINKS.linkedin },
    { kind: 'github', label: 'GitHub', value: 'github.com/Ssillaa', href: LINKS.github },
    { kind: 'cv', label: 'Résumé', value: 'Download my CV (PDF, Turkish)', href: CV_URL },
  ],
  last: {
    eyebrow: 'Contact',
    title: 'Thanks for reading. :)',
    footer: 'Ankara · References available on request.',
  },
  drawing: {
    data: 'data',
    todo: 'To do',
    doing: 'Doing',
    done: 'Done',
    idea: 'idea',
    product: 'product',
    need: 'need',
    solution: 'solution',
    labels: {
      cover: 'A girl with long hair, a bow and a backpack walks down a long road towards the horizon; milestones by the road read 2023 and 2026, with trees and hills on both sides, mountains, clouds and the sun far away',
      curiosity: 'A light bulb glowing, two turning gears, a handwritten question mark and code brackets; below, an open notebook with a first chart, a mug and a pencil',
      order: 'A board titled Sprint 1 with sticky notes in To do, Doing and Done columns; one note is moving to Done, and a magnifying glass sits in the corner',
      product: 'A paper sketch pinned to the wall, labelled idea, turns through an arrow into a laptop labelled product, its screen showing a candidate card and score bars; a graduation cap rests on the screen',
      bridge: 'An office building with a speech bubble saying need on the left, a laptop with a small AI agent on screen on the right; a person carries a file across the bridge between them over a stream, and a bubble above the laptop says solution',
      music: 'A pear-shaped bağlama under a stage light; a small choir behind it, a music stand beside it and notes on a staff rising from the bağlama; in front, a happy ginger cat, a potted plant and a pot of flowers',
    },
  },
}

export const CONTENT: Record<Lang, Content> = { tr, en }
