// Cache DOM elements and set up animation queue
const ls = document.querySelector('.loading-screen');
const wrapper = document.querySelector('.wrapper');
const animationQueue = [];
let assetsLoaded = false;
let animationComplete = false;

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
        "      #     # ####### #        #####  ####### #     # #######     ",
        "      #  #  # #       #       #     # #     # ##   ## #           ",
        "      #  #  # #       #       #       #     # # # # # #           ",
        "      #  #  # #####   #       #       #     # #  #  # #####       ",
        "      #  #  # #       #       #       #     # #     # #           ",
        "      #  #  # #       #       #     # #     # #     # #           ",
        "       ## ##  ####### #######  #####  ####### #     # #######     "
    ];

    welcomeLines.forEach(line => {
        createEle(5500, 'p', line, "welcome");
    });
}

// Function to load all critical assets
function loadAssets() {
    return new Promise((resolve) => {
        const assetsToLoad = [];
        
        // Load background image
        const bgImg = new Image();
        bgImg.src = '/assets/img/bg.jpg';
        assetsToLoad.push(new Promise((imgResolve) => {
            bgImg.onload = imgResolve;
            bgImg.onerror = imgResolve; // Resolve even on error to prevent hanging
        }));
        
        // Load font
        const fontUrl = '/assets/fonts/MesloLGS NF Regular.ttf';
        if ('fonts' in document) {
            const fontFace = new FontFace('MesloLGS NF', `url(${fontUrl})`);
            assetsToLoad.push(
                fontFace.load().then(() => {
                    document.fonts.add(fontFace);
                }).catch(() => {
                    // Resolve even on error to prevent hanging
                })
            );
        }
        
        // Wait for all assets to load
        Promise.all(assetsToLoad).then(() => {
            assetsLoaded = true;
            checkIfReadyToRemoveLoader();
            resolve();
        });
    });
}

function processAnimationQueue() {
    let maxDelay = 0;
    
    animationQueue.forEach(item => {
        setTimeout(item.callback, item.delay);
        maxDelay = Math.max(maxDelay, item.delay);
    });
    
    // Mark animation as complete after the longest delay + some buffer
    setTimeout(() => {
        animationComplete = true;
        checkIfReadyToRemoveLoader();
    }, maxDelay + 2000); // Add 2 seconds buffer for the welcome text to display
}

// Check if both assets and animations are ready
function checkIfReadyToRemoveLoader() {
    if (assetsLoaded && animationComplete) {
        removeLoadingScreen();
    }
}

// Remove loading screen with smooth transition
function removeLoadingScreen() {
    ls.style.opacity = '0';
    ls.style.transition = 'opacity 0.5s';
    wrapper.style.opacity = '1';
    wrapper.style.transition = 'opacity 0.25s';
    
    setTimeout(() => {
        ls.remove();
    }, 750);
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
    // Start loading assets immediately
    loadAssets();
    
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

// Start everything when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Utility function to reload page
function reload() {
    location.reload();
}

//* Loading Screen
const frames = ['—', '\\', '|', '/'];
let currentFrame = 0;
const spinner = document.getElementById('spinner');
function animate() {
    spinner.textContent = frames[currentFrame];
    currentFrame = (currentFrame + 1) % frames.length;
}

const animationInterval = setInterval(animate, 100);
setTimeout(() => {
    const loadingContainer = document.querySelector('.loading-container');
    loadingContainer.classList.add('close')
    wrapper.style.opacity = '1';
    wrapper.style.transition = 'opacity 0.25s';
    setTimeout(() => {
        loadingContainer.remove();
        clearInterval(animationInterval);
    }, 500);
}, 2000);


//* Cursor 
const cursor = document.querySelector('.mouse-cursor');
const cursorHoverElements = document.querySelectorAll('.cursor-hover');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    checkHoverElements();
    
    requestAnimationFrame(animateCursor);
}

function checkHoverElements() {
    let isHovering = false;
    
    cursorHoverElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (cursorX >= rect.left && cursorX <= rect.right && 
            cursorY >= rect.top && cursorY <= rect.bottom) {
            isHovering = true;
        }
    });
    
    if (isHovering) {
        cursor.classList.add('hover');
    } else {
        cursor.classList.remove('hover');
    }
}

animateCursor();

document.body.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

if (isMobile) {
    cursor.style.display = 'none';
} else {
    cursor.style.opacity = '0';
}

if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    cursor.style.display = 'none';
}


//* input box 
const input = document.querySelector('.input-box');
const caret = document.querySelector('.box-cursor');
let cursorPosition = 0;

function measureTextWidth(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const computedStyle = window.getComputedStyle(input);
    context.font = computedStyle.font;
    return context.measureText(text).width;
}

function updateCursorPosition() {
    const textBeforeCursor = input.value.substring(0, cursorPosition);
    const textWidth = measureTextWidth(textBeforeCursor);
    caret.style.left = (textWidth) + 'px';
    
    const charUnderCursor = input.value.charAt(cursorPosition);
    caret.textContent = charUnderCursor || ' ';
    
    if (charUnderCursor) {
        const charWidth = measureTextWidth(charUnderCursor);
        caret.style.width = Math.max(12, charWidth + 2) + 'px';
    } else {
        caret.style.width = '8px';
    }
    
    caret.style.animation = 'none';
    caret.offsetHeight;
    caret.style.animation = 'blink 1s infinite';
}

function setCursorPosition(pos) {
    cursorPosition = Math.max(0, Math.min(pos, input.value.length));
    input.setSelectionRange(cursorPosition, cursorPosition);
    updateCursorPosition();
}

input.addEventListener('input', (e) => {
    if (e.inputType === 'deleteContentBackward') {
        cursorPosition = Math.max(0, cursorPosition - 1);
    } else if (e.inputType === 'deleteContentForward') {
    } else if (e.data) {
        cursorPosition += e.data.length;
    }
    updateCursorPosition();
});

input.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            setCursorPosition(cursorPosition - 1);
            break;
        case 'ArrowRight':
            e.preventDefault();
            setCursorPosition(cursorPosition + 1);
            break;
        case 'Home':
            e.preventDefault();
            setCursorPosition(0);
            break;
        case 'End':
            e.preventDefault();
            setCursorPosition(input.value.length);
            break;
        case 'Backspace':
            if (cursorPosition > 0) {
                cursorPosition--;
            }
            break;
        case 'Delete':
            break;
    }
});

input.addEventListener('click', (e) => {
    const inputRect = input.getBoundingClientRect();
    const clickX = e.clientX - inputRect.left;
    
    const text = input.value;
    let closestPosition = 0;
    let minDistance = Math.abs(clickX);
    
    for (let i = 0; i <= text.length; i++) {
        const textWidth = measureTextWidth(text.substring(0, i));
        const distance = Math.abs(clickX - textWidth);
        if (distance < minDistance) {
            minDistance = distance;
            closestPosition = i;
        }
    }
    
    setCursorPosition(closestPosition);
});

input.addEventListener('selectionchange', () => {
    if (document.activeElement === input) {
        cursorPosition = input.selectionStart;
        updateCursorPosition();
    }
});

input.addEventListener('focus', () => {
    cursorPosition = input.selectionStart || 0;
    updateCursorPosition();
});

input.focus();
updateCursorPosition();
