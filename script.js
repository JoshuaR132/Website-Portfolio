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

const navbar = document.querySelector(".navbar");
const navList = navbar.querySelector("ul");

const menuBtn = document.createElement("button");
menuBtn.classList.add("menu-btn");
menuBtn.innerHTML = "☰";
navbar.insertBefore(menuBtn, navList);

menuBtn.addEventListener("click", () => {
  navList.classList.toggle("active");
});

navList.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navList.classList.remove("active");
  });
});

const themeToggle = document.createElement("button");
themeToggle.classList.add("theme-toggle");
themeToggle.textContent = "🌙";
navbar.appendChild(themeToggle);

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

function handleResize() {
  if (window.innerWidth > 768) {
    menuBtn.style.display = "none";
    navList.classList.remove("active");
  } else {
    menuBtn.style.display = "block";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.project-image img');

  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  document.body.appendChild(lightbox);

  images.forEach(img => {
    img.addEventListener('click', e => {
      e.stopPropagation();
      lightbox.classList.add('active');

      const fullImg = document.createElement('img');
      fullImg.src = img.src;  
      fullImg.alt = img.alt || "Project Screenshot";
      fullImg.className = "lightbox-image";

      while (lightbox.firstChild) lightbox.removeChild(lightbox.firstChild);
      lightbox.appendChild(fullImg);
    });
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
    }
  });
});


window.addEventListener("resize", handleResize);
handleResize(); 
