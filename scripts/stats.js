// Home location - loaded from config
let HOME_LAT = 50.0647;
let HOME_LON = 19.9450;
let HOME_NAME = "Krakow";

// Country to continent mapping (all countries)
const countryContinent = {
    // Europe (44 countries)
    "Albania": "Europe",
    "Andorra": "Europe",
    "Austria": "Europe",
    "Belarus": "Europe",
    "Belgium": "Europe",
    "Bosnia and Herzegovina": "Europe",
    "Bulgaria": "Europe",
    "Croatia": "Europe",
    "Cyprus": "Europe",
    "Czech Republic": "Europe",
    "Czechia": "Europe",
    "Denmark": "Europe",
    "Estonia": "Europe",
    "Finland": "Europe",
    "France": "Europe",
    "Germany": "Europe",
    "Greece": "Europe",
    "Hungary": "Europe",
    "Iceland": "Europe",
    "Ireland": "Europe",
    "Italy": "Europe",
    "Kosovo": "Europe",
    "Latvia": "Europe",
    "Liechtenstein": "Europe",
    "Lithuania": "Europe",
    "Luxembourg": "Europe",
    "Malta": "Europe",
    "Moldova": "Europe",
    "Monaco": "Europe",
    "Montenegro": "Europe",
    "Netherlands": "Europe",
    "North Macedonia": "Europe",
    "Norway": "Europe",
    "Poland": "Europe",
    "Portugal": "Europe",
    "Romania": "Europe",
    "Russia": "Europe",
    "San Marino": "Europe",
    "Serbia": "Europe",
    "Slovakia": "Europe",
    "Slovenia": "Europe",
    "Spain": "Europe",
    "Sweden": "Europe",
    "Switzerland": "Europe",
    "Ukraine": "Europe",
    "United Kingdom": "Europe",
    "UK": "Europe",
    "Vatican City": "Europe",
    // Asia (48 countries)
    "Afghanistan": "Asia",
    "Armenia": "Asia",
    "Azerbaijan": "Asia",
    "Bahrain": "Asia",
    "Bangladesh": "Asia",
    "Bhutan": "Asia",
    "Brunei": "Asia",
    "Cambodia": "Asia",
    "China": "Asia",
    "Georgia": "Asia",
    "India": "Asia",
    "Indonesia": "Asia",
    "Iran": "Asia",
    "Iraq": "Asia",
    "Israel": "Asia",
    "Japan": "Asia",
    "Jordan": "Asia",
    "Kazakhstan": "Asia",
    "Kuwait": "Asia",
    "Kyrgyzstan": "Asia",
    "Laos": "Asia",
    "Lebanon": "Asia",
    "Malaysia": "Asia",
    "Maldives": "Asia",
    "Mongolia": "Asia",
    "Myanmar": "Asia",
    "Nepal": "Asia",
    "North Korea": "Asia",
    "Oman": "Asia",
    "Pakistan": "Asia",
    "Palestine": "Asia",
    "Philippines": "Asia",
    "Qatar": "Asia",
    "Saudi Arabia": "Asia",
    "Singapore": "Asia",
    "South Korea": "Asia",
    "Sri Lanka": "Asia",
    "Syria": "Asia",
    "Taiwan": "Asia",
    "Tajikistan": "Asia",
    "Thailand": "Asia",
    "Timor-Leste": "Asia",
    "Turkey": "Asia",
    "Turkmenistan": "Asia",
    "United Arab Emirates": "Asia",
    "UAE": "Asia",
    "Uzbekistan": "Asia",
    "Vietnam": "Asia",
    "Yemen": "Asia",
    // Africa (54 countries)
    "Algeria": "Africa",
    "Angola": "Africa",
    "Benin": "Africa",
    "Botswana": "Africa",
    "Burkina Faso": "Africa",
    "Burundi": "Africa",
    "Cabo Verde": "Africa",
    "Cape Verde": "Africa",
    "Cameroon": "Africa",
    "Central African Republic": "Africa",
    "Chad": "Africa",
    "Comoros": "Africa",
    "Congo": "Africa",
    "Democratic Republic of the Congo": "Africa",
    "DRC": "Africa",
    "Djibouti": "Africa",
    "Egypt": "Africa",
    "Equatorial Guinea": "Africa",
    "Eritrea": "Africa",
    "Eswatini": "Africa",
    "Swaziland": "Africa",
    "Ethiopia": "Africa",
    "Gabon": "Africa",
    "Gambia": "Africa",
    "Ghana": "Africa",
    "Guinea": "Africa",
    "Guinea-Bissau": "Africa",
    "Ivory Coast": "Africa",
    "Cote d'Ivoire": "Africa",
    "Kenya": "Africa",
    "Lesotho": "Africa",
    "Liberia": "Africa",
    "Libya": "Africa",
    "Madagascar": "Africa",
    "Malawi": "Africa",
    "Mali": "Africa",
    "Mauritania": "Africa",
    "Mauritius": "Africa",
    "Morocco": "Africa",
    "Mozambique": "Africa",
    "Namibia": "Africa",
    "Niger": "Africa",
    "Nigeria": "Africa",
    "Rwanda": "Africa",
    "Sao Tome and Principe": "Africa",
    "Senegal": "Africa",
    "Seychelles": "Africa",
    "Sierra Leone": "Africa",
    "Somalia": "Africa",
    "South Africa": "Africa",
    "South Sudan": "Africa",
    "Sudan": "Africa",
    "Tanzania": "Africa",
    "Togo": "Africa",
    "Tunisia": "Africa",
    "Uganda": "Africa",
    "Zambia": "Africa",
    "Zimbabwe": "Africa",
    // North America (23 countries)
    "Antigua and Barbuda": "North America",
    "Bahamas": "North America",
    "Barbados": "North America",
    "Belize": "North America",
    "Canada": "North America",
    "Costa Rica": "North America",
    "Cuba": "North America",
    "Dominica": "North America",
    "Dominican Republic": "North America",
    "El Salvador": "North America",
    "Grenada": "North America",
    "Guatemala": "North America",
    "Haiti": "North America",
    "Honduras": "North America",
    "Jamaica": "North America",
    "Mexico": "North America",
    "Nicaragua": "North America",
    "Panama": "North America",
    "Saint Kitts and Nevis": "North America",
    "Saint Lucia": "North America",
    "Saint Vincent and the Grenadines": "North America",
    "Trinidad and Tobago": "North America",
    "United States": "North America",
    "USA": "North America",
    "US": "North America",
    // South America (12 countries)
    "Argentina": "South America",
    "Bolivia": "South America",
    "Brazil": "South America",
    "Chile": "South America",
    "Colombia": "South America",
    "Ecuador": "South America",
    "Guyana": "South America",
    "Paraguay": "South America",
    "Peru": "South America",
    "Suriname": "South America",
    "Uruguay": "South America",
    "Venezuela": "South America",
    // Oceania (14 countries)
    "Australia": "Oceania",
    "Fiji": "Oceania",
    "Kiribati": "Oceania",
    "Marshall Islands": "Oceania",
    "Micronesia": "Oceania",
    "Nauru": "Oceania",
    "New Zealand": "Oceania",
    "Palau": "Oceania",
    "Papua New Guinea": "Oceania",
    "Samoa": "Oceania",
    "Solomon Islands": "Oceania",
    "Tonga": "Oceania",
    "Tuvalu": "Oceania",
    "Vanuatu": "Oceania",
    // Territories/regions that might appear
    "Polynesia": "Oceania",
    "French Polynesia": "Oceania",
    "Hawaii": "North America",
    "Puerto Rico": "North America",
    "Hong Kong": "Asia",
    "Macau": "Asia",
    "Greenland": "North America",
    "Faroe Islands": "Europe",
    "Gibraltar": "Europe",
    "Bermuda": "North America",
    "Reunion": "Africa",
    "Zanzibar": "Africa"
};

// Total countries per continent
const continentTotals = {
    "Europe": 44,
    "Asia": 48,
    "Africa": 54,
    "North America": 23,
    "South America": 12,
    "Oceania": 14,
    "Antarctica": 0
};

// Haversine formula to calculate distance between two points
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Extract place name from popup content
function extractPlaceName(popupContent) {
    if (!popupContent) return "Unknown";
    const match = popupContent.match(/^([^,<]+)/);
    return match ? match[1].trim() : "Unknown";
}

// Format coordinates for display
function formatCoordinate(lat, lon) {
    const latDir = lat >= 0 ? "N" : "S";
    const lonDir = lon >= 0 ? "E" : "W";
    return `${Math.abs(lat).toFixed(2)}° ${latDir}, ${Math.abs(lon).toFixed(2)}° ${lonDir}`;
}

// Animate number counting
function animateNumber(element, target, duration = 1500) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        const current = Math.floor(eased * (target - start) + start);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

// Animate progress bar
function animateProgress(element, percentage, duration = 1500) {
    element.style.width = "0%";
    setTimeout(() => {
        element.style.transition = `width ${duration}ms ease-out`;
        element.style.width = `${percentage}%`;
    }, 100);
}

// Calculate and display all stats
async function calculateStats() {
    try {
        const [countriesResponse, pinsResponse, configResponse] = await Promise.all([
            fetch('../data/countries.json'),
            fetch('../data/pins.json'),
            fetch('../data/config.json')
        ]);

        const countriesData = await countriesResponse.json();
        const pinsData = await pinsResponse.json();
        const config = await configResponse.json();

        // Load home location from config
        HOME_LAT = config.home.lat;
        HOME_LON = config.home.lon;
        HOME_NAME = config.home.name;

        const countries = countriesData.countries;
        const pins = pinsData.pins;

        // 1. Farthest from home
        let farthest = { distance: 0, place: "", lat: 0, lon: 0 };
        pins.forEach(pin => {
            const distance = haversineDistance(HOME_LAT, HOME_LON, pin.lat, pin.lon);
            if (distance > farthest.distance) {
                farthest = {
                    distance: distance,
                    place: extractPlaceName(pin.popup_content),
                    lat: pin.lat,
                    lon: pin.lon
                };
            }
        });

        document.getElementById('stat-farthest-place').textContent = farthest.place;
        document.getElementById('stat-farthest-distance').textContent =
            `${Math.round(farthest.distance).toLocaleString()} km from ${HOME_NAME}`;

        // 2. Countries count
        const countriesCount = countries.length;
        animateNumber(document.getElementById('stat-countries'), countriesCount);
        animateProgress(document.getElementById('progress-countries'), (countriesCount / 195) * 100);

        // 3. Continents visited
        const visitedContinents = new Set();
        countries.forEach(country => {
            if (countryContinent[country]) {
                visitedContinents.add(countryContinent[country]);
            }
        });
        const continentsCount = visitedContinents.size;
        animateNumber(document.getElementById('stat-continents'), continentsCount);
        animateProgress(document.getElementById('progress-continents'), (continentsCount / 7) * 100);

        // 4. Pins count
        animateNumber(document.getElementById('stat-pins'), pins.length);

        // 5. Northernmost and Southernmost
        let northernmost = { lat: -90, place: "", lon: 0 };
        let southernmost = { lat: 90, place: "", lon: 0 };

        pins.forEach(pin => {
            if (pin.lat > northernmost.lat) {
                northernmost = { lat: pin.lat, place: extractPlaceName(pin.popup_content), lon: pin.lon };
            }
            if (pin.lat < southernmost.lat) {
                southernmost = { lat: pin.lat, place: extractPlaceName(pin.popup_content), lon: pin.lon };
            }
        });

        document.getElementById('stat-north').textContent = northernmost.place;
        document.getElementById('stat-north-coords').textContent = formatCoordinate(northernmost.lat, northernmost.lon);
        document.getElementById('stat-south').textContent = southernmost.place;
        document.getElementById('stat-south-coords').textContent = formatCoordinate(southernmost.lat, southernmost.lon);

        // 6. Westernmost and Easternmost
        let westernmost = { lon: 180, place: "", lat: 0 };
        let easternmost = { lon: -180, place: "", lat: 0 };

        pins.forEach(pin => {
            if (pin.lon < westernmost.lon) {
                westernmost = { lon: pin.lon, place: extractPlaceName(pin.popup_content), lat: pin.lat };
            }
            if (pin.lon > easternmost.lon) {
                easternmost = { lon: pin.lon, place: extractPlaceName(pin.popup_content), lat: pin.lat };
            }
        });

        document.getElementById('stat-west').textContent = westernmost.place;
        document.getElementById('stat-west-coords').textContent = formatCoordinate(westernmost.lat, westernmost.lon);
        document.getElementById('stat-east').textContent = easternmost.place;
        document.getElementById('stat-east-coords').textContent = formatCoordinate(easternmost.lat, easternmost.lon);

        // 7. Countries per continent
        const continentCounts = {
            "Europe": 0,
            "Asia": 0,
            "Africa": 0,
            "North America": 0,
            "South America": 0,
            "Oceania": 0
        };

        countries.forEach(country => {
            const continent = countryContinent[country];
            if (continent && continentCounts[continent] !== undefined) {
                continentCounts[continent]++;
            }
        });

        // Update continent stats
        const continentElements = {
            "Europe": { stat: 'stat-europe', progress: 'progress-europe' },
            "Asia": { stat: 'stat-asia', progress: 'progress-asia' },
            "North America": { stat: 'stat-north-america', progress: 'progress-north-america' },
            "South America": { stat: 'stat-south-america', progress: 'progress-south-america' },
            "Africa": { stat: 'stat-africa', progress: 'progress-africa' },
            "Oceania": { stat: 'stat-oceania', progress: 'progress-oceania' }
        };

        Object.keys(continentElements).forEach(continent => {
            const count = continentCounts[continent];
            const total = continentTotals[continent];
            const els = continentElements[continent];

            animateNumber(document.getElementById(els.stat), count);
            animateProgress(document.getElementById(els.progress), (count / total) * 100);
        });

    } catch (error) {
        console.error('Error calculating stats:', error);
    }
}

// Mobile accordion functionality
function initMobileAccordion() {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    const groups = document.querySelectorAll('.stats-group');

    // Collapse all except first by default
    groups.forEach((group, index) => {
        if (index > 0) {
            group.classList.add('collapsed');
        }

        const title = group.querySelector('.stats-group-title');
        if (title) {
            title.addEventListener('click', () => {
                const isCollapsed = group.classList.contains('collapsed');

                // Close all sections first
                groups.forEach(g => g.classList.add('collapsed'));

                // Open clicked section with slight delay for smoother animation
                if (isCollapsed) {
                    setTimeout(() => {
                        group.classList.remove('collapsed');
                    }, 150);
                }
            });
        }
    });
}

// Export function for external use
window.calculateStats = calculateStats;

// Initialize accordion on DOM ready
document.addEventListener('DOMContentLoaded', initMobileAccordion);
