const ready = function() {
    const removeWheelListener = () => {
        window.removeEventListener("wheel", wheelHandler);
    };


    const scrollButton = document.getElementById("sd_container");
    const wrapper = document.getElementById("trips_content_wrapper");


    scrollButton.addEventListener("click", (e) => {        
        e.preventDefault();        
        wrapper.classList.add('wrapped-top');
    });


    const wheelHandler = (e) => {
        const delta = e.deltaY;

        if (delta > 50) {
            wrapper.classList.add('wrapped-top');
            removeWheelListener();
        }
    };

    window.addEventListener("wheel", wheelHandler);

}

document.addEventListener("DOMContentLoaded", function() {
    ready();    
});