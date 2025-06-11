const isMobile = window.innerWidth < 768;

if (isMobile) {
    document.querySelector('nav.white').classList.remove('white');
    document.querySelector('img.logo').src = "../images/qubix_black.png"
}