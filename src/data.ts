// Everything the site says lives here, so a text change never touches a component.

export const CV_URL = `${import.meta.env.BASE_URL}Sila-Bayram-CV.pdf`

/* ---------- The story (HIKAYE-PLANI.md, K9) ---------- */

export type SceneId = 'cover' | 'curiosity' | 'order' | 'product' | 'bridge'

export interface Scene {
  id: SceneId
  label: string
  title: string
  text: string
}

export const SCENES: Scene[] = [
  {
    id: 'cover',
    label: 'Merhaba, ben',
    title: 'Sıla Bayram',
    text: 'Teknolojiyle iş ihtiyaçları arasında bağ kuruyorum. Yazılım geliştiriyor, yapay zekâ çözümleri üzerinde çalışıyor ve fikirleri işleyen ürünlere dönüştürüyorum. Bu sayfa, buraya nasıl geldiğimin kısa hikâyesi.',
  },
  {
    id: 'curiosity',
    label: 'Bölüm 1 · Temeller',
    title: 'Teknolojiyi anlamak',
    text: 'Yönetim Bilişim Sistemleri eğitimiyle iş ve teknoloji arasındaki ilişkiyi keşfettim. Zamanla bu ilgimi yazılım geliştirmeye ve teknik problemleri çözmeye taşıdım.',
  },
  {
    id: 'order',
    label: 'Bölüm 2 · Gelişim',
    title: 'Öğrenmekten üretmeye',
    text: 'Farklı teknolojiler, ekipler ve çalışma biçimleriyle deneyim kazandım. Her yeni problem, teknik becerilerimi geliştirirken çözümün bütününü görmeyi de öğretti.',
  },
  {
    id: 'product',
    label: 'Bölüm 3 · Üretim',
    title: 'Fikirleri hayata geçirmek',
    text: 'Kendi projelerimi geliştirerek fikirlerin çalışan sistemlere dönüşme sürecini deneyimledim. Yazılım, yapay zekâ ve ürün geliştirme yaklaşımımı bir araya getirdim.',
  },
  {
    id: 'bridge',
    label: 'Bölüm 4 · Bugün',
    title: 'İhtiyaçtan çözüme',
    text: 'Teknik bilgiyle iş ihtiyaçlarını buluşturuyorum. Bir problemi anlamaktan çözüm geliştirmeye ve iyileştirmeye kadar sürecin farklı aşamalarında yer almayı çok seviyorum.',
  },
]

/** The line under the name, and the link that starts the story. */
export const COVER = {
  role: 'Junior Yazılım Uzmanı',
  ctaNote: 'Kaydırıp hikâyeyi okuyun',
  /** The button that opens the side panel; it says what the panel holds. */
  more: 'Deneyim, eğitim ve yetkinliklerim',
}

/** Short facts under the cover: a small label over a value, no boxes. */
export const COVER_FACTS = [
  { label: 'Şehir', value: 'Ankara' },
  { label: 'Eğitim', value: 'YBS (İngilizce) · 2026' },
]

/** How she works, in Bölüm 4: one tab per step, one sentence each. */
export const STEPS = [
  { title: 'Dinlerim', text: 'Departmanla oturup işin bugün nasıl yürüdüğünü ve nerede zorlandığını dinlerim.' },
  { title: 'Netleştiririm', text: 'İhtiyacı herkesin aynı şeyi anladığı, kısa ve test edilebilir gereksinimlere çeviririm.' },
  { title: 'Geliştiririm', text: 'Çözümü ekiple birlikte, çoğunlukla LLM tabanlı ajanlar ve otomasyonlarla geliştiririm.' },
  { title: 'Test ederim', text: 'Gerçek senaryolarla dener, geri bildirimi toplar ve bir sonraki tura taşırım.' },
]

/* ---------- Panels: TalentAgent and the three team projects (K8, K9) ---------- */

export type ProjectId = 'talentagent' | 'ajan' | 'devops' | 'ofis' | 'hukuk'

export interface Project {
  id: ProjectId
  label: string
  title: string
  text: string
  points?: string[]
  role: string
  tags: string[]
  /** Shown in the project list of the künye. */
  kind: string
  year: string
}

export const PROJECTS: Record<ProjectId, Project> = {
  talentagent: {
    id: 'talentagent',
    kind: 'Tek başına',
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
    year: '2026',
    label: 'Ekip projesi',
    title: 'Hukuki belge anonimleştirme',
    text: 'Türkçe hukuki belgelerdeki kişisel bilgileri bulup gizleyen, belgeler içinde arama yapılabilen bir platform.',
    role: 'Elasticsearch entegrasyonu, ödeme sistemi geliştirme ve tanıtım sayfası tasarımı.',
    tags: ['Elasticsearch', 'Ödeme sistemi', 'Tanıtım sayfası'],
  },
}

export const TEAM_FILES: ProjectId[] = ['ajan', 'devops', 'ofis', 'hukuk']

/* ---------- Künye (K7) ---------- */

export const EXPERIENCE = [
  {
    company: 'ARD Grup Bilişim Teknolojileri',
    roles: [
      { title: 'Junior Yazılım Uzmanı', year: '2026' },
      { title: 'Yazılım Geliştirme Stajyeri', year: '2026' },
      { title: 'Ulusal Ar-Ge Stajyeri', year: '2025' },
      { title: 'Yapay Zekâ Stajyeri', year: '2023–24' },
    ],
  },
  {
    company: 'Eti Maden İşletmeleri Genel Müdürlüğü',
    roles: [{ title: 'Yönetim Bilişim Sistemleri Stajyeri', year: '2025' }],
  },
  {
    company: 'Fidanboy IT Academy & Consulting Center',
    roles: [{ title: 'Yazılım Kalite Güvence Stajyeri', year: '2024' }],
  },
]

export const EDUCATION = {
  years: '2021–2026',
  program: 'Yönetim Bilişim Sistemleri',
  school: 'OSTİM Teknik Üniversitesi',
  detail: 'GANO 3,41 · %100 burslu',
}

export const SKILLS = [
  'Gereksinim analizi',
  'Test ve geri bildirim',
  'Python',
  'LLM entegrasyonu',
  'NLP',
  'Flask · FastAPI',
  'Angular',
  'Scrum · Jira',
  'İngilizce B2',
]

export const CERTIFICATES = [
  'Energy Transition Entrepreneurs in Action (AB onaylı)',
  'Scrum · temel ve ileri',
  'Jira · ileri yeterlilik',
  'Yazılım Kalite Güvence · temel',
]

/* ---------- Last page ---------- */

/** A small, quiet corner on the last page: what she does away from the screen. */
export const HOBBIES = {
  label: 'Kod dışında',
  text: 'Müzik hayatımın önemli bir parçası.',
  items: [
    { id: 'koro', title: 'Koro', text: 'Bir koroda şarkı söylüyorum.' },
    { id: 'baglama', title: 'Bağlama', text: 'Bağlama çalıp söylüyorum.' },
  ],
} as const

export const CONTACTS = [
  { kind: 'mail', label: 'E-posta', value: 'sila.byrm07@gmail.com', href: 'mailto:sila.byrm07@gmail.com' },
  { kind: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/sıla-bayram', href: 'https://www.linkedin.com/in/s%C4%B1la-bayram' },
  { kind: 'github', label: 'GitHub', value: 'github.com/Ssillaa', href: 'https://github.com/Ssillaa' },
  { kind: 'cv', label: 'Özgeçmiş', value: 'CV’mi indir (PDF)', href: CV_URL },
] as const
