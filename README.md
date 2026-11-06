# Sıla Bayram — Portfolyo

Vite + React + TypeScript ile yazılmış tek sayfalık kişisel portfolyo.

## Çalıştırma

```bash
npm install
npm run dev
```

## Metinleri değiştirmek

Sayfadaki bütün yazılar `src/data.ts` dosyasında. Bir yazıyı değiştirmek için
yalnızca orayı düzenlemek yeterli. Renkler `src/styles.css` dosyasının en
üstündeki `:root` bloğunda.

## Yayın (GitHub Pages)

`main` dalına her gönderimde `.github/workflows/deploy.yml` siteyi derleyip
GitHub Pages'e yükler. İlk seferde deponun **Settings → Pages → Source**
ayarını **GitHub Actions** yapmak gerekir.

- Depo adı `Ssillaa.github.io` ise site `https://ssillaa.github.io/` adresinde açılır.
- Başka bir adsa (örneğin `portfolyo`) `https://ssillaa.github.io/portfolyo/` adresinde açılır.
