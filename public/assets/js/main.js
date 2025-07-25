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
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}CKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/* Link active work */ 
const linkWork = document.querySelectorAll('.work__item')

function activeWork(){
    linkWork.forEach(l => l.classList.remove('active-work'))
    this.classList.add('active-work')
}

linkWork.forEach(l=> l.addEventListener('click', activeWork))

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== LIGHT DARK THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'light' : 'dark'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-sun' : 'bx bx-moon'

// We validate if the user previously chose a topic
if (selectedTheme) {
  document.body.classList[selectedTheme === 'light' ? 'add' : 'remove'](lightTheme)
  themeButton.classList[selectedIcon === 'bx bx-sun' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SMOOTH SCROLLING ===============*/
const navLinks = document.querySelectorAll('.nav__link')

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault()
        const targetId = link.getAttribute('href')
        const targetSection = document.querySelector(targetId)
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    })
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: false
})

// Home animations
sr.reveal('.home__data', {delay: 400})
sr.reveal('.home__handle', {delay: 600})
sr.reveal('.home__social', {delay: 800, origin: 'left'})
sr.reveal('.home__scroll', {delay: 800, origin: 'right'})

// About animations
sr.reveal('.about__img', {origin: 'left'})
sr.reveal('.about__data', {origin: 'right'})

// Skills animations
sr.reveal('.skills__content', {interval: 200})

// Work animations
sr.reveal('.work__filters', {delay: 200})
sr.reveal('.work__card', {interval: 100})

// Contact animations
sr.reveal('.contact__content', {interval: 200})

// Footer animation
sr.reveal('.footer__container', {origin: 'bottom'})

/*=============== TYPING ANIMATION ===============*/
const titles = ['Desarrollador de Software', 'Co-founder @ RHINO', 'Full Stack Developer']
let titleIndex = 0
let charIndex = 0
let isDeleting = false
const titleElement = document.querySelector('.home__title')

function typeTitle() {
    const currentTitle = titles[titleIndex]
    
    if (isDeleting) {
        titleElement.textContent = currentTitle.substring(0, charIndex - 1)
        charIndex--
    } else {
        titleElement.textContent = currentTitle.substring(0, charIndex + 1)
        charIndex++
    }
    
    let typeSpeed = isDeleting ? 50 : 100
    
    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000
        isDeleting = true
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        titleIndex = (titleIndex + 1) % titles.length
    }
    
    setTimeout(typeTitle, typeSpeed)
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeTitle, 1000)
})

/*=============== FORM SUBMISSION ===============*/
const contactForm = document.querySelector('.contact__form')

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault()
        
        // Get form data
        const formData = new FormData(contactForm)
        const name = formData.get('name')
        const email = formData.get('email')
        const message = formData.get('message')
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Por favor, completa todos los campos')
            return
        }
        
        // You can implement actual form submission here
        alert('¡Mensaje enviado correctamente! Te contactaré pronto.')
        contactForm.reset()
    })
}