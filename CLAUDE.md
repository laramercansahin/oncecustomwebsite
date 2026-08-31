# Once Custom Sound — Website Project

## Genel Bilgi
- **Site:** [laramercansahin.github.io/oncecustomwebsite](https://laramercansahin.github.io/oncecustomwebsite)
- **Canlı domain:** oncecustom.com (GitHub Pages üzerinde çalışıyor)
- **Statik site** — backend yok, sunucu yok. İletişim `mailto:` linkleriyle yapılıyor.
- **Dil değiştirme:** `localStorage`'a kaydedilir (EN/TR). `body.en` / `body.tr` class'ı ile `data-lang` / `data-inline-lang` attribute'ları çalışır.
- **Jekyll devre dışı:** `.nojekyll` dosyası root'ta mevcut — asla silme.

---

## Klasör Yapısı

```
oncecustomwebsite/
├── index.html              → Ana sayfa (kendi ayrı topbar/reveal sistemi — bkz. docs/design-system.md)
├── products.html           → Ürünler (3D carousel + slide detail)
├── our_story.html          → Hikayemiz
├── news.html               → Haberler listesi
├── distributors.html       → Distribütörler
├── speakers.html           → Ek/önizleme sayfası, sitemap.xml'de yok
├── .nojekyll               → Jekyll'i devre dışı bırakır (silme!)
├── sitemap.xml
│
├── css/                    → Paylaşılan CSS (style.css, story-pages.css, carousel.css, news-story.css)
├── js/                     → Paylaşılan JS (story-pages.js, carousel.js, news-story.js)
├── docs/                   → Tasarım sistemi, haber ekleme, katkı rehberleri
│
├── news/                   → Haber detay sayfaları
│   ├── news-TEMPLATE.html  → Yeni haber şablonu
│   ├── news-munich.html
│   ├── news-lamborghini.html
│   ├── news-warnerbros.html
│   ├── news-almula.html
│   ├── news-anniversary.html
│   └── news-su.html
│
└── photos/                 → Tüm görseller
    ├── su.png, nar.png, almula.png, ali.png, lara.png
    ├── Su_Space.jpg, Nar_Space.jpg, Almula_Space.jpg, ...
    └── halit_said.jpg, ali.png (kurucu fotoğrafları)
```

Hangi sayfanın hangi `css/`+`js/` dosyasını kullandığı ve neden bazı token'ların (`--mid`, `--ghost` vb.) sayfaya göre değiştiği için **`docs/design-system.md`** ve **`docs/contributing.md`**'ye bakın — bu dosya sadece genel özet içerir.

---

## CSS Değişkenleri (Design Tokens)

```css
:root {
  --black:  #0A0806;
  --card:   #0F0D0A;
  --border: #2A2520;
  --bronze: #C87941;
  --cream:  #EDE4D5;
  --mid:    #A89F94;
  --ghost:  #6A6058;
  --serif:  'Cormorant Garamond', Georgia, serif;
}
```

---

## Fontlar

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:ital,wght@0,200;0,300;0,400;1,200;1,300&display=swap" rel="stylesheet">
```

- **Serif (başlıklar):** Cormorant Garamond — italic, weight 300/400
- **Sans (body/nav):** Jost — weight 200/300/400
- **Ürün adları (products.html):** Bebas Neue

---

## Tasarım Prensipleri

- **Border-free design:** Bölümler arasında `1px solid` çizgi yok. Boşluk, gradient ve `gap:2px` card layout ile ayrım yapılıyor.
- **High-end / luxury feel:** Serif italic başlıklar, transparent topbar, scroll reveal animasyonları, faint bronze gradientler.
- **Topbar:** İki farklı sistem var — `index.html`'in kendi `.topbar` (64px, hamburger menü) ve diğer 5 sayfanın paylaştığı `.bar` (80px, EN/TR butonları direkt görünür). Detay: `docs/design-system.md`.
- **Logo:** `https://www.oncecustom.com/images/logo.png` — `filter: brightness(0) invert(1)` ile beyaz gösterilir.

---

## Scroll Reveal Animasyonlar

```css
.reveal       { opacity:0; transform:translateY(28px); transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s ... }
.reveal.visible { opacity:1; transform:translateY(0); }
.reveal-left  { opacity:0; transform:translateX(-32px); ... }
.reveal-d1    { transition-delay: 0.1s; }
.reveal-d2    { transition-delay: 0.2s; }
.reveal-d3    { transition-delay: 0.3s; }
.reveal-d4    { transition-delay: 0.45s; }
```

IntersectionObserver ile JS'de tetiklenir.

---

## products.html — 3D Carousel

- Ürünler JS veri dizisinde tanımlı: `name`, `img`, `gallery`, `tagline`, `desc`, `comingSoon`
- `comingSoon: true` olan ürünler: **NAR A+, DAL A+, SU 2, ALİ**
- Coming Soon badge sadece slide detail'de görünür (carousel'de gösterilmez)
- `.cf-header` ("The Collection" başlığı): `position:relative`, flex flow içinde, carousel üstünde
- `.slide-content`: `padding: 160px 0 60px 72px`, `align-items: flex-start` — back button ile çakışmasın diye

---

## news/ Sayfaları — Göreceli Path Kuralları

news/ altındaki dosyalarda:
- CSS/JS: `href="../css/news-story.css"`, `src="../js/news-story.js"`
- Fotoğraflar: `src="../photos/..."` (üst klasöre çık)
- Ana sayfaya link: `href="../index.html"`
- Haberler listesine: `href="../news.html"`

news.html'deki linkler:
- `onclick="location.href='news/news-munich.html'"` (news/ prefix'i ile)

---

## Yeni Haber Eklemek

Detaylı adım adım rehber: **`docs/adding-news.md`**. Kısa özet:

1. Fotoğrafı `photos/` klasörüne at
2. `news/news-TEMPLATE.html`'i kopyala → `news/news-yeni-isim.html` (CSS/JS zaten `../css/news-story.css` + `../js/news-story.js`'e link'li, dokunmana gerek yok)
3. Şablondaki 5 ADIM yorumunu doldur (title, fotoğraf, tag, başlık, body)
4. `news.html`'e kart bloğu ekle (<!-- NEWS LIST --> bölümüne)
5. `sitemap.xml`'e URL ekle
6. Push et

---

## Git — Branch Bilgisi

- **Ana branch:** `main` (canlı site)
- **Feature branch:** `claude/hopeful-bohr-w1zhqu`
- Her değişiklik her ikisine push edilir:
  ```bash
  git push origin HEAD:claude/hopeful-bohr-w1zhqu
  git push origin HEAD:main
  ```

---

## Kurucular

- **Mustafa Sait Şahin** — Co-founder (Türkçe karakterlere dikkat: Ş, ş)
- **Halit Said Şahin** — Co-founder
- Şirket: **Once Custom Sound**, Bursa, Türkiye
- Email: info@oncecustom.com
- Instagram: @oncecustom

---

## Özel İsimler ve Türkçe Karakterler

İngilizce versiyonda bile özel isimlerde Türkçe karakter kullanılır:
- Mustafa Sait **Ş**ahin (Ş harfi)
- **Türkiye** (ü, i)
- Bursa
- Ürün adları: SU, NAR, ALİ, ALMULA, DAL, RAN, LARA, HAR

---

## Dış Kaynaklar (Ürün Görselleri)

Bazı ürün görselleri `oncecustom.com` domain'inden yükleniyor:
```
https://www.oncecustom.com/images/urun/kare/Har_2025-v2.png
https://www.oncecustom.com/images/urun/kare/ran-v2.png
https://www.oncecustom.com/images/urun/kare/once-custom0009_Dal-v2.png
...
```
Sunucu 403 döndürebilir (server-side) ama tarayıcıda çalışır.
