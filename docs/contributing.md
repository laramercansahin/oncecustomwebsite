# Katkı / Geliştirme Kuralları

## Asla Yapılmayacaklar

- **`.nojekyll` dosyasını asla silme.** Root'ta boş bir dosya, GitHub Pages'in Jekyll build'ini devre dışı bırakır. Silinirse site build hatası verir veya beklenmedik şekilde davranır.
- **Doğrudan `main`'e commit atma.** `main` canlı site — her push otomatik deploy olur. Yeni çalışma bir feature branch üzerinde yapılır.
- **Yeni section'lara border ekleme.** Border-free tasarım kuralı — ayrım spacing/gradient ile yapılır, `1px solid` çizgilerle değil.
- **`css/style.css`, `css/story-pages.css`, `css/carousel.css` içindeki `:root` token'larını "birleştirmeye" çalışma.** Bu değerler sayfa ailelerine göre kasıtlı/tarihsel olarak farklı (bkz. `docs/design-system.md`) — tekilleştirmek görsel farka yol açar.

## Türkçe Karakterler

İngilizce sayfalarda bile özel isimlerde Türkçe karakter kullanılır:
- Mustafa Sait **Ş**ahin, Halit Said **Ş**ahin (Ş harfi)
- **Türkiye** (ü, i)
- Ürün adları: SU, NAR, **ALİ**, ALMULA, DAL, RAN, LARA, HAR

## `news/` Altında Path Kuralları

`news/` klasöründeki dosyalarda tüm göreceli path'ler `../` ile başlamalı:
- `../css/news-story.css`, `../js/news-story.js`
- `../photos/...`
- `../index.html`, `../news.html`

Detay için `docs/adding-news.md`.

## Paylaşılan CSS/JS Dosyaları — Hangi Sayfa Neyi Kullanır

| Dosya | Kullanan sayfalar |
|---|---|
| `css/style.css` | products, our_story, news, distributors, speakers |
| `css/story-pages.css` + `js/story-pages.js` | our_story, news, distributors |
| `css/carousel.css` + `js/carousel.js` | products, speakers |
| `css/news-story.css` + `js/news-story.js` | news/news-*.html (tüm haber detay sayfaları) |

`index.html` hiçbirini kullanmıyor — kendi ayrı topbar/reveal sistemine sahip (bkz. `docs/design-system.md`).

**Bu dosyalardan birini değiştirirken:** değişiklik onu kullanan TÜM sayfaları etkiler. Sadece tek bir sayfayı değiştirmek istiyorsanız, o sayfanın kendi inline `<style>`/`<script>` bloğuna ekleyin — paylaşılan dosyaya dokunmayın.

Yeni bir top-level sayfa eklerken hangi aileye görsel/davranışsal olarak en yakın olduğuna karar verip ilgili `css/`+`js/` dosyalarını `<link>`/`<script src>` ile bağlayın; kalan sayfaya özel CSS/JS kendi `<style>`/`<script>` bloğunda kalsın.

## Yeni Haber Eklerken

Bkz. `docs/adding-news.md` — 5 adımlı rehber.

## Değişiklik Sonrası Doğrulama

- Değiştirdiğiniz sayfayı ve paylaşılan dosyayı kullanan diğer sayfaları tarayıcıda açıp görsel farkı olmadığını kontrol edin (topbar, fontlar, reveal animasyonları, dil değiştirme).
- `news/` altındaki path referanslarının (`../css/...`, `../js/...`, `../photos/...`) 404 vermediğini kontrol edin.
- Yeni haber eklediyseniz `sitemap.xml`'in hâlâ geçerli XML olduğunu kontrol edin.
