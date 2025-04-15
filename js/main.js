/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// Abrir Menu
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
    document.body.style.overflow = "hidden";
  });
}

// Fechar Menu
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
    document.body.style.overflow = "auto";
  });
}

// Fechar ao clicar em links
const navLinks = document.querySelectorAll(".nav__link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
    document.body.style.overflow = "auto";
  });
});

// Fechar ao clicar fora
document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 768 &&
    navMenu.classList.contains("show-menu") &&
    !navMenu.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    navMenu.classList.remove("show-menu");
    document.body.style.overflow = "auto";
  }
});
/*=============== SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  window.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (sectionsClass) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        sectionsClass.classList.add("active-link");
      } else {
        sectionsClass.classList.remove("active-link");
      }
    } else {
      console.warn(
        `Link de navegação não encontrado para a seção: ${sectionId}`
      );
    }
  });
};

window.addEventListener("scroll", scrollActive);

/*=============== BLUR HEADER ===============*/
const blurHeader = () => {
  const header = document.getElementById("header");
  window.scrollY >= 50
    ? header.classList.add("blur-header")
    : header.classList.remove("blur-header");
};
window.addEventListener("scroll", blurHeader);

/*=============== SWIPER TESTIMONIAL ===============*/
var swiper = new Swiper(".testimonial-swiper", {
  loop: true,
  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  reset: false,
});

sr.reveal(
  `.home__title, .home__description, .home__trust, .home__cta, .home__img, 
   .video-section video, .card, .card-content, .card__cta, .testimonial-section, 
   .subscription-card, .section__title`,
  {
    interval: 150,
  }
);

/*=============== FAQ ===============*/

document.addEventListener("DOMContentLoaded", function () {
  const faqToggle = document.getElementById("faqToggle");
  const faqContent = document.getElementById("faqContent");

  // Expande/Recolhe ao clicar no cabeçalho
  faqToggle.addEventListener("click", () => {
    faqContent.classList.toggle("show");
    faqToggle.classList.toggle("active");
  });

  // Fecha ao clicar fora do FAQ
  document.addEventListener("click", (e) => {
    const isClickInsideFAQ = faqToggle.contains(e.target) || faqContent.contains(e.target);
    if (!isClickInsideFAQ && faqContent.classList.contains("show")) {
      faqContent.classList.remove("show");
      faqToggle.classList.remove("active");
    }
  });

  // Acordeão interno (abre/fecha perguntas individualmente)
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      } else {
        faqItems.forEach((el) => el.classList.remove("active"));
        item.classList.add("active");
      }
    });
  });
  
});
