// ======================
// ✅ NAVBAR TOGGLE MENU
// ======================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("open");

  // Shift body down when menu is open
  document.body.classList.toggle("menu-open");
});

// ===========================
// ✅ PROJECT CARD POPUP LOGIC
// ===========================
// Handles opening and closing of project detail popups
const cards = document.querySelectorAll('.card');
const popups = document.querySelectorAll('.popup-overlay');
const closeButtons = document.querySelectorAll('.popup .close');

// Open popup when a card is clicked
cards.forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-id');
    const popup = document.getElementById('popup-' + id);
    if (popup) popup.classList.add('active');
  });
});

// Close popup when close button is clicked
closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.popup-overlay').classList.remove('active');
  });
});

// Close popup when clicking outside the popup content
popups.forEach(popup => {
  popup.addEventListener('click', e => {
    if (e.target === popup) {
      popup.classList.remove('active');
    }
  });
});

// ============================
// ✅ AUTO SLIDER FUNCTIONALITY
// ============================
// Handles infinite looping image slider with auto movement
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById('slider');
  let slides = document.querySelectorAll('.slide');
  let currentIndex = 0;

  slider.style.transition = 'transform 0.5s ease-in-out';

  // Clone first slide for infinite looping
  const firstClone = slides[0].cloneNode(true);
  slider.appendChild(firstClone);

  slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  function updateSlider() {
    const offset = slides[0].offsetWidth + 30; // width + margin
    slider.style.transform = `translateX(-${currentIndex * offset}px)`;
  }

  function moveRight() {
    currentIndex++;
    updateSlider();

    // Reset to first slide when reaching the clone
    if (currentIndex === totalSlides - 1) {
      setTimeout(() => {
        slider.style.transition = 'none';
        currentIndex = 0;
        updateSlider();
        setTimeout(() => {
          slider.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
      }, 500);
    }
  }

  function moveLeft() {
    currentIndex = (currentIndex - 1 + totalSlides - 1) % (totalSlides - 1);
    updateSlider();
  }

  // Make functions available for buttons
  window.moveRight = moveRight;
  window.moveLeft = moveLeft;

  // Auto-slide every 2 seconds
  setInterval(() => {
    moveRight();
  }, 2000);

  // Adjust on window resize
  window.addEventListener('resize', updateSlider);
});

// ==========================
// ✅ COUNTER ANIMATION LOGIC
// ==========================
// Animates numbers counting up to target values
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const speed = 200;

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (count < target) {
          counter.innerText = count + increment;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  const section = document.querySelector(".impact");
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounters();
      observer.disconnect();
    }
  });
  observer.observe(section);
});


// =================================
// ✅ CONTACT FORM SUBMISSION LOGIC
// =================================
// Sends form data to Node.js backend using Fetch API
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page reload

    const name = form.querySelector("input[name='name']").value.trim();
    const email = form.querySelector("input[name='email']").value.trim();
    const message = form.querySelector("textarea[name='message']").value.trim();

    // Basic validation
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const data = { name, email, message };

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert("Your message has been sent successfully!");
        form.reset();
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  });
});
