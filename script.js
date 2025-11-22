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






// Mobile Nav Toggle

let toggleBtn = document.getElementById("toggle-btn")
let mobNavRight = document.querySelector(".mob-nav-right")

function toggleNav(){
    if (toggleBtn.style.transform === "rotate(0deg)") {
        toggleBtn.style.transform = "rotate(180deg)";
        mobNavRight.style.top = "8%"
    } else {
        toggleBtn.style.transform = "rotate(0deg)";
        mobNavRight.style.top = "-100%"
    }
    
}

const links = document.querySelectorAll(".mob-nav-right li a");

links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        toggleBtn.style.transform = "rotate(0deg)";
        mobNavRight.style.top = "-100%"
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
            rotateY:180,
            duration:2,
            scrollTrigger: {
                trigger: heroCard,
                scroller: "body",
                start:"top 20%",
                end:"top -50%",
                scrub:1,
            }
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
