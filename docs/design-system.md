# Tasarım Sistemi

## Renk Token'ları

`css/style.css`, `css/story-pages.css`, `css/carousel.css` ve `css/news-story.css` dosyalarının hepsi kendi `:root` bloklarını taşır — sayfa ailelerine göre ufak sapmalar var (bkz. aşağıdaki tablo), bu yüzden **tek bir evrensel token seti yoktur**, kod içine yeni bir sayfa eklerken hangi aileye ait olduğuna göre doğru değerleri kullanın.

| Değişken | index.html | our_story / news / distributors | products / speakers | news/ detay sayfaları |
|---|---|---|---|---|
| `--black` | `#0A0806` | `#0F0D0A` | `#0F0D0A` | `#0F0D0A` |
| `--card` | `#0F0D0A` | — | — | — |
| `--border` | `#2A2520` | `#2A2520` | `#2A2520` | `#2A2520` |
| `--bronze` | `#C87941` | `#C87941` | `#C87941` | `#C87941` |
| `--cream` | `#EDE4D5` | `#EDE4D5` | `#EDE4D5` | `#EDE4D5` |
| `--mid` | `#A89F94` | `#C8BFB4` | `#B8AFA4` | `#C8BFB4` |
| `--ghost` | `#6A6058` | `#7A7060` (news.html) | `#1E1A15` | `#7A7060` |

`--bronze`, `--border`, `--cream` sabit — bunlar gerçek anlamda evrensel. `--black`/`--mid`/`--ghost` sayfa ailesine göre ince ayarlanmış, **bunları "düzeltmeye" çalışmayın** — kasıtlı olabilir, olmasa bile mevcut görünümü bozar.

```css
:root {
  --black:  #0A0806;   /* veya #0F0D0A, aileye göre */
  --border: #2A2520;
  --bronze: #C87941;
  --cream:  #EDE4D5;
  --mid:    #A89F94;    /* aileye göre değişir */
  --ghost:  #6A6058;    /* aileye göre değişir */
}
```

---

## Fontlar

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:ital,wght@0,200;0,300;0,400;1,200;1,300&display=swap" rel="stylesheet">
```

- **Serif (başlıklar):** Cormorant Garamond — italic, weight 300/400
- **Sans (body/nav):** Jost — weight 200/300/400
- **Ürün adları / carousel (products.html, speakers.html):** Bebas Neue
- **news/ detay sayfaları:** Bebas Neue + Jost (ayrı font import'u, `news-story.css` ile birlikte gelir)

---

## Border-Free Tasarım

Bölümler arasında `1px solid` çizgi kullanılmaz. Ayrım şu yollarla yapılır:
- Boşluk (spacing/padding farkları)
- Faint bronze gradientler
- `gap:2px` card layout'lar

Yeni bir section eklerken `border-bottom`/`border-top` ile bölüm ayırmayın.

---

## Topbar — İki Ayrı Sistem

**Önemli:** Sitede tek bir topbar sistemi yok, iki farklı sistem var:

### 1. `index.html` — hamburger menü sistemi
- `.topbar` — 64px yükseklik, `rgba(10,8,6,0.92)` arka plan
- `.topbar-ham` → tıklanınca `.menu-overlay` açılır (tam ekran menü, serif italic linkler)
- Bu sistem index.html'e özel, başka hiçbir sayfa kullanmıyor

### 2. Diğer 5 sayfa (`products`, `our_story`, `news`, `distributors`, `speakers`) — `.bar` sistemi
- `nav.bar#topbar` — 80px yükseklik, EN/TR butonları doğrudan görünür
- `products.html`/`speakers.html`: sabit opak arka plan (`background:rgba(15,13,10,.92)`, her zaman görünür border)
- `our_story.html`/`news.html`/`distributors.html`: başlangıçta transparent, `scroll > 60px`'te `.scrolled` class'ı ile koyulaşır (`css/style.css` + `css/story-pages.css`'teki kurallar)
- `news/` detay sayfaları: aynı `.bar` yapısı ama kendi `css/news-story.css`'i içinde tanımlı, transparent→scrolled geçişli

Yeni bir sayfa eklerken hangi aileye ait olacağına karar verip ilgili `css/`+`js/` dosyalarını link'leyin (bkz. `docs/contributing.md`).

---

## Scroll Reveal Animasyonları

Burada da tam bir birlik yok — üç farklı reveal implementasyonu var:

### index.html
```css
.reveal        { opacity:0; transform:translateY(28px); transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s ...; }
.reveal.visible { opacity:1; transform:translateY(0); }
.reveal-left    { opacity:0; transform:translateX(-32px); ... }
.reveal-d1      { transition-delay: 0.1s; }
.reveal-d2      { transition-delay: 0.2s; }
.reveal-d3      { transition-delay: 0.3s; }
.reveal-d4      { transition-delay: 0.45s; }
```
Trigger class: **`.visible`** (IntersectionObserver ile eklenir, `js` index.html içinde inline).

### our_story.html (en zengin set)
```css
.reveal       { opacity:0; transform:translateY(32px); transition:opacity .9s ease,transform .9s ease; }
.reveal.done  { opacity:1; transform:translateY(0); }
.reveal-left  { opacity:0; transform:translateX(-40px); ... }
.reveal-right { opacity:0; transform:translateX(40px); ... }
.reveal-scale { opacity:0; transform:scale(.98); ... }
```
Trigger class: **`.done`**. Ayrıca `.lx-line` adlı ayrı bir satır-satır reveal sistemi var (sadece our_story.html'de).

### news.html / distributors.html
```css
.reveal { opacity:0; transform:translateY(24px veya 28px); transition:opacity .85s/.9s ease,transform .85s/.9s ease; }
.reveal.done { opacity:1; transform:translateY(0); }
```
Trigger class: **`.done`**. `.reveal-left`/`.reveal-scale` yok — sadece temel `.reveal`.

**Not:** `news.html`, `distributors.html` ve `our_story.html` arasında `translateY` mesafesi (24/28/32px) ve transition süresi (.85s/.9s) küçük farklarla değişiyor — bunlar `css/story-pages.css`'e taşınmadı, her sayfanın kendi `<style>` bloğunda kaldı çünkü değerler birbirinden farklı. Yeni sayfa eklerken hangi sayfayı örnek aldıysanız o sayfanın değerlerini kopyalayın.

IntersectionObserver kurulumu (`observe()` fonksiyonu) her ailede farklı `threshold`/`rootMargin` kullanıyor, bu yüzden JS tarafı da paylaşılmadı — sadece loader/setLang/scroll-listener kısmı `js/story-pages.js`'e çıkarıldı.
