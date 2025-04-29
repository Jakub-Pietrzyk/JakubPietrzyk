const ready = function() {
    const globeLink = document.getElementById("globe_link");
    const countriesLink = document.getElementById("countries_link");
    const pinsLink = document.getElementById("pins_link");

    const wrapper = document.getElementById("map_content_wrapper");
    const sideNav = document.getElementById("side_nav");

    globeLink.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (globeLink.classList.contains("active")) return;

        wrapper.style.top = `-100vh`;
        countriesLink.classList.remove("active");
        pinsLink.classList.remove("active");
        globeLink.classList.add("active");     
        sideNav.classList.remove("white");   
    });

    countriesLink.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (countriesLink.classList.contains("active")) return;

        wrapper.style.top = `0px`;
        globeLink.classList.remove("active");
        pinsLink.classList.remove("active");
        countriesLink.classList.add("active");
        sideNav.classList.add("white");
        countCountries();
        emojisDisplay();
    });

    pinsLink.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (pinsLink.classList.contains("active")) return;

        wrapper.style.top = `-200vh`;
        globeLink.classList.remove("active");
        countriesLink.classList.remove("active");
        pinsLink.classList.add("active");
        sideNav.classList.remove("white");
    });
}

document.addEventListener("DOMContentLoaded", function() {
    ready();    
});