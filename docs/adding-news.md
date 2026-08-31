# Yeni Haber Ekleme

`news/news-TEMPLATE.html` artık ortak tasarımı `../css/news-story.css` ve `../js/news-story.js`'ten alıyor — CSS/JS'e hiç dokunmadan, sadece içerik dolduruyorsunuz.

## Adımlar

### 1. Fotoğrafı yükle
Haber için kullanacağın görseli `photos/` klasörüne at.
Örnek: `photos/yeni-haber-foto.jpg`

### 2. Şablonu kopyala
`news/news-TEMPLATE.html` dosyasını kopyala, yeni bir isim ver:
Örnek: `news/news-yeni-haber.html`

### 3. Şablonu doldur
Yeni dosyayı aç, `<!-- ADIM ... -->` yorumlarıyla işaretli 5 yeri güncelle:

| Alan | Ne yazacaksın |
|------|---------------|
| `<title>` | Haber başlığı (tarayıcı sekmesinde görünür) |
| `.story-hero img src` | `../photos/FOTOGRAF_ADI.jpg` |
| `.story-tag` | Kategori ve yıl (ör: `Fair · 2025`) — EN + TR |
| `.story-title` | İngilizce + Türkçe başlık (`<em>` ile vurgu yapılabilir) |
| `.story-body` | İngilizce + Türkçe paragraflar (her paragraf ayrı `<p data-lang="...">`) |

**Özel isimlerde Türkçe karakter kullanmayı unutma** — İngilizce metinde bile: Şahin, Türkiye, ALİ gibi (bkz. `docs/contributing.md`).

### 4. news.html'e liste kartı ekle
`news.html` dosyasını aç, `<!-- NEWS LIST -->` bölümünü bul. En üste yeni bir kart bloğu ekle:

```html
<div class="news-item reveal" onclick="location.href='news/news-yeni-haber.html'">
  <div class="ni-img"><img src="photos/yeni-haber-foto.jpg" alt="Haber adı"></div>
  <div class="ni-body">
    <span class="ni-tag"><span data-lang="en">CATEGORY · YEAR</span><span data-lang="tr">KATEGORİ · YIL</span></span>
    <h2 class="ni-title"><span data-lang="en">English title</span><span data-lang="tr">Türkçe başlık</span></h2>
    <p class="ni-excerpt"><span data-lang="en">Short excerpt (1-2 sentences).</span><span data-lang="tr">Kısa özet Türkçe.</span></p>
    <div class="ni-footer"><span class="ni-date">2025</span><span class="ni-arrow">→</span></div>
  </div>
</div>
```

Öne çıkan (featured) haberi değiştirmek istersen `news.html` içindeki `<article class="featured ...">` bloğunu bul, `onclick`'teki dosya adını ve içerideki fotoğraf/başlık/özeti güncelle.

### 5. sitemap.xml'e URL ekle
```xml
<url>
  <loc>https://www.oncecustom.com/news/news-yeni-haber.html</loc>
  <changefreq>never</changefreq>
  <priority>0.6</priority>
</url>
```

### 6. Push et
Değişiklikleri bir feature branch'e commit et, gözden geçir, `main`'e al — site otomatik güncellenir.

---

## Path Kuralları (news/ altında)

`news/` klasöründeki dosyalarda her şey üst klasöre göre `../` ile başlar:
- CSS/JS: `href="../css/news-story.css"`, `src="../js/news-story.js"`
- Fotoğraflar: `src="../photos/..."`
- Ana sayfaya link: `href="../index.html"`
- Haberler listesine: `href="../news.html"`

`news.html`'in kendisi root'ta olduğu için oradaki linkler `news/` prefix'i alır: `onclick="location.href='news/news-yeni-haber.html'"`.
