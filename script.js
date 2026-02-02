const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const siteHeader = document.querySelector(".site-header");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

let lastScrollY = window.scrollY;
let scrollTimeout = null;

const showHeader = () => {
  if (siteHeader) siteHeader.classList.remove("hidden");
};

const hideHeader = () => {
  if (siteHeader) siteHeader.classList.add("hidden");
};

const handleHeaderVisibility = () => {
  const currentScrollY = window.scrollY;
  const delta = currentScrollY - lastScrollY;

  if (currentScrollY <= 8) {
    showHeader();
  } else if (delta > 0) {
    hideHeader();
  } else if (delta < 0) {
    showHeader();
  }

  lastScrollY = currentScrollY;
};

window.addEventListener(
  "scroll",
  () => {
    handleHeaderVisibility();
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(showHeader, 140);
  },
  { passive: true }
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
