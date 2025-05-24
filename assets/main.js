// Cache DOM elements and set up animation queue
const ls = document.querySelector('.loading_screen');
const wrapper = document.querySelector('.wrapper');
const animationQueue = [];

// More efficient element creation with batched DOM operations
function createEle(delay, element, content, classname) {
    animationQueue.push({
        delay,
        callback: () => {
            const el = document.createElement(element);
            el.textContent = content;
            if (classname) {
                el.classList.add(classname);
            }
            ls.appendChild(el);
        }
    });
}

// Set up loading animation sequence
function setupLoadingAnimation() {
    createEle(1000, 'p', '* MA INDUSTRIES TERMINAL HIJACK SYSTEM (NOWAR3289)');
    createEle(1150, 'p', '// In Progress');
    createEle(2500, 'br');
    createEle(2500, 'br');
    createEle(2500, 'p', "The user is a part of the following security groups:", "userp");
    createEle(3000, 'p', "Domain users:", "userpd");
    createEle(3000, 'p', "BUILTIN\\Users", "userpd");
    createEle(3000, 'p', "NT AUTHORITY\\INTERACTIVE", "userpd");
    createEle(4000, 'br');
    createEle(4000, 'br');
    createEle(4000, 'br');
    createEle(4000, 'p', "OK to Reboot?  [Y/N]_");
    createEle(4500, 'br');
    createEle(4500, 'p', "C:\\");
    createEle(4500, 'br');

    const welcomeLines = [
        "        #     # ####### #        #####  ####### #     # #######     ",
        "        #  #  # #       #       #     # #     # ##   ## #           ",
        "        #  #  # #       #       #       #     # # # # # #           ",
        "        #  #  # #####   #       #       #     # #  #  # #####       ",
        "        #  #  # #       #       #       #     # #     # #           ",
        "        #  #  # #       #       #     # #     # #     # #           ",
        "         ## ##  ####### #######  #####  ####### #     # #######     "
    ];

    welcomeLines.forEach(line => {
        createEle(5500, 'p', line, "welcome");
    });
}

function processAnimationQueue() {
    let lastTimerId = null;
    
    animationQueue.forEach(item => {
        lastTimerId = setTimeout(item.callback, item.delay);
    });
    
    setTimeout(() => {
        ls.style.opacity = '0';
        ls.style.transition = 'opacity 0.5s';
        wrapper.style.opacity = '1';
        wrapper.style.transition = 'opacity 0.25s';
        
        setTimeout(() => {
            ls.remove();
        }, 750);
    }, 7500);
    
    return lastTimerId;
}

// Initialize tab functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.classList.remove('grid');
            });

            this.classList.add('active');

            const tabId = this.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            tabContent.classList.add('active');

            if (tabId === 'tab2') {
                tabContent.classList.add('grid');
            }
        });
    });
}

// Check if browser supports requestAnimationFrame and use it if available
const raf = window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function(callback) { return setTimeout(callback, 1000/60); };

// Main init function
function init() {
    // Set up and process animations
    setupLoadingAnimation();
    processAnimationQueue();
    
    // Initialize tab functionality when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTabs);
    } else {
        initTabs();
    }
}

init();

// Utility function to reload page
function reload() {
    location.reload();
}