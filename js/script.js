/* ============================================
   PAC Solution Inc. - Safe GitHub JS
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

  // Sticky navbar
  const nav = document.querySelector(".nav");

  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    });
  }

  // Mobile menu
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // Active nav link
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  // Counter animation
  const counters = document.querySelectorAll("[data-count]");

  counters.forEach(counter => {

    const target = parseInt(counter.getAttribute("data-count"));

    let count = 0;

    const updateCounter = () => {

      const increment = target / 100;

      if (count < target) {

        count += increment;

        counter.innerText = Math.floor(count);

        requestAnimationFrame(updateCounter);

      } else {

        counter.innerText = target;
      }
    };

    updateCounter();
  });

  // Back to top button
  const topBtn = document.querySelector(".top-fab");

  if (topBtn) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 300) {
        topBtn.classList.add("show");
      } else {
        topBtn.classList.remove("show");
      }
    });

    topBtn.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // FAQ
  document.querySelectorAll(".faq-item").forEach(item => {

    const question = item.querySelector(".faq-q");

    if (question) {

      question.addEventListener("click", () => {
        item.classList.toggle("open");
      });
    }
  });

  // Contact form
  const form = document.getElementById("contact-form");

  if (form) {

    form.addEventListener("submit", (e) => {

      e.preventDefault();

      const msg = document.getElementById("form-msg");

      if (msg) {

        msg.innerText =
          "Thank you! Your enquiry has been submitted.";
      }

      form.reset();
    });
  }

  /* ============================================
   PRODUCT FILTER + SEARCH
   ============================================ */

const grid = document.getElementById("product-grid");

if (grid) {

    const cards = document.querySelectorAll(".product-card");

    const chips = document.querySelectorAll(".chip");

    const search = document.getElementById("product-search");

    let activeFilter = "all";

    function filterProducts() {

        const searchText = search.value.toLowerCase();

        cards.forEach(card => {

            const category =
                card.getAttribute("data-cat");

            const text =
                card.innerText.toLowerCase();

            const matchesFilter =
                activeFilter === "all" ||
                category === activeFilter;

            const matchesSearch =
                text.includes(searchText);

            if (matchesFilter && matchesSearch) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");
            }
        });
    }

    chips.forEach(chip => {

        chip.addEventListener("click", () => {

            chips.forEach(c =>
                c.classList.remove("active")
            );

            chip.classList.add("active");

            activeFilter =
                chip.getAttribute("data-filter");

            filterProducts();
        });
    });

    if (search) {

        search.addEventListener(
            "input",
            filterProducts
        );
    }
}
