// Everything the page says lives here, so a text change never touches a component.

export const CV_URL = `${import.meta.env.BASE_URL}Sila-Bayram-CV.pdf`

export const NAV_LINKS = [
  { href: '#hakkimda', label: 'Hakkımda' },
  { href: '#egitim', label: 'Eğitim' },
  { href: '#deneyim', label: 'Deneyim' },
  { href: '#projeler', label: 'Projeler' },
  { href: '#iletisim', label: 'İletişim' },
]

export const MARQUEE_ITEMS = [
  'Departmanlarla iletişim',
  'Gereksinim netleştirme',
  'LLM entegrasyonu',
  'Python · Flask · FastAPI',
  'Test ve geri bildirim',
  'Angular',
  'Yapay zekâ ajanları',
  'Dokümantasyon',
]

export const WORK_STEPS = [
  { title: 'Dinlerim', text: 'Departmanlarla konuşur, işin içindeki asıl ihtiyacı anlamaya çalışırım.' },
  { title: 'Netleştiririm', text: 'Gereksinimi yazıya döker, ekiple birlikte önceliklendirmeye katkı veririm.' },
  { title: 'Geliştiririm', text: 'Yapay Zeka araçlarını doğru kullanarak çözümü kodlarım.' },
  { title: 'Test ederim', text: 'Geri bildirimi toplar, iyileştirmeleri dokümante eder, döngüyü yeniden başlatırım.' },
]

export const CERTIFICATES = [
  { title: 'Energy Transition Entrepreneurs in Action', level: 'Temel ve ileri girişimcilik eğitimi · AB onaylı' },
  { title: 'Scrum', level: 'Temel ve ileri düzey eğitim' },
  { title: 'Jira', level: 'İleri yeterlilik düzeyinde eğitim' },
  { title: 'Yazılım Kalite Güvence Uzmanlığı', level: 'Temel düzey eğitim' },
]

export interface Job {
  role: string
  company: string
  date: string
  summary: string
  tags: string[]
}

export const EXPERIENCE: Job[] = [
  {
    role: 'Junior Yazılım Uzmanı',
    company: 'ARD Grup Bilişim Teknolojileri',
    date: 'Temmuz 2026 — Kasım 2026',
    summary:
      'İş süreçlerinin otomasyonu ve yapay zekâ ajanı çözümleri geliştiren ekipte yer aldım. Departmanlarla iletişim kurarak ihtiyaçları belirlemeye, gereksinimleri netleştirmeye ve önceliklendirmeye katkı verdim; geliştirilen özellikleri test edip geri bildirimleri ve toplantı çıktılarını dokümante ettim. LLM tabanlı çözümler ve sistem entegrasyonları üzerinde çalışıyorum.',
    tags: ['LLM', 'Python', 'Gereksinim analizi', 'Test', 'Dokümantasyon'],
  },
  {
    role: 'Yazılım Geliştirme Stajyeri',
    company: 'ARD Grup Bilişim Teknolojileri',
    date: 'Şubat 2026 — Haziran 2026',
    summary:
      'Python ve Angular ile backend API’leri ve arayüzler geliştirdim. NLP modellerini Flask API’leriyle uygulamalara bağladım; CV işleme, bilgi çıkarımı, aday profili oluşturma ve LLM destekli aday–iş ilanı eşleştirme üzerinde çalıştım.',
    tags: ['Python', 'Flask', 'Angular', 'NLP'],
  },
  {
    role: 'Ulusal Ar-Ge Stajyeri',
    company: 'ARD Grup Bilişim Teknolojileri',
    date: 'Şubat 2025 — Aralık 2025',
    summary:
      'Python, Flask, JavaScript ve Angular ile yönetim panelleri ve dashboard’lar geliştirdim; eğitilmiş yapay zekâ modellerini Flask API’leri üzerinden web arayüzlerine entegre ettim.',
    tags: ['Python', 'Flask', 'JavaScript', 'Angular'],
  },
  {
    role: 'Yönetim Bilişim Sistemleri Stajyeri',
    company: 'Eti Maden İşletmeleri Genel Müdürlüğü',
    date: 'Haziran 2025 — Temmuz 2025',
    summary:
      'Angular bileşenleri ve framework yapısı üzerine çalıştım; arıza tespiti ve donanım sorunlarının giderilmesi gibi BT destek görevlerinde bulundum.',
    tags: ['Angular', 'BT destek'],
  },
  {
    role: 'Yazılım Kalite Güvence Stajyeri',
    company: 'Fidanboy IT Academy & Consulting Center',
    date: 'Eylül 2024 — Aralık 2024',
    summary:
      'ISO 27001 ve ISO 9001 çerçevesinde yazılım kalite süreçlerini öğrendim; Scrum ve Agile ile yürütülen projelerde Jira üzerinden görev, sprint ve ilerleme takibi yaptım.',
    tags: ['Kalite güvence', 'ISO 27001/9001', 'Scrum', 'Jira'],
  },
  {
    role: 'Yapay Zekâ Stajyeri',
    company: 'ARD Grup Bilişim Teknolojileri',
    date: 'Kasım 2023 — Haziran 2024',
    summary:
      'Python temelleri ile NumPy, Pandas, scikit-learn, Matplotlib ve Seaborn kütüphanelerini öğrenerek veri ve makine öğrenmesi çalışmalarına başladım.',
    tags: ['Python', 'Pandas', 'scikit-learn'],
  },
]

export type ProjectCategory = 'hr' | 'agents' | 'viz'

export const PROJECT_FILTERS: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'Tümü' },
  { id: 'hr', label: 'İşe alım' },
  { id: 'agents', label: 'Yapay zekâ ajanları' },
  { id: 'viz', label: 'Görselleştirme' },
]

export const FEATURED_PROJECT = {
  category: 'hr' as ProjectCategory,
  badges: ['Bitirme projem', 'Baştan sona ben geliştirdim'],
  title: 'Yapay zekâ destekli mülakat ve işe alım platformu- TalentAgent',
  description:
    'Adayın CV’sini okuyup ayrıştıran, ilana göre bağlama uygun mülakat soruları hazırlayan, cevapları yazıya döküp değerlendiren ve her puanın gerekçesini gösteren bir platform.',
  story:
    'Ürün kurgusundan ekranlara, yapay zekâ akışlarından veritabanına kadar tek başıma geliştirdim. Bu proje sayesinde ekibe katıldım.',
  tags: ['Python', 'Angular', 'PostgreSQL', 'Yerel LLM', 'MinIO'],
}

export interface TeamProject {
  category: ProjectCategory
  illustration: 'platform' | 'review' | 'office'
  label: string
  title: string
  description: string
  contribution: string
  tags: string[]
}

export const TEAM_PROJECTS: TeamProject[] = [
  {
    category: 'agents',
    illustration: 'platform',
    label: 'Yapay zekâ ajanları · Ekip projesi',
    title: 'Kurumsal yapay zekâ ajanı ve süreç otomasyonu platformu',
    description:
      'Kurumun kendi altyapısında çalışan; iş birimlerinin yetki kontrollü yapay zekâ ajanları, yetenekler ve otomatik süreçler kurup kullandığı platform.',
    contribution:
      'İş birimlerinin ihtiyaçlarını dinleyerek ajan, yetenek (skill) ve araç tasarımı; gereksinimlerin netleştirilmesi, test ve geri bildirim.',
    tags: ['Python', 'FastAPI', 'React', 'LLM'],
  },
  {
    category: 'agents',
    illustration: 'review',
    label: 'Yapay zekâ ajanları · Ekip projesi',
    title: 'Azure DevOps için yapay zekâ ajan ekibi',
    description:
      'Yeni açılan hata kayıtlarını ve pull request’leri okuyup puanlayan, geliştiricilere Türkçe ve gerekçeli inceleme yorumları bırakan ajanlar. Her dış eylem tek bir güvenlik kapısından geçer.',
    contribution:
      'Kayıt kalitesi ve kod inceleme kurallarının belirlenmesi; ajan çıktılarının test edilip iyileştirilmesi.',
    tags: ['Node.js', 'Azure DevOps', 'LLM'],
  },
  {
    category: 'viz',
    illustration: 'office',
    label: 'Görselleştirme · İkinci versiyonunu geliştirdim',
    title: 'Departman ajanlarının canlı dijital ofisi',
    description:
      'Şirketi çok katlı bir ofis olarak çizen; DevOps ve İnsan Kaynakları gibi departmanlardaki yapay zekâ ajanlarının iş akışını canlı izleten etkileşimli arayüz.',
    contribution: 'Etkileşimli ofis arayüzünün ve departman senaryolarının geliştirilmesi.',
    tags: ['React', 'Vite', 'Node.js'],
  },
]

export const SKILL_GROUPS = [
  { group: 'İletişim ve ürün', items: ['Departmanlarla iletişim', 'Gereksinim netleştirme', 'Önceliklendirme', 'Test ve geri bildirim', 'Dokümantasyon'] },
  { group: 'Programlama', items: ['Python · ileri', 'Java · orta', 'JavaScript', 'HTML / CSS'] },
  { group: 'Framework ve API', items: ['Flask', 'Angular', 'FastAPI'] },
  { group: 'Yapay zekâ', items: ['LLM entegrasyonu', 'NLP', 'Makine öğrenmesi', 'Model entegrasyonu'] },
  { group: 'Araçlar ve kalite', items: ['Yapay zekâ araçları', 'Jira', 'Scrum / Agile', 'ISO 27001 / 9001', 'CMMI · temel'] },
  { group: 'Diller', items: ['Türkçe · ana dil', 'İngilizce · B2'] },
]

export const CONTACTS = [
  { kind: 'mail', label: 'E-posta', value: 'sila.byrm07@gmail.com', href: 'mailto:sila.byrm07@gmail.com' },
  { kind: 'phone', label: 'Telefon', value: '0 532 594 07 20', href: 'tel:+905325940720' },
  { kind: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/sıla-bayram', href: 'https://www.linkedin.com/in/s%C4%B1la-bayram' },
  { kind: 'github', label: 'GitHub', value: 'github.com/Ssillaa', href: 'https://github.com/Ssillaa' },
  { kind: 'cv', label: 'Özgeçmiş', value: 'CV’mi indir (PDF)', href: CV_URL },
] as const
