const ready = function() {
    const globeLink = document.getElementById("globe_link");
    const countriesLink = document.getElementById("countries_link");
    const pinsLink = document.getElementById("pins_link");

    const globeCont = document.getElementById("globe_cont");
    const countriesCont = document.getElementById("countries_cont");
    const pinsCont = document.getElementById("pins_cont");

    const wrapper = document.getElementById("map_content_wrapper");
    const screenHeight = window.innerHeight;

    globeLink.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (globeLink.classList.contains("active")) return;

        wrapper.style.top = `0px`;
        countriesLink.classList.remove("active");
        pinsLink.classList.remove("active");
        globeLink.classList.add("active");
    });

    countriesLink.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (countriesLink.classList.contains("active")) return;

        // wrapper.style.top = `-${screenHeight}px`;
        wrapper.style.top = `-100vh`;
        globeLink.classList.remove("active");
        pinsLink.classList.remove("active");
        countriesLink.classList.add("active");
    });

    pinsLink.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (pinsLink.classList.contains("active")) return;

        // wrapper.style.top = `-${screenHeight * 2}px`;
        wrapper.style.top = `-200vh`;
        globeLink.classList.remove("active");
        countriesLink.classList.remove("active");
        pinsLink.classList.add("active");

    });
}

document.addEventListener("DOMContentLoaded", function() {
    ready();    
});