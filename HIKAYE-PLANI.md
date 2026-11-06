# Portfolyo v2 — Hikâye planı

Durum: **kodlandı, Sıla'nın tarayıcıda gözden geçirmesini bekliyor** (2026-11-06). Bütün kararlar aşağıda: K1–K12.

Sıla tuval taslaklarını okumakta zorlandı ve "doğrudan kodla, orada görüp düzelttireyim" dedi. Bu yüzden K12 atlandı: onay artık tarayıcıda alınacak.

## Neden yeniden

Mevcut site (`src/`, ilk commit `6f886bd`) bir **reklam** olarak işlemiyor:

- Fazla yazı var; kimse bu kadarını okumaz.
- Görsel dil fazla tatlı ("girly"). Marka daha resmi olmalı, tatlılık yalnızca küçük ayrıntılarda saklanmalı.
- Deneyim unvana göre dizilmiş, bu yüzden 6 ayrı yer gibi görünüyor. Gerçekte 3 kurum var.
- Sonsuz aşağı kaydırma istenmiyor.

## Ne istiyoruz

- **Hikâye:** Site Sıla'yı bir hikâye gibi anlatır. Kitap okuma hissi verir.
- **Tek ekran:** Sayfa sonsuza kadar uzamaz. Ekran sabit kalır, kaydırdıkça ya da tıkladıkça sahne değişir. Ayrıntı aynı ekranda açılır, örneğin yandan kayan bir panelde.
- **Çizim:** Hikâye çizimlerle anlatılır.
- **Kısalık:** Her sahnede bir başlık ve en fazla bir iki kısa cümle. Ölçü, beğenilen "Bir ihtiyaç geldiğinde" bandı: 4 adım, her adımda tek satır.
- **Deneyim kuruma göre:** 3 kurum, altında unvanlar. Ayrıntı yok; isteyen CV'den okur.
- **Ton:** Daha resmi. Tatlılık küçük ayrıntılarda kalır.

## Eski siteden taşınacaklar

| Parça | Neden |
|---|---|
| "Bir ihtiyaç geldiğinde" 4 adım (Dinlerim · Netleştiririm · Geliştiririm · Test ederim) | Kısalığı ve tonu beğenildi |
| İletişim sayfası (koyu zemin, 5 kart: e-posta, telefon, LinkedIn, GitHub, CV) | Beğenildi |
| İçerik (`src/data.ts`) | Gerçek bilgiler. Kısaltılarak kullanılacak |
| Teknik altyapı | Vite + React + TypeScript, GitHub Pages yayını, depo adı `Ssillaa.github.io` |

## Gerçek bilgiler (kaynak: CV)

Kurumlar ve unvanlar:

- **ARD Grup Bilişim Teknolojileri**
  - Yapay Zekâ Stajyeri (Kas 2023 – Haz 2024)
  - Ulusal Ar-Ge Stajyeri (Şub – Ara 2025)
  - Yazılım Geliştirme Stajyeri (Şub – Haz 2026)
  - Junior Yazılım Uzmanı (Tem – Kas 2026)
- **Eti Maden İşletmeleri Genel Müdürlüğü** — YBS Stajyeri (Haz – Tem 2025)
- **Fidanboy IT Academy & Consulting Center** — Yazılım Kalite Güvence Stajyeri (Eyl – Ara 2024)

Eğitim: OSTİM Teknik Üniversitesi, Yönetim Bilişim Sistemleri (İngilizce, %100 burslu), 2021–2026, GANO 3,41.

Bitirme projesi: TalentAgent, yapay zekâ destekli mülakat ve işe alım platformu. Tek başına geliştirildi ve işe alınmasını sağladı.

## Kararlar

### K1 · Omurga: zaman çizgisi

| Sayfa | Başlık | Dönem | Özü |
|---|---|---|---|
| Kapak | Sıla Bayram | | İş ile teknoloji arasında köprü |
| 1 | Merak | 2023 | İlk Python satırları, ilk model (ARD, yapay zekâ stajı) |
| 2 | Düzen | 2024–2025 | Kalite, standartlar, paneller (Fidanboy, Eti Maden, ARD Ar-Ge) |
| 3 | Kendi ürünüm | 2026 | **Doruk noktası.** TalentAgent'ı tek başına kurdu; onu işe aldıran proje oldu |
| 4 | Köprü | 2026– | Dinlerim · Netleştiririm · Geliştiririm · Test ederim |
| Son sayfa | Sıradaki bölüm | | İletişim |

### K2 · Etkileşim: yapışkan sahne (scrollytelling)

- **Sahne:** Çizim ekrana yapışık kalır. Kaydırdıkça metin sırayla gelir, çizimin parçaları dönüşür. Apple'ın tanıtım sayfalarındaki gibi.
- **Kaydırma:** Sayfa teknik olarak uzundur ama ziyaretçi her an tek bir sahne görür.
- **Ayrıntı:** Tıklayınca aynı ekranda açılır, örneğin yandan kayan panel. Yeni sayfaya gidilmez.
- **Risk (K2):** Kaydırma uzun hissettirebilir. Önlem: sahne sayısı az tutulur (kapak + 4 bölüm + son sayfa). Bir ilerleme göstergesi ("Bölüm 3 / 4") ve bölümlere atlama noktaları eklenir.

### K3 · Palet: orman yeşili ve pirinç, az renkli

Sıla'nın kuralı: **aşırı renkli olmayacak.** Sayfa iki renkle konuşur: kâğıt ve mürekkep. Diğerleri yalnızca nokta atışı kullanılır.

| Rol | Renk | Kullanım |
|---|---|---|
| Kâğıt (zemin) | `#F2F0E8` | Her yer |
| Mürekkep (yazı, çizgi) | `#1E3B33` orman yeşili | Metin, çizim çizgileri, koyu sahneler |
| Pirinç | `#B88A3E` | Yalnızca nokta atışı: bölüm numarası, ilerleme göstergesi, tek bir vurgu |
| Fıstık | `#8CB33E` | Yalnızca saklı tatlılık: küçük ayrıntılar (bkz. K6) |

Yeni bir renk eklenmez. Durumlar ve hover bu dört rengin açık/koyu tonlarıyla çözülür.

### K4 · Çizim üslubu: tek çizgi mürekkep

- **Çizgi:** Orman yeşili, tek kalınlıkta, yuvarlak uçlu. Dolgu yok ya da çok az var.
- **Renk:** Pirinç her sahnede en fazla bir küçük vurgu olarak kullanılır, örneğin lambanın ışığı. Fıstık yeşili yalnızca saklı küçük bir ayrıntıdadır.
- **Hareket:** Sahne girerken çizgiler kalemle çiziliyormuş gibi belirir (SVG `stroke-dashoffset`). Çizim önceki sahneden dönüşerek gelir. Kitap okuma hissini taşıyan hareket bu.
- **Çizimler:** Hepsi kodda SVG olarak durur. Dış görsel, stok illüstrasyon ya da ekran görüntüsü kullanılmaz.
- **Güncelleme (Kasım 2026):** Kalem görünümü **Rough.js** (`roughjs`, MIT) ile çizilir. Şekiller temiz SVG yolu olarak yazılır, `src/components/sketch.ts` onları elle çizilmiş yola, taramaya ve renk lekesine çevirir. Çizim yine React'te SVG olarak durur; çizilme animasyonu aynen çalışır. Hafif yeşil ve pirinç renk lekeleri kullanıcı isteğiyle eklendi.

### K5 · Yazı tipi: Newsreader + Inter

- **Başlıklar:** Newsreader (serif), 500 ağırlık. Bölüm adları, kapak ve büyük sözler bununla dizilir.
- **Metin ve arayüz:** Inter, 400 ve 500 ağırlık. Kısa açıklamalar, düğmeler ve panel bununla dizilir.
- **Etiketler:** Inter, büyük harf, geniş aralık, pirinç rengi. Örneğin "BÖLÜM 3 · 2026".
- **Yükleme:** İkisi de Google Fonts'tan gelir, Türkçe karakterleri destekler.

### K6 · Maskot yok; tatlılık küçük ayrıntılarda

Ahtapot dahil hiçbir maskot kullanılmaz. Tatlılık yalnızca şu küçük ayrıntılarda saklanır:

- **Kıpırdama:** Fare bir bağlantının ya da düğmenin üstüne gelince çizimin çizgisi hafifçe kıpırdar.
- **El yazısı not:** Son sayfada küçük bir el yazısı not durur. Kitabın son sayfasına düşülmüş bir not gibi.
- **Mürekkep izi:** İmlecin arkasında küçük bir mürekkep noktası iz bırakır. Fıstık yeşilinin kullanılabileceği tek yer burasıdır. Dokunmatik ekranda ve "azaltılmış hareket" açıkken bu iz kapalıdır.

### K7 · Künye paneli

- **Erişim:** Üst köşedeki "Künye" düğmesi hangi sahnede olunursa olunsun yandan kayan bir panel açar. Hikâye yerinde kalır, kaydırma konumu bozulmaz.
- **Hedef kişi:** Hikâyeyi okumak istemeyen işe alımcı. Her şeyi tek bakışta görür.

Panelin içeriği, yukarıdan aşağıya:

1. **Deneyim, kuruma göre.** Her kurumun altında yalnızca unvanlar ve tarihleri yazar, açıklama yazılmaz.
   - ARD Grup Bilişim Teknolojileri: Junior Yazılım Uzmanı → Yazılım Geliştirme Stajyeri → Ulusal Ar-Ge Stajyeri → Yapay Zekâ Stajyeri
   - Eti Maden İşletmeleri Genel Müdürlüğü: YBS Stajyeri
   - Fidanboy IT Academy & Consulting Center: Yazılım Kalite Güvence Stajyeri
2. **Eğitim.** OSTİM Teknik Üniversitesi, YBS, 2021–2026, GANO 3,41, %100 burslu.
3. **Yetkinlikler.** Gruplar halinde, etiket olarak.
4. **Sertifikalar.** Tek satırlık bir liste.
5. **CV indir.**

Adres: panel açıkken URL'ye `#kunye` eklenir. Böylece panel doğrudan bağlantıyla paylaşılabilir ve tarayıcının geri tuşu paneli kapatır.

### K8 · Ekip projeleri: Bölüm 4'te üç dosya

- **Yer:** Köprü sahnesinin çiziminde, masanın üstünde üç kapalı dosya durur: Ajan platformu, DevOps ajanları, Dijital ofis. Dosyalar tıklanabilirdir.
- **Panel:** Tıklanan dosya, künyeyle aynı yan panel bileşeninde açılır. İçinde iki satırlık açıklama, bir "Katkım" satırı ve teknoloji etiketleri olur.
- **Hikâyedeki işlevi:** Bölüm 3 "tek başıma kurdum" der, Bölüm 4 "ekipte köprü oldum" der. Fark kendiliğinden okunur.
- **Klavye ve ekran okuyucu:** Dosyalar gerçek `<button>` olur ve her birinin bir adı vardır.

### K9 · Metin ve sahneler

Ton birinci tekil şahıs ve resmi, cümleler hikâye gibi akıyor. Her sahnede bir başlık ve en fazla iki kısa cümle var.

| Sahne | Etiket | Başlık | Metin | Etkileşim | Çizim (tek çizgi) |
|---|---|---|---|---|---|
| Kapak | | Sıla Bayram | İş ile teknoloji arasında köprü kuran bir yazılım uzmanının hikâyesi. | "Kaydırarak okuyun ↓" | Kapalı bir kitap, kapağında tek çizgi |
| 1 | BÖLÜM 1 · 2023 | Merak | Her şey bir soruyla başladı. Yapay zekâ stajımda ilk modellerimi Python ile kurdum. | | Masa lambası, açık defter, ekranda ilk satırlar. Lambanın ışığı pirinç rengi |
| 2 | BÖLÜM 2 · 2024–2025 | Düzen | İyi yazılımın bir düzeni vardır. Kalite süreçlerini, standartları ve panelleri üç kurumda öğrendim. | | Kontrol listesi, işaretlenen kutular, bir pano |
| 3 | BÖLÜM 3 · 2026 | Kendi ürünüm | Bitirme projem TalentAgent'ı baştan sona tek başıma geliştirdim. Beni ekibe getiren de o oldu. | [TalentAgent'ı aç] → yan panel | Aralanan bir kapı, içeriden ışık. Pirinç rengi tek vurgu ışıkta |
| 4 | BÖLÜM 4 · 2026– | Köprü | Bugün departmanların ihtiyacını ürüne çeviren ekipteyim. + 4 adım (Dinlerim · Netleştiririm · Geliştiririm · Test ederim) | Üç dosya → yan panel (K8) | İki masa arasında köprü, masada üç dosya |
| Son sayfa | SIRADAKİ BÖLÜM | Sıradaki bölümü birlikte yazalım. | — | İletişim kartları (eski siteden) | Açık kitabın boş son sayfası, el yazısı not: "Okuduğunuz için teşekkürler. — S." |

**Güncelleme (2026-11-06, ilk geri bildirim).** Sıla'nın notu: "Yazılar anlamsız kalıyor, beni tanıtan pek bir şey yok, Junior Yazılım Uzmanı olduğum görünmüyor." Bunun üzerine metinler somutlaştırıldı:

- Kapak: üst satır artık "Junior Yazılım Uzmanı · ARD Grup Bilişim". Altında bir cümlelik iş tanımı ve üç kısa bilgi var: Ankara · YBS mezunu, OSTİM · Python, LLM, Angular.
- Bölümler: her bölüm o dönemde gerçekte ne yapıldığını söylüyor (kurum, araç, iş).
- Bölüm 4: etiketi "Bugün" oldu.

Güncel metinler `src/data.ts` içinde, yukarıdaki tablo ilk taslaktır.

Çizimler de yeniden yapıldı ve artık tanınır nesneler: masa, ampul ve defter, kontrol listesi ve büyüteç, dizüstüde aday kartı ve mezuniyet kepi, ofis–köprü–dizüstü. Kalem görünümü üç yolla veriliyor:
- her çizgi iki kez geçiliyor,
- SVG yer değiştirme filtresi çizgiyi el titremesi gibi oynatıyor,
- gölgeler düz renk yerine tarama ile yapılıyor.

TalentAgent paneli: neler yaptığı (CV ayrıştırma, bağlama uygun mülakat soruları, cevap değerlendirme, gerekçeli puan), teknolojiler (Python, Angular, PostgreSQL, yerel LLM, MinIO) ve "Bitirme projem · Baştan sona ben geliştirdim · Beni işe aldıran proje" bilgisi.

### K10 · Telefon: çizim üstte, metin altta

- **Yerleşim:** Çizim ekranın üst %45'inde sabit kalır. Metin alt yarıda durur ve kaydırdıkça değişir.
- **Paneller:** Künye ve proje panelleri telefonda alttan açılır (bottom sheet), masaüstünde yandan.
- **İlerleme:** Altta sayfa noktaları durur. Masaüstünde noktalar sağ kenarda dikey dizilir.

### K11 · Hareket: ek kütüphane yok

- **Aktif sahne:** `IntersectionObserver` hangi sahnenin metninin ekranın ortasında olduğunu bulur ve aktif sahneyi değiştirir.
- **Çizgiler:** Sahne değişince yeni çizimin yolları `stroke-dasharray` / `stroke-dashoffset` geçişiyle çizilir. Önceki çizim solarak çekilir.
- **Metin:** CSS geçişiyle kayar ve belirir.
- **Azaltılmış hareket:** `prefers-reduced-motion` açıksa çizimler doğrudan tam hâliyle görünür, hiçbir şey kaymaz.
- **Bilinçli vazgeçiş:** Kaydırmaya milim milim bağlı (scrub) hareket yok. Sahneler bütün olarak değişir.
- **İstisna (Kasım 2026):** Çizim için Rough.js eklendi (kullanıcı kararı, ordinus.dev örneği). Hareket kütüphanesi hâlâ yok.

### K12 · Önce tuvalde onay, sonra kod

Kod yazılmadan önce mevcut tasarım tuvaline 4 artboard eklenir:

1. Kapak
2. Bölüm 3 sahnesi
3. Künye paneli açık hâli
4. Telefon görünümü

Sıla onaylayınca React'e geçilir. Eski tasarım tuvalde yerinde kalır.

## Sıradaki adımlar

1. Tuvale 4 artboard'u çiz → Sıla'nın onayı.
2. Onaydan sonra `src/` yeniden yazılır. Eski site git geçmişinde (`6f886bd`) durur. Taşınacaklar: içerik (`data.ts`, kısaltılarak), iletişim kartları, 4 adım bandı, GitHub Pages yayını.
3. Tarayıcıda masaüstü ve telefon doğrulaması.
4. Commit ve gönderim, her biri için ayrıca onay alınır. Depo: `Ssillaa.github.io`.

## Kapsam dışı

- Maskot ve ahtapot (K6).
- Kaydırmaya milim milim bağlı hareket (K11).
- Ek hareket kütüphanesi (K11).
- Deneyimlerin uzun açıklamaları. İsteyen CV'den okur.
