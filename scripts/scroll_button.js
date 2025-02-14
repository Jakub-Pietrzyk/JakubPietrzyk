const ready = function() {
    const removeWheelListener = () => { window.removeEventListener("wheel", wheelHandler); };
    const removeTouchMoveListener = () => { window.removeEventListener("touchmove", touchMoveHandler); };

    const scrollButton = document.getElementById("sd_container");
    const wrapper = document.getElementById("trips_content_wrapper");


    const clickHandler = (e) => {
        e.preventDefault();        
        wrapper.classList.add('wrapped-top');
    }

    const wheelHandler = (e) => {
        const delta = e.deltaY;

        if (delta > 50) {
            wrapper.classList.add('wrapped-top');
            removeWheelListener();
        }
    };

    let startY;

    const touchStartHandler = (e) => { startY = e.touches[0].clientY; };

    const touchMoveHandler = (e) => {
        const deltaY = startY - e.touches[0].clientY;

        if (deltaY > 50) {
            wrapper.classList.add('wrapped-top');
            removeTouchMoveListener();
        }
    };

    scrollButton.addEventListener("click", clickHandler);
    window.addEventListener("wheel", wheelHandler);
    window.addEventListener("touchstart", touchStartHandler);
    window.addEventListener("touchmove", touchMoveHandler);
}

document.addEventListener("DOMContentLoaded", function() {
    ready();    
});