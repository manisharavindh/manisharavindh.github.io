const ls = document.querySelector('.loading_screen');
// const wrapper = document.querySelector('.wrapper');

function createEle(delay, element, content, classname){
    setTimeout(() => {
        const el = document.createElement(element);
        el.textContent = content;
        if(classname){
            el.classList.add(classname);
        }
        ls.appendChild(el);
    }, delay);
}

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
createEle(5500, 'p', "        #      # ####### #        #####   ####### #     # #######    #     # #######      #     #    #    #     # #######  #####  #     #", "welcome")
createEle(5500, 'p', "        #  #   # #       #       #     #  #     # ##   ## #          ##   ## #      #     ##   ##   # #   ##    #    #    #     # #     #", "welcome")
createEle(5500, 'p', "        #  #   # #       #       #        #     # # # # # #          # # # # #      #     # # # #  #   #  # #   #    #    #       #     #", "welcome")
createEle(5500, 'p', "        #  #   # #####   #       #        #     # #  #  # #####      #  #  # #######      #  #  # #     # #  #  #    #     #####  #######", "welcome")
createEle(5500, 'p', "        #  #   # #       #       #        #     # #     # #          #     # #    #       #     # ####### #   # #    #          # #     #", "welcome")
createEle(5500, 'p', "        #  #   # #       #       #     #  #     # #     # #          #     # #     #  ### #     # #     # #    ##    #          # #     #", "welcome")
createEle(5500, 'p', "         ##  ##  ####### #######  #####   ####### #     # #######    #     # #      # ### #     # #     # #     # ####### ######  #     #", "welcome")

setTimeout(() => {
    ls.style.transition = "opacity 0.2s";
    ls.style.opacity = "0";
    
    setTimeout(() => {
      ls.remove();
    }, 200);
  }, 7500);

function reload(){
    location.reload();
}

// setTimeout(() => {
//     ls.remove();
// }, 1000);

// taps
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

document.getElementById("login").innerHTML = new Date().toTimeString();

console.log(navigator);