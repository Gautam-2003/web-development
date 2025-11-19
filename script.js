

gsap.registerPlugin(ScrollTrigger);


// Card Flip on Scroll


const heroCard = document.getElementById('hero-card');
const wrap = document.getElementById('hero-cardWrap');

// Flip animation
gsap.to(heroCard, {
    rotationY: 0,
    x:750,
    rotate:11,
    ease: "none",
    scrollTrigger: {
      trigger: ".main",
      start: "top 50%",
      end: "bottom top",
      scrub: true,
    }
  });

  // 180 → 360 (Page2 → Page3)
  gsap.to(heroCard, {
    rotationY: 500,
    x:550,
    ease: "none",
    scrollTrigger: {
      trigger: ".main",
      start: "top top",
      end: "bottom top",
      scrub: true,
    }
  });





// Service Cards Accordion


const cards = document.querySelectorAll(".service-card");

cards.forEach(card => {
    const header = card.querySelector(".card-sec-1");
    const content = card.querySelector(".card-sec-2");
    const icon = card.querySelector(".card-sec-1 i");

    // Set initial state
    gsap.set(content, { height: 0, opacity: 0, display: "none" });

    header.addEventListener("click", () => {

        const isOpen = content.classList.contains("open");


        cards.forEach(otherCard => {
            if (otherCard !== card) {
                const otherContent = otherCard.querySelector(".card-sec-2");
                const otherIcon = otherCard.querySelector(".card-sec-1 i");

                if (otherContent.classList.contains("open")) {
                    gsap.to(otherContent, {
                        height: 0,
                        opacity: 0,
                        display: "none",
                        duration: 0.35,
                        ease: "power2.inOut"
                    });

                    gsap.to(otherIcon, { rotate: 180, duration: 0.3 });
                    otherContent.classList.remove("open");
                }
            }
        });

        // 🔽 TOGGLE CURRENT CARD
        if (isOpen) {
            // Close it
            gsap.to(content, {
                height: 0,
                opacity: 0,
                display: "none",
                duration: 0.35,
                ease: "power2.inOut"
            });

            gsap.to(icon, { rotate: 180, duration: 0.3 });
            content.classList.remove("open");

        } else {
            // Open it
            gsap.set(content, { display: "block" });

            gsap.to(content, {
                height: "auto",
                opacity: 1,
                duration: 0.45,
                ease: "power2.out"
            });

            gsap.to(icon, { rotate: 0, duration: 0.3 });
            content.classList.add("open");
        }
    });
});



// Preview image on hover



cards.forEach(card => {
    const img = card.querySelector(".preview-img");

    // When hover IN
    card.addEventListener("mouseenter", () => {
        img.classList.add("visible");
    });

    // When moving inside the card
    card.addEventListener("mousemove", (e) => {
        img.style.left = e.clientX + 20 + "px";   // 20px offset
        img.style.top = e.clientY - 50 + "px";
    });

    // When hover OUT
    card.addEventListener("mouseleave", () => {
        img.classList.remove("visible");
    });
});


// About Page Animation counting

let count1 = document.getElementById("counting-num-1");
let count2 = document.getElementById("counting-num-2");
let count3 = document.getElementById("counting-num-3");


let started = false; // prevents running twice

function startCounting(id, target, speed) {
    let element = document.getElementById(id);
    let value = 0;

    let interval = setInterval(() => {
        value++;
        element.innerText = value;

        if (value === target) {
            clearInterval(interval);
        }
    }, speed);
}

window.addEventListener("scroll", () => {
    const counter = document.getElementById("counter");
    let position = counter.getBoundingClientRect().top;

    if (position < window.innerHeight && !started) {
        started = true;

        startCounting("counting-num-1", 12, 50);
        startCounting("counting-num-2", 270, 5);
        startCounting("counting-num-3", 50, 20);
    }
});


// Question Cards

const questionCards = document.querySelectorAll(".question-card");

questionCards.forEach(card => {
    const header = card.querySelector(".card-sec-1");
    const content = card.querySelector(".card-sec-2");
    const icon = card.querySelector(".card-sec-1 i");

    // Initial closed state
    gsap.set(content, { height: 0, opacity: 0, display: "none" });

    header.addEventListener("click", () => {

        const isOpen = content.classList.contains("open");

        // Close all other cards
        questionCards.forEach(otherCard => {
            if (otherCard !== card) {
                const otherContent = otherCard.querySelector(".card-sec-2");
                const otherIcon = otherCard.querySelector(".card-sec-1 i");

                if (otherContent.classList.contains("open")) {
                    gsap.to(otherContent, {
                        height: 0,
                        opacity: 0,
                        display: "none",
                        duration: 0.35,
                        ease: "power2.inOut"
                    });

                    gsap.to(otherIcon, { rotate: 180, duration: 0.3 });

                    otherContent.classList.remove("open");
                }
            }
        });

        // Toggle clicked card
        if (isOpen) {
            // Close
            gsap.to(content, {
                height: 0,
                opacity: 0,
                display: "none",
                duration: 0.35,
                ease: "power2.inOut"
            });

            gsap.to(icon, { rotate: 180, duration: 0.3 });
            content.classList.remove("open");
        } else {
            // Open
            gsap.set(content, { display: "block" });

            gsap.to(content, {
                height: "auto",
                opacity: 1,
                duration: 0.45,
                ease: "power2.out"
            });

            gsap.to(icon, { rotate: 0, duration: 0.3 });

            content.classList.add("open");
        }
    });
});




//  Projects Container

let projectCard1 = document.getElementById("p1");
let projectCard2 = document.getElementById("p2");
let projectCard3 = document.getElementById("p3");
let projectCard4 = document.getElementById("p4");
let projectCard5 = document.getElementById("p5");

gsap.fromTo(
  [projectCard1, projectCard3, projectCard5],   
  { x: "-300px" },
  { 
    x: "300px",
    scrollTrigger: {
      trigger: ".projects-container", 
      start: "top 80%",
      end: "bottom+=100% top",
      scrub: true
    }
  }
);

gsap.fromTo(
  [projectCard2, projectCard4],
  { x: "300px" },
  { 
    x: "-300px",
    scrollTrigger: {
      trigger: ".projects-container",
      start: "top 80%",
      end: "bottom+=100% top",
      scrub: true
    }
  }
);
