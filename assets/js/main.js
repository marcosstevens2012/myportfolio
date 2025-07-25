/*======/*=============== MIXITUP FILTER REMOVED ===============*/
/* Portfolio section removed */

/*=============== SWIPER TESTIMONIAL ===============*/
let swiper = new Swiper(".testimonial__container", {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 48,
    },
  },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link");
    } else {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  // Only proceed if header exists
  if (header) {
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 50) header.classList.add("scroll-header");
    else header.classList.remove("scroll-header");
  }
}
window.addEventListener("scroll", scrollHeader);

/*=============== ANIMATED COUNTER ===============*/
function animateCounter() {
  const counters = document.querySelectorAll(".counter");
  const speed = 200;

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const increment = target / speed;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.innerText = Math.ceil(current);
        setTimeout(updateCounter, 1);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

// Intersection Observer for counter animation
const observerOptions = {
  threshold: 0.7,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const aboutSection = document.querySelector("#about");
if (aboutSection) {
  observer.observe(aboutSection);
}

/*=============== TYPING EFFECT ===============*/
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";
  element.style.borderRight = "2px solid var(--first-color)";

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else {
      // Keep cursor blinking after typing is complete
      element.style.animation = "blink-caret 0.75s step-end infinite";
    }
  }
  typing();
}

/*=============== THEME TOGGLE ===============*/
const themeButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const body = document.body;

// Only proceed if theme elements exist
if (themeButton && themeIcon) {
  // Get theme from localStorage
  const getCurrentTheme = () => (body.classList.contains("dark-theme") ? "dark" : "light");
  const getCurrentIcon = () => (themeIcon.classList.contains("bx-sun") ? "bx-moon" : "bx-sun");

  // Load theme from localStorage
  const selectedTheme = localStorage.getItem("selected-theme");
  const selectedIcon = localStorage.getItem("selected-icon");

  if (selectedTheme) {
    body.classList[selectedTheme === "dark" ? "add" : "remove"]("dark-theme");
    themeIcon.classList[selectedIcon === "bx-moon" ? "add" : "remove"]("bx-moon");
    themeIcon.classList[selectedIcon === "bx-sun" ? "add" : "remove"]("bx-sun");
  }

  // Theme toggle functionality
  themeButton.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    themeIcon.classList.toggle("bx-moon");
    themeIcon.classList.toggle("bx-sun");

    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  });
}

/*=============== PARALLAX EFFECT ===============*/
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".parallax-element");

  parallaxElements.forEach((element) => {
    const speed = element.dataset.speed || 0.5;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

/*=============== CUSTOM CURSOR ===============*/
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // Add hover effect for interactive elements
  const interactiveElements = document.querySelectorAll("a, button, .skills__data, .about__box");

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
// Only initialize mixitup if the container exists
const workContainer = document.querySelector(".work__container");
if (workContainer) {
  let mixerPortfolio = mixitup(".work__container", {
    selectors: {
      target: ".work__card",
    },
    animation: {
      duration: 300,
    },
  });
}

/* Link active work */
const linkWork = document.querySelectorAll(".work__item");

function activeWork() {
  linkWork.forEach((l) => l.classList.remove("active-work"));
  this.classList.add("active-work");
}

if (linkWork.length > 0) {
  linkWork.forEach((l) => l.addEventListener("click", activeWork));
}

/*=============== SMOOTH SCROLLING ===============*/
const navLinks = document.querySelectorAll(".nav__link");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
// Only initialize ScrollReveal if it exists
if (typeof ScrollReveal !== "undefined") {
  const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2000,
    delay: 200,
    reset: false,
  });

  // Home animations
  sr.reveal(".home__data", { delay: 400 });
  sr.reveal(".home__handle", { delay: 600 });
  sr.reveal(".home__social", { delay: 800, origin: "left" });
  sr.reveal(".home__scroll", { delay: 800, origin: "right" });

  // About animations

  sr.reveal(".about__data", { origin: "right" });

  // Work animations
  sr.reveal(".work__filters", { delay: 200 });
  sr.reveal(".work__card", { interval: 100 });

  // Contact animations
  sr.reveal(".contact__content", { interval: 200 });

  // Footer animation
  sr.reveal(".footer__container", { origin: "bottom" });
}

/*=============== TYPING ANIMATION ===============*/
const titles = ["Desarrollador de Software", "Co-founder @ RHINO", "Full Stack Developer"];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const titleElement = document.querySelector(".home__title");

function typeTitle() {
  if (!titleElement) return; // Exit if element doesn't exist

  const currentTitle = titles[titleIndex];

  if (isDeleting) {
    titleElement.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
  } else {
    titleElement.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentTitle.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
  }

  setTimeout(typeTitle, typeSpeed);
}

// Start typing animation when page loads
window.addEventListener("load", () => {
  if (titleElement) {
    setTimeout(typeTitle, 1000);
  }
});

/*=============== FORM SUBMISSION ===============*/
const contactForm = document.querySelector("#contact-form");
const submitBtn = document.querySelector("#submit-btn");
const formMessage = document.querySelector("#form-message");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("Form submitted"); // Debug log

    // Show loading state
    if (submitBtn) {
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;
    }

    try {
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      // Basic validation
      if (!name || !email || !message) {
        throw new Error("Todos los campos son requeridos");
      }

      console.log("Form data prepared:", { name, email, message }); // Debug log

      // Try with Web3Forms (alternative service)
      const web3FormsData = new FormData();
      web3FormsData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // Necesitarás obtener una clave
      web3FormsData.append("name", name);
      web3FormsData.append("email", email);
      web3FormsData.append("message", message);
      web3FormsData.append("subject", `Nuevo mensaje desde Portfolio - ${name}`);

      // For now, we'll simulate success since we need to configure the service first
      console.log("Simulating form submission success"); // Debug log

      // Show success message (simulated)
      if (formMessage) {
        formMessage.style.display = "block";
        formMessage.className = "form-message success";
        formMessage.textContent = `¡Gracias por tu mensaje, ${name}! Te responderé pronto.`;
      }
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        if (formMessage) {
          formMessage.style.display = "none";
        }
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      if (formMessage) {
        formMessage.style.display = "block";
        formMessage.className = "form-message error";
        formMessage.textContent = error.message || "Error al enviar el mensaje. Por favor, intenta nuevamente.";
      }
    } finally {
      // Remove loading state
      if (submitBtn) {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
      }
    }
  });
}
