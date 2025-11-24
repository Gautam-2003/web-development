gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, SplitText);

document.addEventListener("DOMContentLoaded", () => {

  // -----------------------------
  // NAV LINK HOVER ANIMATION
  // -----------------------------
  document.querySelectorAll(".nav-link").forEach(link => {
    const split = new SplitText(link, { type: "words" });
    link.addEventListener('mouseover', () => {
      gsap.from(split.words, { y: 100, autoAlpha: 0, duration: 0.5 });
    });
  });

  // -----------------------------
  // ACCORDION FUNCTION (Service & Question Cards)
  // -----------------------------
  function initAccordion(selector) {
    const cards = gsap.utils.toArray(selector);
    cards.forEach(card => {
      const header = card.querySelector(".card-sec-1");
      const content = card.querySelector(".card-sec-2");
      const icon = card.querySelector(".card-sec-1 i");

      gsap.set(content, { height: 0, opacity: 0, display: "none" });

      header.addEventListener("click", () => {
        const isOpen = content.classList.contains("open");

        // Close all other cards
        cards.forEach(otherCard => {
          if (otherCard !== card) {
            const otherContent = otherCard.querySelector(".card-sec-2");
            const otherIcon = otherCard.querySelector(".card-sec-1 i");
            if (otherContent.classList.contains("open")) {
              gsap.to(otherContent, { height: 0, opacity: 0, display: "none", duration: 0.35, ease: "power2.inOut" });
              gsap.to(otherIcon, { rotate: 180, duration: 0.3 });
              otherContent.classList.remove("open");
            }
          }
        });

        // Toggle current card
        if (isOpen) {
          gsap.to(content, { height: 0, opacity: 0, display: "none", duration: 0.35, ease: "power2.inOut" });
          gsap.to(icon, { rotate: 180, duration: 0.3 });
          content.classList.remove("open");
        } else {
          gsap.set(content, { display: "block" });
          gsap.to(content, { height: "auto", opacity: 1, duration: 0.45, ease: "power2.out" });
          gsap.to(icon, { rotate: 0, duration: 0.3 });
          content.classList.add("open");
        }
      });
    });
  }

  initAccordion(".service-card");
  initAccordion(".question-card");

  // -----------------------------
  // ABOUT PAGE COUNTER
  // -----------------------------
  const counters = [
    { id: "counting-num-1", value: 12, duration: 1 },
    { id: "counting-num-2", value: 270, duration: 1.5 },
    { id: "counting-num-3", value: 50, duration: 1 }
  ];

  let counterStarted = false;
  const counterSection = document.getElementById("counter");

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !counterStarted) {
      counterStarted = true;
      counters.forEach(c => {
        gsap.to(`#${c.id}`, {
          innerText: c.value,
          duration: c.duration,
          snap: { innerText: 1 },
          ease: "power1.in"
        });
      });
    }
  }, { threshold: 0.3 });

  observer.observe(counterSection);

  // -----------------------------
  // PROJECTS ANIMATION
  // -----------------------------
  const projectCardsLeft = gsap.utils.toArray(["#p1", "#p3", "#p5"]);
  const projectCardsRight = gsap.utils.toArray(["#p2", "#p4"]);

  function animateProjects(cards, direction = "left") {
    gsap.fromTo(cards,
      { x: direction === "left" ? -300 : 300, opacity: 0 },
      { 
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: { trigger: ".projects-container", start: "top 80%", end: "bottom 20%", scrub: 1 }
      }
    );
  }

  animateProjects(projectCardsLeft, "left");
  animateProjects(projectCardsRight, "right");

  // -----------------------------
  // HERO CARD ANIMATION
  // -----------------------------
  const heroCard = document.querySelector(".hero-card");
  const mobile = window.matchMedia("(max-width: 599px)");
  const tablet = window.matchMedia("(min-width: 600px) and (max-width: 1023px)");
  const pc = window.matchMedia("(min-width: 1024px)");

  function handleHeroCard() {
    gsap.killTweensOf(heroCard); // Clear previous animations

    if (mobile.matches) {
      gsap.to(heroCard, { rotate: 10, duration: 2 });
    } else {
      gsap.to(heroCard, {
        x: "30vw",
        rotate: 5,
        rotateY: 180,
        scale: 0.8,
        duration: 3,
        scrollTrigger: {
          trigger: heroCard,
          scroller: "body",
          start: "top 15%",
          end: "top -175%",
          scrub: true,
          pin: true
        }
      });
    }
  }

  handleHeroCard();
  [mobile, tablet, pc].forEach(bp => bp.addEventListener("change", handleHeroCard));

  // -----------------------------
  // MOBILE NAV TOGGLE
  // -----------------------------
  const toggleBtn = document.getElementById("toggle-btn");
  const mobNavRight = document.querySelector(".mob-nav-right");

  toggleBtn.addEventListener("click", () => {
    mobNavRight.classList.toggle("open");
    toggleBtn.classList.toggle("rotated");
  });

  mobNavRight.querySelectorAll("li a").forEach(link => {
    link.addEventListener("click", () => {
      mobNavRight.classList.remove("open");
      toggleBtn.classList.remove("rotated");
    });
  });

  // -----------------------------
  // CONTACT CARD ROTATION
  // -----------------------------
  const contactCard = document.querySelector(".contact-card-inner");
  gsap.to(contactCard, {
    rotateY: 180,
    duration: 3,
    scrollTrigger: {
      trigger: ".contact-sec-1",
      start: "top 20%",
      end: "bottom bottom",
      scrub: true
    }
  });

  // -----------------------------
  // DARK/LIGHT MODE TOGGLE
  // -----------------------------
  const modeToggle = document.getElementById("modeToggle");
  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    modeToggle.innerHTML = document.body.classList.contains("dark") 
      ? `<i class="fa-solid fa-lightbulb"></i>` 
      : `<i class="fa-regular fa-lightbulb"></i>`;
  });

});
