const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 1;
const totalSlides = slides.length;

// Initial position
function updateSlide() {
  track.style.transform = `translateX(-${index * 100}%)`;
}
updateSlide();

// Auto slide
let interval = setInterval(nextSlide, 1000);

function nextSlide() {
  index++;
  track.style.transition = "transform 0.6s ease-in-out";
  updateSlide();

  if (index === totalSlides - 1) {
    setTimeout(() => {
      track.style.transition = "none";
      index = 1;
      updateSlide();
    }, 600);
  }
}

function prevSlide() {
  index--;
  track.style.transition = "transform 0.6s ease-in-out";
  updateSlide();

  if (index === 0) {
    setTimeout(() => {
      track.style.transition = "none";
      index = totalSlides - 2;
      updateSlide();
    }, 600);
  }
}

// Button controls
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

// Pause auto on interaction
function resetAutoSlide() {
  clearInterval(interval);
  interval = setInterval(nextSlide, 1000);
}

// Pause on hover
track.addEventListener("mouseenter", () => clearInterval(interval));
track.addEventListener("mouseleave", () => {
  interval = setInterval(nextSlide, 3000);
});