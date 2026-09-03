document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. MOBILE HAMBURGER MENU
  ========================================================= */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    hamburger.classList.toggle("is-open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Funga menu baada ya kubofya link (kwenye simu)
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      hamburger.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  /* =========================================================
     2. SMOOTH SCROLLING (kwa anchor links zote)
  ========================================================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = document.getElementById("navbar").offsetHeight;
          const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    });
  });

  /* =========================================================
     3. TERMINAL TYPING EFFECT (Hero)
  ========================================================= */
  const typeTarget = document.getElementById("terminalType");
  const linesToType = [
    "Faraja Mbeti — Software Developer",
    "BSc. Information Technology, Year 2",
    "Founder @ NexaFlow Digital Services",
    "Tech Consultant | Mwalimu wa IT"
  ];
  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const currentLine = linesToType[lineIndex];

    if (!deleting) {
      typeTarget.textContent = currentLine.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentLine.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      typeTarget.textContent = currentLine.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % linesToType.length;
      }
    }
    setTimeout(typeLoop, deleting ? 30 : 55);
  }

  if (typeTarget) typeLoop();

  /* =========================================================
     4. PROJECT FILTERS
  ========================================================= */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const show = filter === "all" || card.dataset.cat === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* =========================================================
     5. CONTACT FORM (demo submission handling)
  ========================================================= */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();

    status.textContent = `Asante ${name || "rafiki"}! Ujumbe wako umepokelewa — nitawasiliana nawe hivi karibuni.`;
    form.reset();

    setTimeout(() => { status.textContent = ""; }, 6000);
  });

  /* =========================================================
     6. BACK TO TOP BUTTON + NAVBAR SHADOW ON SCROLL
  ========================================================= */
  const backToTop = document.getElementById("backToTop");
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY > 400;
    backToTop.classList.toggle("is-visible", scrolled);
    navbar.style.borderBottomColor = window.scrollY > 10 ? "var(--border)" : "var(--border-soft)";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* =========================================================
     7. FOOTER YEAR
  ========================================================= */
  document.getElementById("year").textContent = new Date().getFullYear();

});
