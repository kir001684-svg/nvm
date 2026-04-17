// navbar menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("open");

  // 🆕 Add this line to shift content down
  document.body.classList.toggle("menu-open");
});

/* Popup overlay */
 const cards = document.querySelectorAll('.card');
  const popups = document.querySelectorAll('.popup-overlay');
  const closeButtons = document.querySelectorAll('.popup .close');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const popup = document.getElementById('popup-' + id);
      if (popup) popup.classList.add('active');
    });
  });

  // card detail info
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.popup-overlay').classList.remove('active');
    });
  });

  popups.forEach(popup => {
    popup.addEventListener('click', e => {
      if (e.target === popup) {
        popup.classList.remove('active');
      }
    });
  });

  // form reply
  document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  alert("Thank you! Your message has been submitted.");

  // Optionally reset the form
  this.reset();
});

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById('slider');
  let slides = document.querySelectorAll('.slide');
  let currentIndex = 0;

  // Add transition
  slider.style.transition = 'transform 0.5s ease-in-out';

  // Clone the first slide and append
  const firstClone = slides[0].cloneNode(true);
  slider.appendChild(firstClone);

  // Re-select slides after clone
  slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  function updateSlider() {
    const offset = slides[0].offsetWidth + 30; // width + margin
    slider.style.transform = `translateX(-${currentIndex * offset}px)`;
  }

  function moveRight() {
    currentIndex++;
    updateSlider();

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

  // Expose functions globally so HTML buttons can use them
  window.moveRight = moveRight;
  window.moveLeft = moveLeft;

  // Auto slide every 2 seconds
  setInterval(() => {
    moveRight();
  }, 2000);

  // Recalculate offset on resize
  window.addEventListener('resize', updateSlider);
});



function animateCountUp(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // approx 60fps
    function updateCount() {
      start += increment;
      if (start < target) {
        element.innerText = Math.floor(start);
        requestAnimationFrame(updateCount);
      } else {
        element.innerText = target;
      }
    }
    updateCount();
  }

  document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".count");
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      animateCountUp(counter, target);
    });
  });



     const form = document.getElementById("contactForm");

//   form.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const name = form.querySelector("input[name='name']").value.trim();
//     const email = form.querySelector("input[name='email']").value.trim();
//     const message = form.querySelector("textarea[name='message']").value.trim();

//     if (!name || !email || !message) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, message })
//       });

//       if (response.ok) {
//         alert("Your message has been sent successfully!");
//         form.reset();
//       } else {
//         alert("Failed to send message. Please try again later.");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Something went wrong. Please try again.");
//     }
//   });



//   document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("contactForm");

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault(); // prevent page reload

//     const formData = new FormData(form);
//     const data = {
//       name: formData.get("name"),
//       email: formData.get("email"),
//       message: formData.get("message")
//     };

//     try {
//       const response = await fetch("http://localhost:5000/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//       });

//       if (response.ok) {
//         alert("Message sent successfully!");
//         form.reset();
//       } else {
//         alert("Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       alert("Error sending message. Server might be down.");
//       console.error(error);
//     }
//   });
// });


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent page reload

    const name = form.querySelector("input[name='name']").value.trim();
    const email = form.querySelector("input[name='email']").value.trim();
    const message = form.querySelector("textarea[name='message']").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const data = { name, email, message };

    try {
      const response = await fetch("http://localhost:5000/send", {
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

