const body = document.querySelector("body");
let background = document.querySelector(".background");
background = background ? background : document.querySelector(".countries-bg");
background = background ? background : document.querySelector(".trips-bg");

document.addEventListener("mousemove", (e) => {
    if (window.innerWidth > 768) {
        const elWidth = window.innerWidth;
        const elHeight = window.innerHeight;
        const newX = (((elWidth / 2) - e.clientX) * 10 / (elWidth / 2)) - 10;
        const newY = (((elHeight / 2) - e.clientY) * 10 / (elHeight / 2)) - 10;

        if (background) {
            background.style.setProperty('--x', newX + "px");
            background.style.setProperty('--y', newY + "px");
        }
    }
});