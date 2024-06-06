const buttonRight = document.getElementById('slideRight');
const buttonLeft = document.getElementById('slideLeft');

buttonRight.onclick = function () {
document.getElementById('nav-container').scrollLeft += 75;
};

buttonLeft.onclick = function () {
document.getElementById('nav-container').scrollLeft -= 75;
};

function checkOverflow() {
    const menuContainer = document.getElementById('nav-container');
    const isOverflowing = menuContainer.scrollWidth > menuContainer.clientWidth;
    buttonRight.style.display = isOverflowing ? "block" : "none";
    buttonLeft.style.display = isOverflowing ? "block" : "none";
    if (isOverflowing) {
        menuContainer.classList.add('ms-5');
        menuContainer.classList.add('me-5');
    } else {
        // Remove the classes if not overflowing
        menuContainer.classList.remove('ms-5');
        menuContainer.classList.remove('me-5');
        // Add alternative classes
        menuContainer.classList.add('ms-2');
        menuContainer.classList.add('me-0');
    }
}

checkOverflow(); //initial check

window.addEventListener('resize', function() {
    checkOverflow();
});