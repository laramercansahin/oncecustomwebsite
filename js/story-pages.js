function setLang(l){
  document.body.className=l;
  document.getElementById('btnEN').classList.toggle('active',l==='en');
  document.getElementById('btnTR').classList.toggle('active',l==='tr');
  localStorage.setItem('once_lang',l);
}
setLang(localStorage.getItem('once_lang')||'en');

window.addEventListener('DOMContentLoaded',function(){
  var img=document.getElementById('loaderImg');
  var bar=document.getElementById('loaderBar');
  var loader=document.getElementById('loader');
  setTimeout(function(){img.classList.add('show');},120);
  setTimeout(function(){bar.style.width='100%';},200);
  setTimeout(function(){
    loader.classList.add('out');
    observe();
  },1700);
});

window.addEventListener('scroll',function(){
  document.getElementById('topbar').classList.toggle('scrolled',window.scrollY>60);
});
