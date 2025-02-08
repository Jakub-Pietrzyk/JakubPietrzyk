const ready = function() {
    const scrollButton = document.getElementById("sd_container");

    const wrapper = document.getElementById("trips_content_wrapper");

    scrollButton.addEventListener("click", (e) => {
        console.log("click");
        
        e.preventDefault();        
        wrapper.style.top = `-100vh`;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    ready();    
});