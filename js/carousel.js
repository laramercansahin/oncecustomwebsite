var N = products.length;
var cfCurrent = 0;
var cfAnimating = false;
var sliderCurrent = 0;
var sliderAnimating = false;
var lang = 'tr';

document.getElementById('cfTot').textContent = String(N).padStart(2,'0');
/* cTot removed from HTML */

/* ── BUILD ORBITAL RING ITEMS ── */
var cfRing = document.getElementById('cfRing');
var cfItems = [];
var RING_R = 520;          /* translateZ radius */
var ANGLE_STEP = 360 / N;
var FADE_DEG = 65;         /* degrees from front before fading out */

products.forEach(function(p, i){
  var item = document.createElement('div');
  item.className = 'cf-item';
  item.dataset.index = i;
  /* fixed position on the ring */
  item.style.transform = 'rotateY(' + (i * ANGLE_STEP) + 'deg) translateZ(' + RING_R + 'px)';
  item.innerHTML = '<img src="' + (p.gallery ? p.gallery[0] : p.img) + '" alt="' + p.name + '" loading="' + (i < 4 ? 'eager' : 'lazy') + '">';

  item.addEventListener('click', function(){
    var idx = parseInt(this.dataset.index);
    if(idx === cfCurrent){ goToDetail(idx); }
    else { cfGoTo(idx); }
  });

  cfRing.appendChild(item);
  cfItems.push(item);
});

function cfRender(){
  /* rotate ring so current item faces front */
  cfRing.style.transform = 'rotateY(' + (-cfCurrent * ANGLE_STEP) + 'deg)';

  cfItems.forEach(function(item, i){
    /* compute angle difference from front, wrap to -180..180 */
    var diff = ((i - cfCurrent) * ANGLE_STEP % 360 + 540) % 360 - 180;
    var absDiff = Math.abs(diff);

    if(absDiff > FADE_DEG + 20){
      /* behind — invisible */
      item.style.opacity = '0';
      item.style.pointerEvents = 'none';
    } else if(absDiff > FADE_DEG){
      /* soft fade zone */
      var t = 1 - (absDiff - FADE_DEG) / 20;
      item.style.opacity = String(t * 0.15);
      item.style.pointerEvents = 'none';
    } else {
      /* visible — opacity and brightness fall off with angle */
      var t = 1 - absDiff / FADE_DEG;
      item.style.opacity = String(0.18 + t * 0.82);
      item.style.pointerEvents = 'auto';
    }

    item.classList.toggle('cf-active', i === cfCurrent);
  });

  var p = products[cfCurrent];
  document.getElementById('cfName').textContent = p.name;
  document.getElementById('cfTag').innerHTML =
    '<span data-lang="en">' + p.tagline.en + '</span><span data-lang="tr">' + p.tagline.tr + '</span>';
  document.getElementById('cfCur').textContent = String(cfCurrent + 1).padStart(2,'0');
  applyLang();
}

function cfGo(dir){
  if(cfAnimating) return;
  cfCurrent = (cfCurrent + dir + N) % N;
  cfAnimating = true; cfRender();
  setTimeout(function(){ cfAnimating = false; }, 1050);
}
function cfGoTo(idx){
  if(cfAnimating || idx === cfCurrent) return;
  cfCurrent = idx;
  cfAnimating = true; cfRender();
  setTimeout(function(){ cfAnimating = false; }, 1050);
}

/* drag / swipe */
var cfDragStartX = null;
var cfScene = document.getElementById('cfScene');
cfScene.addEventListener('mousedown', function(e){ cfDragStartX = e.clientX; });
cfScene.addEventListener('mouseup', function(e){
  if(cfDragStartX === null) return;
  var dx = e.clientX - cfDragStartX;
  if(Math.abs(dx) > 40){ cfGo(dx < 0 ? 1 : -1); }
  cfDragStartX = null;
});
cfScene.addEventListener('touchstart', function(e){ cfDragStartX = e.touches[0].clientX; }, {passive:true});
cfScene.addEventListener('touchend', function(e){
  if(cfDragStartX === null) return;
  var dx = e.changedTouches[0].clientX - cfDragStartX;
  if(Math.abs(dx) > 40){ cfGo(dx < 0 ? 1 : -1); }
  cfDragStartX = null;
}, {passive:true});

/* ── BUILD SLIDES ── */
var slidesWrap = document.getElementById('slides');
var dotsWrap = document.getElementById('dotsWrap');

products.forEach(function(p, i){
  var gallery = p.gallery || [p.img];
  var thumbsHtml = '';
  if(gallery.length > 1){
    gallery.forEach(function(url, gi){
      thumbsHtml += '<div class="gallery-thumb'+(gi===0?' active':'')+'" data-slide="'+i+'" data-gi="'+gi+'">' +
        '<img src="'+url+'" alt="" loading="lazy"></div>';
    });
    thumbsHtml += '<div class="gallery-count">'+gallery.length+'</div>';
  }

  var s = document.createElement('div');
  s.className = 'slide ' + (i === 0 ? 'active' : 'next');
  s.innerHTML =
    '<div class="slide-bg"><div class="slide-bg-inner" style="background:' + bgGradients[i] + ';position:absolute;inset:0;"></div></div>' +
    '<div class="slide-ghost">' + String(i+1).padStart(2,'0') + '</div>' +
    '<div class="slide-content">' +
      '<div class="slide-left">' +
        (p.comingSoon ? '<div class="slide-soon-badge"><span data-lang="en">Coming Soon</span><span data-lang="tr">Yakında</span></div>' : '') +
        '<div class="slide-name">' + p.name + '</div>' +
        '<div class="slide-maker">Once Custom Sound</div>' +
        '<div class="slide-tagline">' +
          '<span data-lang="en">' + p.tagline.en + '</span>' +
          '<span data-lang="tr">' + p.tagline.tr + '</span>' +
        '</div>' +
        '<div class="slide-divider"></div>' +
        '<div class="slide-specs">' +
          p.specs.map(function(sp){ return '<div class="spec-row"><span class="spec-label">' + sp.l + '</span><span class="spec-val">' + sp.v + '</span></div>'; }).join('') +
        '</div>' +
        '<div class="slide-cta">' +
          '<a href="mailto:info@oncecustom.com?subject=Enquiry: ' + p.name + '" class="cta-btn">' +
            '<span data-lang="en">Enquire</span><span data-lang="tr">Bilgi Al</span>' +
          '</a>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="slide-right">' +
      '<div class="gallery-frame">' +
        '<div class="gallery-main">' +
          '<img class="gallery-main-img" src="'+gallery[0]+'" alt="'+p.name+'" loading="'+(i<2?'eager':'lazy')+'">' +
        '</div>' +
        '<div class="gallery-floor"></div>' +
      '</div>' +
      '<div class="gallery-thumbs">'+thumbsHtml+'</div>' +
    '</div>';
  slidesWrap.appendChild(s);

  var d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.onclick = (function(idx){ return function(){ goTo(idx); }; })(i);
  dotsWrap.appendChild(d);
});

/* ── GALLERY THUMB CLICK ── */
document.getElementById('slides').addEventListener('click', function(e){
  var thumb = e.target.closest('.gallery-thumb');
  if(!thumb) return;
  var si = parseInt(thumb.dataset.slide);
  var gi = parseInt(thumb.dataset.gi);
  var gallery = products[si].gallery || [products[si].img];
  var slide = document.querySelectorAll('.slide')[si];
  var mainImg = slide.querySelector('.gallery-main-img');
  var thumbs = slide.querySelectorAll('.gallery-thumb');
  mainImg.classList.add('fading');
  setTimeout(function(){ mainImg.src = gallery[gi]; mainImg.classList.remove('fading'); }, 260);
  thumbs.forEach(function(t){ t.classList.remove('active'); });
  thumb.classList.add('active');
});

function goToDetail(idx){
  sliderCurrent = idx;
  sliderRender();
  document.getElementById('hero-section').scrollIntoView({behavior:'smooth'});
}

function sliderRender(){
  document.querySelectorAll('.slide').forEach(function(s, i){
    s.className = 'slide ' + (i < sliderCurrent ? 'prev' : i === sliderCurrent ? 'active' : 'next');
  });
  document.querySelectorAll('.dot').forEach(function(d, i){ d.classList.toggle('active', i === sliderCurrent); });
  /* cCur removed from HTML */
  document.getElementById('progFill').style.width = ((sliderCurrent + 1) / N * 100) + '%';
  document.getElementById('btnUp').disabled = sliderCurrent === 0;
  document.getElementById('btnDown').disabled = sliderCurrent === N - 1;
  applyLang();
}

function go(dir){
  if(sliderAnimating) return;
  var n = sliderCurrent + dir;
  if(n < 0 || n >= N) return;
  sliderAnimating = true; sliderCurrent = n; sliderRender();
  setTimeout(function(){ sliderAnimating = false; }, 960);
}
function goTo(idx){
  if(sliderAnimating || idx === sliderCurrent) return;
  sliderAnimating = true; sliderCurrent = idx; sliderRender();
  setTimeout(function(){ sliderAnimating = false; }, 960);
}

/* wheel in hero */
var wheelLock = false;
window.addEventListener('wheel', function(e){
  var hero = document.getElementById('hero-section');
  var rect = hero.getBoundingClientRect();
  var fullyInView = rect.top >= -20 && rect.top <= 20;
  if(fullyInView){
    if(wheelLock) return;
    if(Math.abs(e.deltaY) < 40) return;
    if(e.deltaY > 0 && sliderCurrent === N-1) return;
    if(e.deltaY < 0 && sliderCurrent === 0) return;
    e.preventDefault();
    wheelLock = true; go(e.deltaY > 0 ? 1 : -1);
    setTimeout(function(){ wheelLock = false; }, 1600);
  }
}, {passive:false});

/* wheel on coverflow — advance carousel */
var cfWheelLock = false;
window.addEventListener('wheel', function(e){
  var cf = document.getElementById('coverflow-section');
  var rect = cf.getBoundingClientRect();
  if(rect.top > -10 && rect.bottom >= window.innerHeight * .9){
    if(cfWheelLock) return;
    cfWheelLock = true;
    cfGo(e.deltaY > 0 ? 1 : -1);
    setTimeout(function(){ cfWheelLock = false; }, 900);
  }
}, {passive:true});

/* touch slide in hero */
var touchY = null;
window.addEventListener('touchstart', function(e){ touchY = e.touches[0].clientY; }, {passive:true});
window.addEventListener('touchend', function(e){
  if(touchY === null) return;
  var dy = touchY - e.changedTouches[0].clientY;
  var hero = document.getElementById('hero-section');
  var rect = hero.getBoundingClientRect();
  if(rect.top > -10 && Math.abs(dy) > 40){ go(dy > 0 ? 1 : -1); }
  touchY = null;
}, {passive:true});

/* keyboard */
window.addEventListener('keydown', function(e){
  var cf = document.getElementById('coverflow-section');
  var hero = document.getElementById('hero-section');
  var cfRect = cf.getBoundingClientRect();
  var heroRect = hero.getBoundingClientRect();
  if(cfRect.top > -200 && cfRect.bottom > 200){
    if(e.key === 'ArrowRight') cfGo(1);
    if(e.key === 'ArrowLeft') cfGo(-1);
    if(e.key === 'Enter') goToDetail(cfCurrent);
  } else if(heroRect.top > -200){
    if(e.key === 'ArrowDown') go(1);
    if(e.key === 'ArrowUp') go(-1);
  }
});

/* lang */
function applyLang(){
  document.querySelectorAll('[data-lang]').forEach(function(el){
    el.style.display = el.dataset.lang === lang ? 'inline' : 'none';
  });
}
function setLang(l){
  lang = l; document.body.className = l;
  document.getElementById('btnEN').classList.toggle('active', l === 'en');
  document.getElementById('btnTR').classList.toggle('active', l === 'tr');
  localStorage.setItem('once_lang', l); applyLang();
}
setLang(localStorage.getItem('once_lang') || 'en');

/* loader */
window.addEventListener('DOMContentLoaded', function(){
  var logo = document.getElementById('loader-logo');
  var bar = document.getElementById('lbar');
  setTimeout(function(){ logo.classList.add('show'); }, 100);
  setTimeout(function(){ bar.style.width = '100%'; }, 200);
  setTimeout(function(){
    document.getElementById('loader').classList.add('out');
    cfRender();
    sliderRender();
  }, 1700);

  var exploreHint = document.getElementById('exploreHint');
  if (exploreHint) {
    exploreHint.addEventListener('click', function(e){
      e.stopPropagation();
      document.getElementById('hero-section').scrollIntoView({behavior:'smooth'});
    });
  }
});
