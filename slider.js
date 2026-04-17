const slider = document.getElementById('slider');
let slides = document.querySelectorAll('.slide');
let currentIndex = 0;

// Clone the first slide and append it
const firstClone = slides[0].cloneNode(true);
slider.appendChild(firstClone);

// Re-select all slides after cloning
slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function updateSlider() {
  const offset = slides[0].offsetWidth + 30; // slide width + margin
  slider.style.transform = `translateX(-${currentIndex * offset}px)`;
}

function moveRight() {
  currentIndex++;
  updateSlider();

  if (currentIndex === totalSlides - 1) {
    // Rewind back to real first slide after animation ends
    setTimeout(() => {
      slider.style.transition = 'none';
      currentIndex = 0;
      updateSlider();
      // Re-enable transition for future slides
      setTimeout(() => {
        slider.style.transition = 'transform 0.5s ease-in-out';
      }, 50);
    }, 500); // matches transition speed
  }
}

function moveLeft() {
  currentIndex = (currentIndex - 1 + totalSlides - 1) % (totalSlides - 1);
  updateSlider();
}

// Auto slide forward every 3 seconds
setInterval(() => {
  moveRight();
}, 2000);

// Recalculate on window resize
window.addEventListener('resize', updateSlider);
