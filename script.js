// ===============================
// SMOOTH SCROLLING FOR NAV LINKS
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===============================
// DYNAMIC GREETING IN ABOUT SECTION
// ===============================
const hours = new Date().getHours();
let greeting;

if (hours < 12) greeting = "☀️ Good morning!";
else if (hours < 18) greeting = "🌤️ Good afternoon!";
else greeting = "🌙 Good evening!";

const aboutSection = document.getElementById("about");
if (aboutSection) {
  const greetEl = document.createElement("p");
  greetEl.textContent = greeting;
  greetEl.style.fontWeight = "500";
  greetEl.style.color = "#0a74da";
  greetEl.style.textAlign = "center";
  greetEl.style.marginBottom = "1rem";
  aboutSection.insertBefore(greetEl, aboutSection.children[1]);
}

// ===============================
// FADE-IN ON SCROLL (Intersection Observer)
// ===============================
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach(section => {
  section.classList.add("hidden");
  observer.observe(section);
});

// ===============================
// MOBILE NAVBAR TOGGLE
// ===============================
const navbar = document.querySelector(".navbar");
const navList = navbar.querySelector("ul");

const menuBtn = document.createElement("button");
menuBtn.classList.add("menu-btn");
menuBtn.innerHTML = "☰";
navbar.insertBefore(menuBtn, navList);

menuBtn.addEventListener("click", () => {
  navList.classList.toggle("active");
});

// Hide menu when a link is clicked (for better UX)
navList.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navList.classList.remove("active");
  });
});

// ===============================
// DARK MODE TOGGLE (with memory)
// ===============================
const themeToggle = document.createElement("button");
themeToggle.classList.add("theme-toggle");
themeToggle.textContent = "🌙";
navbar.appendChild(themeToggle);

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ===============================
// RESPONSIVE BUTTON VISIBILITY
// ===============================
function handleResize() {
  if (window.innerWidth > 768) {
    menuBtn.style.display = "none";
    navList.classList.remove("active");
  } else {
    menuBtn.style.display = "block";
  }
}

window.addEventListener("resize", handleResize);
handleResize(); // Run on page load
