const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const siteHeader = document.querySelector(".site-header");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleInput = document.querySelector(".theme-toggle-input");
const brandLogo = document.querySelector(".brand img");
const themedShots = document.querySelectorAll("[data-shot-light][data-shot-dark]");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

if (menuToggle && navLinks) {
  document.addEventListener("click", (event) => {
    if (!navLinks.classList.contains("open")) return;
    const target = event.target;
    if (navLinks.contains(target) || menuToggle.contains(target)) return;
    navLinks.classList.remove("open");
  });
}

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const updateShotImages = (theme) => {
  themedShots.forEach((shot) => {
    const target =
      theme === "dark" ? shot.dataset.shotDark : shot.dataset.shotLight;
    if (target) shot.src = target;
  });
};

const setTheme = (theme) => {
  if (theme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    if (themeToggle) themeToggle.setAttribute("aria-label", "Cambiar a modo claro");
    if (themeToggleInput) themeToggleInput.checked = true;
    if (brandLogo && brandLogo.dataset.logoDark) {
      brandLogo.src = brandLogo.dataset.logoDark;
    }
    const label = document.querySelector(".theme-toggle-label");
    if (label) label.textContent = "Modo claro";
  } else {
    document.body.removeAttribute("data-theme");
    if (themeToggle) themeToggle.setAttribute("aria-label", "Cambiar a modo oscuro");
    if (themeToggleInput) themeToggleInput.checked = false;
    if (brandLogo && brandLogo.dataset.logoLight) {
      brandLogo.src = brandLogo.dataset.logoLight;
    }
    const label = document.querySelector(".theme-toggle-label");
    if (label) label.textContent = "Modo oscuro";
  }
  updateShotImages(theme);
  localStorage.setItem("theme", theme);
};

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else if (prefersDarkScheme.matches) {
  setTheme("dark");
}

if (themeToggleInput) {
  themeToggleInput.addEventListener("change", () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    setTheme(isDark ? "light" : "dark");
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
