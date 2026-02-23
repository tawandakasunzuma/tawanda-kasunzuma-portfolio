import { techStack } from "./tech-stack.js";

/* ====================
   TYPEWRITER EFFECT
==================== */

const text = `I'm a passionate developer who loves building clean, reliable, and user-focused applications. I started with JavaScript and have grown into both front-end and back-end development, including working with databases. I'm currently expanding my skills through an internship, always learning, solving problems, and bringing creative ideas to life.`;
const target = document.getElementById("typewriter");
let index = 0;
function typeWriter() {
  if (index < text.length) {
    target.textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, 30);
  }
}
typeWriter();

/* ====================
   REVEAL ELEMENTS ON SCROLL
==================== */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
      }
    });
  },
  { threshold: 0.2 },
);
document.querySelectorAll(".icon-wrap").forEach((el) => observer.observe(el));

const projectCards = document.querySelectorAll(".reveal-on-scroll");

const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        projectObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 },
);

projectCards.forEach((card) => projectObserver.observe(card));

/* ====================
   SHOW TECH NAME ON HOVER
==================== */

const allWraps = document.querySelectorAll(".icon-wrap");
const techNameDisplay = document.querySelector(".tech-name-display");
allWraps.forEach((wrap) => {
  wrap.addEventListener("mouseover", () => {
    const icon = wrap.querySelector(".icon");
    techNameDisplay.style.color = "rgba(16, 0, 16, 0.75)";
    techNameDisplay.style.backgroundColor = "rgba(16, 0, 16, 0.05)";
    techNameDisplay.style.opacity = "1";
    techNameDisplay.textContent = icon.alt;
  });
  wrap.addEventListener("mouseout", () => {
    techNameDisplay.style.color = "rgba(16, 0, 16, 0.75)";
    techNameDisplay.style.opacity = "0.75";
  });
});

/* ====================
   ABOUT SECTION SLIDE-IN
==================== */

const aboutCards = document.querySelectorAll(
  ".personal-info-container, .fun-facts-container, .tech-journey-container",
);

const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("slide-in");
          }, index * 600);
        });
        aboutObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 },
);

aboutObserver.observe(document.querySelector(".about-container"));

/* ====================
   TECH STACK HOVER INFO
==================== */

const icons = document.querySelectorAll(".icon");
const techDescription = document.getElementById("tech-description");
const techPercentage = document.querySelector(".tech-percentage");

icons.forEach((icon) => {
  icon.addEventListener("mouseover", () => {
    for (let i = 0; i < techStack.length; i++) {
      // Update description
      if (techStack[i].name === icon.alt) {
        techDescription.textContent = techStack[i].description;
        document.querySelector(".tech-percentage-description").style.opacity =
          "1";

        // Update percentage
        techPercentage.textContent = `${techStack[i].level}%`;

        // Update color of percentage
        if (techStack[i].level === 25) {
          techPercentage.style.backgroundColor = "rgb(252, 165, 165)";
        } else if (techStack[i].level === 50) {
          techPercentage.style.backgroundColor = "rgb(252, 211, 77)";
        } else if (techStack[i].level === 75) {
          techPercentage.style.backgroundColor = "rgb(110, 231, 183)";
        } else {
          techPercentage.style.backgroundColor = "rgb(74, 222, 128)";
        }

        break;
      }
    }
  });
  icon.addEventListener("mouseout", () => {
    document.querySelector(".tech-percentage-description").style.opacity =
      "0.75";
  });
});

/* ====================
   CONTACT FORM SUBMISSION
==================== */

const form = document.querySelector(".form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const res = await fetch(form.action, {
    method: "POST",
    body: data,
    headers: { Accept: "application/json" },
  });
  if (res.ok) {
    form.innerHTML = "<p>Thanks! Your message has been sent.</p>";
  } else {
    form.insertAdjacentHTML("beforeend", "<p>Oops! There was an error.</p>");
  }
});

/* ====================
   OPEN / CLOSE MENU (FULLSCREEN)
==================== */

const hamburgerContainer = document.querySelector(".hamburger-container");
const overlayCloseBtn = document.querySelector(".hamburger-menu-close");
const menu = document.querySelector(".hamburger-menu");
const overlayLinks = document.querySelectorAll(".nav-item-container-menu a");

let scrollY = 0;

function lockScroll_iOSSafe() {
  scrollY = window.scrollY || document.documentElement.scrollTop;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.documentElement.style.overflow = "hidden";
}

function unlockScroll_iOSSafe() {
  document.body.style.position = "";
  document.body.style.top = "";
  document.documentElement.style.overflow = "";
  window.scrollTo(0, scrollY || 0);
}

function openMenu() {
  // ensure overlay is full-screen
  menu.style.top = "0";
  menu.style.height = "100vh";

  menu.classList.add("open");
  menu.setAttribute("aria-hidden", "false");

  if (hamburgerContainer) hamburgerContainer.classList.add("open");
  hamburgerContainer?.setAttribute("aria-expanded", "true");

  lockScroll_iOSSafe();

  const firstLink = menu.querySelector("a");
  if (firstLink) firstLink.focus();
}

function closeMenu() {
  menu.classList.remove("open");
  menu.setAttribute("aria-hidden", "true");

  if (hamburgerContainer) hamburgerContainer.classList.remove("open");
  hamburgerContainer?.setAttribute("aria-expanded", "false");

  // clear inline positioning (optional)
  menu.style.top = "";
  menu.style.height = "";

  unlockScroll_iOSSafe();

  hamburgerContainer?.focus();
}

if (hamburgerContainer) {
  hamburgerContainer.addEventListener("click", () => {
    if (menu.classList.contains("open")) closeMenu();
    else openMenu();
  });

  // keyboard activate
  hamburgerContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (menu.classList.contains("open")) closeMenu();
      else openMenu();
    }
  });
}

if (overlayCloseBtn) overlayCloseBtn.addEventListener("click", closeMenu);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.classList.contains("open")) closeMenu();
});

overlayLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");
    closeMenu();
    const delay = 60;
    setTimeout(() => {
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", href);
      } else {
        window.location.href = href;
      }
    }, delay);
  });
});
