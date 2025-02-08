function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easedProgress = easeInOutQuad(progress);
        obj.innerHTML = Math.floor(easedProgress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const countCountries = async () => {
    const countriesResponse = await fetch('../data/countries.json');
    const countries = await countriesResponse.json();

    const title = document.getElementById("countries_title");
    const span = title.querySelector("span");
    
    animateValue(span, 0, countries.countries.length, 2000);
}

function animateEmojis(container, emojis, duration) {
    let startTimestamp = null;
    const totalEmojis = emojis.length;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easedProgress = easeInOutQuad(progress);
        const currentCount = Math.floor(easedProgress * totalEmojis);
        container.innerHTML = emojis.slice(0, currentCount).join(' ');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const emojisDisplay = async () => {
    const countriesResponse = await fetch('../data/countries.json');
    const countries = await countriesResponse.json();
    const emojis = countries.emojis;

    const container = document.getElementById("countries_list");
    animateEmojis(container, emojis, 3000);
}

countCountries();
emojisDisplay();