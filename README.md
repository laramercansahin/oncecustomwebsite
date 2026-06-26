# Once Custom Sound — Website

**Canlı site:** [laramercansahin.github.io/oncecustomwebsite](https://laramercansahin.github.io/oncecustomwebsite)

---

## Klasör Yapısı

```
oncecustomwebsite/
│
├── index.html              → Ana sayfa
├── products.html           → Ürünler sayfası
├── our_story.html          → Hikayemiz sayfası
├── news.html               → Haberler listesi sayfası
├── distributors.html       → Distribütörler sayfası
│
├── news-TEMPLATE.html      → YENİ HABER EKLEMEK İÇİN ŞABLON (bkz. aşağıda)
├── news-munich.html        → Haber detay: Munich High End 2024
├── news-lamborghini.html   → Haber detay: Lamborghini iş birliği
├── news-warnerbros.html    → Haber detay: Tom & Jerry filmi
├── news-almula.html        → Haber detay: ALMULA tanıtımı
├── news-anniversary.html   → Haber detay: 12. yıl dönümü
├── news-su.html            → Haber detay: SU — ilk model
│
├── photos/                 → Tüm fotoğraflar bu klasörde
│   ├── Once_index_photo.jpg
│   ├── Almula_Space.jpg
│   ├── By_hand.jpg
│   ├── By_hand_2.jpg
│   ├── Nar_Space.jpg
│   ├── Ran_Space_2.jpg
│   ├── Ran_space.jpg
│   ├── Su_Green.jpg
│   ├── Su_Space.jpg
│   ├── Nar_Space.jpg
│   ├── ali.png
│   ├── almula.png
│   ├── halit_said.jpg
│   ├── lara.png
│   ├── nar.png
│   └── su.png
│
└── speakers.html / speakers_preview.html  → Ek sayfalar
```

---

## Yeni Haber Nasıl Eklenir? (5 Adım)

### 1. Fotoğrafı yükle
Haber için kullanacağın görseli `photos/` klasörüne at.  
Örnek: `photos/yeni-haber-foto.jpg`

### 2. Şablonu kopyala
`news-TEMPLATE.html` dosyasını kopyala, yeni bir isim ver:  
Örnek: `news-yeni-haber.html`

### 3. Şablonu doldur
Yeni dosyayı aç ve şu 5 yeri güncelle (hepsi `ADIM` yorumlarıyla işaretli):

| Alan | Ne yazacaksın |
|------|---------------|
| `<title>` | Haber başlığı (tab'da görünür) |
| `src="photos/FOTOGRAF_ADI.jpg"` | Fotoğraf dosya adı |
| `.story-tag` | Kategori ve yıl (ör: `Fair · 2025`) |
| `.story-title` | İngilizce + Türkçe başlık |
| `.story-body` | İngilizce + Türkçe paragraflar |

### 4. news.html'e liste kartı ekle
`news.html` dosyasını aç, `<!-- NEWS LIST -->` bölümünü bul.  
En üste yeni bir kart bloğu yapıştır:

```html
<div class="news-item reveal" onclick="location.href='news-yeni-haber.html'">
  <div class="ni-img"><img src="photos/yeni-haber-foto.jpg" alt="Haber adı"></div>
  <div class="ni-body">
    <span class="ni-tag"><span data-lang="en">KATEGORİ · YIL</span><span data-lang="tr">KATEGORİ · YIL</span></span>
    <h2 class="ni-title"><span data-lang="en">İngilizce başlık</span><span data-lang="tr">Türkçe başlık</span></h2>
    <p class="ni-excerpt"><span data-lang="en">Kısa özet (1-2 cümle).</span><span data-lang="tr">Kısa özet Türkçe.</span></p>
    <div class="ni-footer"><span class="ni-date">2025</span><span class="ni-arrow">→</span></div>
  </div>
</div>
```

### 5. Kaydet ve GitHub'a yükle
Değişiklikleri kaydet, GitHub'a push et — site otomatik güncellenir.

---

## Öne Çıkan Haber (Featured) Değiştirmek

`news.html` içinde `<article class="featured ...">` bloğunu bul.  
`onclick="location.href='news-XXXXX.html'"` kısmındaki dosya adını güncelle,  
içerideki fotoğraf, başlık ve özeti de değiştir.

---

## Teknik Notlar

- Statik site — backend gerekmez, sunucu gerekmez
- İletişim için `mailto:` linkleri kullanılıyor (email uygulaması açar)
- Dil değiştirme `localStorage`'a kaydedilir (EN/TR)
- Logo: `https://www.oncecustom.com/images/logo.png`
