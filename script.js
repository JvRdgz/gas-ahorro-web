const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const siteHeader = document.querySelector(".site-header");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleInput = document.querySelector(".theme-toggle-input");
const brandLogo = document.querySelector(".brand img");
const themedShots = document.querySelectorAll("[data-shot-light][data-shot-dark]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
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
  if (siteHeader) {
    siteHeader.classList.toggle("scrolled", currentScrollY > 6);
  }

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

if (!prefersReducedMotion) {
  const policyCards = document.querySelectorAll(".policy-card");
  policyCards.forEach((card, index) => {
    card.classList.add("reveal", index % 2 === 0 ? "reveal-left" : "reveal-right");
    observer.observe(card);
  });

  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card, index) => {
    card.classList.add(index % 2 === 0 ? "reveal-left" : "reveal-right");
    card.style.transitionDelay = `${Math.min(index * 0.06, 0.24)}s`;
  });

  const shots = document.querySelectorAll(".shot");
  shots.forEach((shot, index) => {
    shot.classList.add("reveal-zoom");
    shot.style.transitionDelay = `${Math.min(index * 0.07, 0.28)}s`;
  });
}

const internalSectionLinks = document.querySelectorAll('a[href^="#"]');
internalSectionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetSelector = link.getAttribute("href");
    if (!targetSelector || targetSelector === "#") return;
    const target = document.querySelector(targetSelector);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    if (history.pushState) {
      history.pushState(null, "", targetSelector);
    }
  });
});

const sectionLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"], .footer-right a[href^="#"]'));
const sectionMap = new Map();
sectionLinks.forEach((link) => {
  const id = link.getAttribute("href");
  if (!id || id === "#") return;
  const section = document.querySelector(id);
  if (!section) return;
  if (!sectionMap.has(section)) sectionMap.set(section, []);
  sectionMap.get(section).push(link);
});

if (sectionMap.size) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((link) => link.classList.remove("active"));
        const links = sectionMap.get(entry.target) || [];
        links.forEach((link) => link.classList.add("active"));
      });
    },
    { rootMargin: "-35% 0px -50% 0px", threshold: 0.15 }
  );

  sectionMap.forEach((_, section) => navObserver.observe(section));
}

window.addEventListener("load", () => {
  document.body.classList.add("page-ready");
  handleHeaderVisibility();
});

if (!prefersReducedMotion) {
  const crossPageLinks = document.querySelectorAll('a[href$=".html"], a[href="privacy-policy.html"], a[href="/"], a[href^="/#"]');
  crossPageLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;
    if (link.target === "_blank") return;

    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      document.body.classList.add("page-exit");
      setTimeout(() => {
        window.location.href = href;
      }, 180);
    });
  });
}
