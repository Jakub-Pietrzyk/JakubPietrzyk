const globeLink = document.getElementById("globe_link");
const countriesLink = document.getElementById("countries_link");
const pinsLink = document.getElementById("pins_link");

const wrapper = document.getElementById("map_content_wrapper");
const sideNav = document.getElementById("side_nav");

let isScrolling = false;

moveToCountries = function() {
    wrapper.style.top = `0px`;
    globeLink.classList.remove("active");
    pinsLink.classList.remove("active");
    countriesLink.classList.add("active");
    sideNav.classList.add("white");
    countCountries();
    emojisDisplay(); 
}

moveToGlobe = function() {
    wrapper.style.top = `-100vh`;
    countriesLink.classList.remove("active");
    pinsLink.classList.remove("active");
    globeLink.classList.add("active");     
    sideNav.classList.remove("white");  
}

moveToPins = function() {
    wrapper.style.top = `-200vh`;
    globeLink.classList.remove("active");
    countriesLink.classList.remove("active");
    pinsLink.classList.add("active");
    sideNav.classList.remove("white");
}

const ready = function() {
    globeLink.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (globeLink.classList.contains("active")) return;

        moveToGlobe();
    });

    countriesLink.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (countriesLink.classList.contains("active")) return;

        moveToCountries();
    });

    pinsLink.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (pinsLink.classList.contains("active")) return;

        moveToPins();
    });
}

const scrollReady = function() {
    const globeLink = document.getElementById("globe_link");
    const countriesLink = document.getElementById("countries_link");
    const pinsLink = document.getElementById("pins_link");

    const wheelHandler = (e) => {
        if (isScrolling) return;
        const delta = e.deltaY;

        if (delta > 50) {
            // move down

            if(countriesLink.classList.contains("active")){
                moveToGlobe();  
                isScrolling = true;
                setTimeout(() => { isScrolling = false; }, 1000);
            } else if(globeLink.classList.contains("active")){
                moveToPins();
                isScrolling = true;
                setTimeout(() => { isScrolling = false; }, 1000);
            } else {
                return
            }
        } else if (delta < -50) {
            // move top
            if(globeLink.classList.contains("active")){
                moveToCountries();  
                isScrolling = true;
                setTimeout(() => { isScrolling = false; }, 1000);
            } else if(pinsLink.classList.contains("active")){
                moveToGlobe();
                isScrolling = true;
                setTimeout(() => { isScrolling = false; }, 1000);
            } else {
                return
            }
        }
    };

    let startY;
    const touchStartHandler = (e) => { startY = e.touches[0].clientY; };

    const touchMoveHandler = (e) => {
        if (isScrolling) return;
        const deltaY = startY - e.touches[0].clientY;

        if (deltaY > 50) {
            // move down

            if(countriesLink.classList.contains("active")){
                moveToGlobe();  
                isScrolling = true;
                setTimeout(() => { isScrolling = false; }, 1000);
            } else if(globeLink.classList.contains("active")){
                moveToPins();
                isScrolling = true;
                setTimeout(() => { isScrolling = false; }, 1000);
            } else {
                return
            }
        } else if (deltaY < -50) {
            // move top
            if(globeLink.classList.contains("active")){
                moveToCountries();  
                isScrolling = true;
                setTimeout(() => { isScrolling = false; }, 1000);
            } else if(pinsLink.classList.contains("active")){
                moveToGlobe();
                isScrolling = true;
                setTimeout(() => { isScrolling = false; }, 1000);
            } else {
                return
            }
        }
    };

    window.addEventListener("wheel", wheelHandler);
    window.addEventListener("touchstart", touchStartHandler);
    window.addEventListener("touchmove", touchMoveHandler);
}


document.addEventListener("DOMContentLoaded", function() {
    ready();
    scrollReady();    
});