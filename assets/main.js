const wrapper = document.querySelector('.wrapper');

function createEle(delay, element, content, classname){
    setTimeout(() => {
        const el = document.createElement(element);
        el.textContent = content;
        if(classname){
            el.classList.add(classname);
        }
        wrapper.appendChild(el);
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
    wrapper.innerHTML = '';
}, 10000);

setTimeout(() => {
    window.location.reload();
}, 15000);