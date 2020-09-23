/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.getElementsByTagName('section'); 
const navBarUList = document.getElementById('navbar__list');
const liaIdPrefix = "link-to-";
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function nearTopOfViewport(el) {
    const rect = el.getBoundingClientRect();
    return  rect.top < window.innerHeight && rect.bottom >= 0;
}

function getYCoord(elem) {
    let box = elem.getBoundingClientRect();
    return box.top + window.pageYOffset;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavMen(sections) {
    const fragment = document.createDocumentFragment();
    for (const section of sections) {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.setAttribute("id", liaIdPrefix + section.getAttribute("id"));
        anchor.setAttribute("href", "#" + section.getAttribute("id"));
        anchor.innerText = section.dataset.nav;
        listItem.appendChild(anchor);
        fragment.appendChild(listItem);
    }
    
    navBarUList.style.display = "none";
    navBarUList.appendChild(fragment);
    navBarUList.style.display = "flex";
}

// Add class 'active' to section when near top of viewport
function toggleActiveSection() {
    for (let i = 1; i <= sections.length; i++) {
        const section = document.getElementById('section' + i);
        if (nearTopOfViewport(section)) {
            section.classList.add("active");
            const liaElement = document.getElementById(liaIdPrefix + section.getAttribute("id"));
            liaElement.className = "show-active-link";
        } else {
            section.classList.remove("active");
            const liaElement = document.getElementById(liaIdPrefix + section.getAttribute("id"));
            liaElement.className = "hide-active-link";
        }
    }
}

// Scroll to anchor ID using scrollTO event

function smothScrollTo(anchor) {
    const section = document.querySelector(anchor.getAttribute("href"));
    window.scrollTo({top: getYCoord(section), left: 0, behavior:"smooth"});
}

function onClick(event) {
    event.preventDefault();
    smothScrollTo(event.target);
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', buildNavMen(sections));

// Scroll to section on link click
const anchorElements = document.querySelectorAll('li a');
for(anchorElement of anchorElements) {
    anchorElement.addEventListener('click', onClick);
}
// Set sections as active
document.addEventListener('scroll', toggleActiveSection, {passive: true});

/**
 * end required features impl
 * back to top impl
 */

// Set a variable for our button element.
const scrollToTopButton = document.getElementById('js-top');

// Let's set up a function that shows our scroll-to-top button if we scroll beyond the height of the initial window.
const scrollFunc = () => {
  // Get the current scroll value
  let y = window.scrollY;
  
  // If the scroll value is greater than the window height, let's add a class to the scroll-to-top button to show it!
  if (y > 0) {
    scrollToTopButton.className = "top-link show";
  } else {
    scrollToTopButton.className = "top-link hide";
  }
};

window.addEventListener("scroll", scrollFunc);

const scrollToTop = () => {
  // Let's set a variable for the number of pixels we are from the top of the document.
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  
  // If that number is greater than 0, we'll scroll back to 0, or the top of the document.
  // We'll also animate that scroll with requestAnimationFrame:
  // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    // ScrollTo takes an x and a y coordinate.
    // Increase the '10' value to get a smoother/slower scroll!
    window.scrollTo(0, c - c / 10);
  }
};

// When the button is clicked, run our ScrolltoTop function above!
scrollToTopButton.onclick = function(e) {
  e.preventDefault();
  scrollToTop();
}

