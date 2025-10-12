document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

const hours = new Date().getHours();
let greeting;

if (hours < 12) greeting = "Good morning!";
else if (hours < 18) greeting = "Good afternoon!";
else greeting = "Good evening!";

const aboutSection = document.getElementById("about");
const greetEl = document.createElement("p");
greetEl.textContent = greeting;
aboutSection.insertBefore(greetEl, aboutSection.children[1]);
