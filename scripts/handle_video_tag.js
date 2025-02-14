document.addEventListener("DOMContentLoaded", function() {
    const video = document.querySelector("video");

    // Check if the video can be played
    video.oncanplay = function() {
        video.style.display = "block";
    };

    // Hide the video if it cannot be played
    video.onerror = function() {
        video.style.display = "none";
    };

    // Initially hide the video until it can be played
    video.style.display = "none";
});