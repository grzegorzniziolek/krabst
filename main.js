// Sticky header
window.addEventListener('scroll', () => {
  document.getElementById('site-header')
          .classList.toggle('sticky', window.scrollY > 64);
});

// Dynamic year in footer
document.getElementById('yr').textContent = new Date().getFullYear();

// Fade-in animation on scroll
document.querySelectorAll('.fade-in-up').forEach(el=>{
  const obs=new IntersectionObserver(([e])=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      obs.disconnect();
    }
  },{threshold:.2});
  obs.observe(el);
}); 