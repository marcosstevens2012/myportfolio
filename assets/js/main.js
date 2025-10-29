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
      // Update mobile menu
      const mobileLink = document.querySelector(".nav__menu a[href*=" + sectionId + "]");
      if (mobileLink) mobileLink.classList.add("active-link");

      // Update desktop menu
      const desktopLink = document.querySelector("#nav-menu-desktop a[href*=" + sectionId + "]");
      if (desktopLink) desktopLink.classList.add("active-link");
    } else {
      // Remove from mobile menu
      const mobileLink = document.querySelector(".nav__menu a[href*=" + sectionId + "]");
      if (mobileLink) mobileLink.classList.remove("active-link");

      // Remove from desktop menu
      const desktopLink = document.querySelector("#nav-menu-desktop a[href*=" + sectionId + "]");
      if (desktopLink) desktopLink.classList.remove("active-link");
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

      // Basic validation
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      if (!name || !email || !message) {
        throw new Error("Todos los campos son requeridos");
      }

      // Add Formspree specific fields
      formData.append("_subject", `Nuevo mensaje desde Portfolio - ${name}`);
      formData.append("_template", "table");
      formData.append("_captcha", "false");

      console.log("Form data prepared"); // Debug log

      // Send to Formspree
      const response = await fetch("https://formspree.io/f/xanbodpy", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Response status:", response.status); // Debug log

      if (response.ok) {
        // Show success message
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
      } else {
        const data = await response.json();
        console.error("Formspree error:", data);
        throw new Error(data.error || "Error al enviar el mensaje");
      }
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

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.createElement("div");
cursor.className = "custom-cursor";
document.body.appendChild(cursor);

const cursorFollower = document.createElement("div");
cursorFollower.className = "cursor-follower";
document.body.appendChild(cursorFollower);

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Ambos cursores siguen directamente al mouse sin delay
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";

  cursorFollower.style.left = mouseX + "px";
  cursorFollower.style.top = mouseY + "px";
});

// Add hover effect to interactive elements
const hoverElements = document.querySelectorAll("a, button, .button, .skills__data, .projects__card");
hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

/*=============== MAGNETIC EFFECT ===============*/
const magneticElements = document.querySelectorAll(".button, .home__social-link, .nav__link");

magneticElements.forEach((element) => {
  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "translate(0, 0)";
  });
});

/*=============== 3D TILT EFFECT ===============*/
const tiltElements = document.querySelectorAll(".skills__data, .projects__card");

tiltElements.forEach((element) => {
  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  });
});

/*=============== PARALLAX EFFECT ===============*/
document.addEventListener("mousemove", (e) => {
  const parallaxElements = document.querySelectorAll(".parallax-element");

  parallaxElements.forEach((element) => {
    const speed = element.getAttribute("data-speed") || 0.05;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;

    element.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
});

/*=============== SCROLL PARALLAX ===============*/
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".parallax-element");

  parallaxElements.forEach((element) => {
    const speed = element.getAttribute("data-speed") || 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

/*=============== INTERSECTION OBSERVER FOR ANIMATIONS ===============*/
const sectionObserverOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
}, sectionObserverOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  sectionObserver.observe(section);
});

/*=============== SMOOTH SCROLL WITH EASING ===============*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const offsetTop = target.offsetTop - 70;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

/*=============== PERFORMANCE OPTIMIZATION ===============*/
// Disable cursor effects on mobile
if (window.innerWidth < 768) {
  cursor.style.display = "none";
  cursorFollower.style.display = "none";
}

// Re-check on resize
window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    cursor.style.display = "none";
    cursorFollower.style.display = "none";
  } else {
    cursor.style.display = "block";
    cursorFollower.style.display = "block";
  }
});

/*=============== LOADING ANIMATION ===============*/
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

/*=============== ANIMATED PARTICLES ===============*/
const canvas = document.getElementById("particles-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 80;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 0, 0, ${0.2 * (1 - distance / 150)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // Mouse interaction with particles
  canvas.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    particles.forEach((particle) => {
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        particle.vx -= dx * 0.0001;
        particle.vy -= dy * 0.0001;
      }
    });
  });
}
