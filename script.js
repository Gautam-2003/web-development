gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin,SplitText);




    // Simple hover animation per link

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener('mouseover', () => {
    // Create SplitText instance for this link only
    let split = new SplitText(link, { type: "words" });

    // Animate the words
    gsap.from(split.words, {
      y: 100,
      autoAlpha: 0,
      duration: 0.5,
    //   stagger: 0.05,
    });
  });
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






// About Page Animation Counting

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

let started = false;

// Observe the counter section
const counterSection = document.getElementById("counter");

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
        started = true;

        // Start counters
        startCounting("counting-num-1", 12, 50);
        startCounting("counting-num-2", 270, 5);
        startCounting("counting-num-3", 50, 20);
    }
}, {
    threshold: 0.3 // Start when 30% of the section is visible
});

// Start observing
observer.observe(counterSection);



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
// Make sure GSAP plugins are registered at top of your file (you had this earlier):
gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, SplitText);

// Projects animation — robust version
document.addEventListener("DOMContentLoaded", () => {
  // collect project nodes (in DOM order)
  const projects = gsap.utils.toArray(".projects .project");

  if (!projects || projects.length === 0) {
    console.warn("No project elements found (.projects .project).");
    return;
  }

  // pick odd/even indexes robustly (works even if some are missing)
  const leftSet  = projects.filter((_, i) => i % 2 === 0); // 0,2,4...
  const rightSet = projects.filter((_, i) => i % 2 === 1); // 1,3,5...

  // quick safety: bail if nothing
  if (leftSet.length === 0 && rightSet.length === 0) {
    console.warn("No items in leftSet or rightSet — check HTML structure.");
    return;
  }

  // Animate leftSet from left -> right
  gsap.fromTo(leftSet,
    { x: "-300px" },
    {
      x: "300px",
      ease: "none",
      scrollTrigger: {
        trigger: ".projects-container",
        start: "top 80%",      // when top of container hits 80% of viewport
        end: "bottom top",     // when bottom of container reaches top of viewport
        scrub: true,
        invalidateOnRefresh: true
      }
    }
  );

  // Animate rightSet from right -> left
  gsap.fromTo(rightSet,
    { x: "300px" },
    {
      x: "-300px",
      ease: "none",
      scrollTrigger: {
        trigger: ".projects-container",
        start: "top 80%",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      }
    }
  );

  // helpful for debugging
  console.log("Projects animation initialized — projects:", projects.length, "left:", leftSet.length, "right:", rightSet.length);
});






// Mobile Nav Toggle

let toggleBtn = document.getElementById("toggle-btn");
let mobNavRight = document.querySelector(".mob-nav-right");

function toggleNav() {
    mobNavRight.classList.toggle("open");
    toggleBtn.classList.toggle("rotated");
}

// Close menu when a link is clicked
const links = document.querySelectorAll(".mob-nav-right li a");
links.forEach(link => {
    link.addEventListener("click", () => {
        mobNavRight.classList.remove("open");
        toggleBtn.classList.remove("rotated");
    });
});



// Contact section Card
let contactCard = document.querySelector(".contact-card-inner");

gsap.to(contactCard, {
    rotateY: 180,
    duration: 3,
    scrollTrigger: {
        trigger: ".contact-sec-1",
        start: "top 20%",
        end: "bottom bottom",
        scrub: true,
    }
});




// Hero Card

// Define breakpoints
const mobile = window.matchMedia("(max-width: 599px)");
const tablet = window.matchMedia("(min-width: 600px) and (max-width: 1023px)");
const pc = window.matchMedia("(min-width: 1024px)");

// Function to handle screen changes
function handleScreen() {
    let heroCard = document.querySelector(".hero-card")
    if (mobile.matches) {
        
        gsap.to(heroCard, {
            rotate:10,
            duration:2,
        });


        gsap.fromTo(
    [projectCard1, projectCard3, projectCard5],   
    { x: "-100px" },
    { 
        x: "50px",
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
    { x: "100px" },
    { 
        x: "-50px",
        scrollTrigger: {
            trigger: ".projects-container",
            start: "top 80%",
            end: "bottom+=100% top",
            scrub: true
        }
    }
);
        
        // Your mobile-specific code here
    } else if (tablet.matches) {
        
        let heroCard = document.querySelector(".hero-card")
        
        gsap.to(heroCard, {
            x:"30vw",
            rotate: "5deg",
            rotateY:"180deg",
            duration:3,
            scale:0.8,
            scrollTrigger: {
                trigger: heroCard,
                scroller: "body",
                start: "top 15%",
                end: "top -175%",
                scrub: true,
                pin: true,
            }
        });
        // Your tablet-specific code here
    } else if (pc.matches) {
        
        
        gsap.to(heroCard, {
            x:"30vw",
            rotate: "5deg",
            rotateY:"180deg",
            duration:3,
            scale:0.8,
            scrollTrigger: {
                trigger: heroCard,
                scroller: "body",
        start: "top 15%",
        end: "top -175%",
        scrub: true,
        pin: true,
    }
});
// Your PC-specific code here
}
}

// Run on page load
handleScreen();

// Listen for changes when user resizes
mobile.addEventListener('change', handleScreen);
tablet.addEventListener('change', handleScreen);
pc.addEventListener('change', handleScreen);




// Dark Mode  Light Mode Toggle
let modeToggle = document.getElementById("modeToggle");

modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        modeToggle.innerHTML = `<i class="fa-solid fa-lightbulb"></i>`;
    } else {
        modeToggle.innerHTML = `<i class="fa-regular fa-lightbulb"></i>`;
    }
});
