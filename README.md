# Once Custom Sound — Website

**Canlı site:** [oncecustom.com](https://oncecustom.com) (GitHub Pages üzerinden, `laramercansahin.github.io/oncecustomwebsite` repo'suna bağlı)

Statik bir HTML/CSS/JS sitesi — **backend yok, build adımı yok**. GitHub Pages dosyaları olduğu gibi sunar; `main` branch'ine yapılan her push canlıya otomatik yansır. İletişim formu yerine `mailto:` linkleri kullanılıyor.

---

## Klasör Yapısı

```
oncecustomwebsite/
├── index.html              → Ana sayfa
├── products.html           → Ürünler (3D carousel + slide detail)
├── our_story.html          → Hikayemiz
├── news.html               → Haberler listesi
├── distributors.html       → Distribütörler
├── speakers.html           → Ek/önizleme sayfası (bkz. not aşağıda)
│
├── css/
│   ├── style.css           → Tüm sayfalarda (index hariç) ortak temel: reset, body, loader, dil toggle
│   ├── story-pages.css     → our_story / news / distributors ortak stilleri (loader detayları, topbar hover)
│   ├── carousel.css        → products / speakers ortak 3D carousel tasarım sistemi
│   └── news-story.css      → news/ altındaki haber detay sayfalarının tasarımı
│
├── js/
│   ├── story-pages.js      → our_story / news / distributors ortak JS (dil değiştirme, loader, scroll)
│   ├── carousel.js         → products / speakers ortak carousel motoru
│   └── news-story.js       → news/ detay sayfalarının ortak JS'i
│
├── news/
│   ├── news-TEMPLATE.html  → Yeni haber şablonu
│   └── news-*.html         → Haber detay sayfaları
│
├── photos/                 → Tüm görseller
├── docs/                   → Bu klasör: tasarım sistemi, haber ekleme, katkı kuralları
├── sitemap.xml
└── .nojekyll                → Jekyll'i devre dışı bırakır — **asla silme**
```

> **Not — index.html farklı bir sistem kullanıyor:** `index.html`'in topbar/menü tasarımı (hamburger menü, `.topbar`/`.menu-nav`) diğer sayfalardan tamamen farklı ve hiçbir ortak `css/`/`js/` dosyasını kullanmıyor. Bu bilinçli bir tasarım kararı olabilir ya da zamanla ayrışmış olabilir — dokunmadan bırakıldı, `css/style.css` vb. dosyalar index.html'e link'lenmedi.

> **Not — speakers.html:** Bu sayfa `products.html` ile neredeyse aynı carousel motorunu kullanıyor ama farklı bir amaç için (isim ve bazı ürün verileri farklı, "Coming Soon" etiketleri eksik). `sitemap.xml`'de yer almıyor — muhtemelen bir önizleme/staging sayfası. İçeriğine dokunulmadı, sadece ortak kodu `carousel.css`/`carousel.js` ile paylaşıyor.

Detaylı rehberler için `docs/` klasörüne bakın:
- [`docs/design-system.md`](docs/design-system.md) — renk token'ları, fontlar, border-free kural, topbar, reveal animasyonları
- [`docs/adding-news.md`](docs/adding-news.md) — yeni haber ekleme adımları
- [`docs/contributing.md`](docs/contributing.md) — katkı kuralları, dikkat edilmesi gerekenler

---

## Lokal Önizleme

Build adımı yok, sadece bir statik dosya sunucusu yeterli:

```bash
python3 -m http.server 8000
# http://localhost:8000/index.html
```

veya Node varsa:

```bash
npx serve .
```

---

## Dil Değiştirme

`localStorage`'a kaydedilir (`once_lang` anahtarı, `en`/`tr`). Sayfa yüklendiğinde son seçilen dil otomatik uygulanır. İçerik `body.en` / `body.tr` class'ı ile `[data-lang]` attribute'u üzerinden gösterilip gizlenir — her metin genelde iki `<span data-lang="en">…</span>` / `<span data-lang="tr">…</span>` olarak yazılır.

---

## Git — Branch Bilgisi

- **`main`** — canlı site, doğrudan buraya commit atılmaz
- Yeni çalışma bir **feature branch** üzerinde yapılır, gözden geçirildikten sonra `main`'e alınır
