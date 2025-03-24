document.addEventListener("DOMContentLoaded", function () {
    const galleryCont = document.querySelector(".gallery-cont");

    // Duplicate the gallery items
    const galleryItems = Array.from(galleryCont.children);
    galleryItems.forEach(item => {
        const clone = item.cloneNode(true);
        galleryCont.appendChild(clone);
    });

    // Handle infinite scroll
    galleryCont.addEventListener("scroll", () => {
        const scrollLeft = galleryCont.scrollLeft;
        const scrollWidth = galleryCont.scrollWidth / 2; // Half because we duplicated the items

        // Reset scroll position when reaching the end
        if (scrollLeft >= scrollWidth) {
            galleryCont.scrollLeft = scrollLeft - scrollWidth;
        }

        // Reset scroll position when scrolling back to the start
        if (scrollLeft <= 0) {
            galleryCont.scrollLeft = scrollWidth + scrollLeft;
        }
    });

    // Automatically scroll to the right slowly
    setInterval(() => {
        galleryCont.scrollLeft += 1; // Adjust the value for speed (1 is very slow)
    }, 20); // Adjust the interval for smoothness (20ms is smooth)
});