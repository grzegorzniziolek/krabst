// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  let currentSlideIndex = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');

  // Check if carousel elements exist
  if (slides.length === 0 || dots.length === 0) {
    console.log('Carousel elements not found');
    return;
  }

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }

  function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
      currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
      currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
  }

  function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
  }

  // Make functions globally available for onclick handlers
  window.changeSlide = changeSlide;
  window.currentSlide = currentSlide;

  // Auto-advance slides every 5 seconds
  setInterval(() => {
    changeSlide(1);
  }, 5000);
});