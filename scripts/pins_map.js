const customIcon = L.icon({
    iconUrl: '../images/map_marker.png',
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [1, -20],
});

const homeCoords = {lat: 50.056929910684254, lon: 19.935620233845704, popup_content: "Krakow"}

const goldIcon = L.icon({
    iconUrl: '../images/gold_map_marker.png',
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [1, -20],
});

async function drawMap() {
    const pinsResponse = await fetch('../data/pins.json');
    const pinsData = await pinsResponse.json();

    const isMobile = window.innerWidth < 768;

    var map = L.map('pins_map', {
        center: [20, 0],
        zoom: isMobile ? 1 : 2,
        maxZoom: 10,
        minZoom: isMobile ? 1 : 2,
        worldCopyJump: true,
        maxBounds: [
            [-85, isMobile ? -190 : -180],
            [85, isMobile ? 190 : 180]
        ],
        maxBoundsViscosity: 1.0
    });

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        noWrap: false // Allow the map to repeat
    }).addTo(map);

    function addMarker(location, icon = customIcon) {
        L.marker([location.lat, location.lon], { icon: icon })
            .addTo(map)
            .bindPopup(location.popup_content);
    }

    pinsData.pins.forEach(function(location) {
        addMarker(location);
        addMarker({ lat: location.lat, lon: location.lon + 360, popup_content: location.popup_content }); // Repeat marker to the right
        addMarker({ lat: location.lat, lon: location.lon - 360, popup_content: location.popup_content }); // Repeat marker to the left
    });

    addMarker(homeCoords, goldIcon);
    addMarker({ lat: homeCoords.lat, lon: homeCoords.lon + 360, popup_content: homeCoords.popup_content }, goldIcon);
    addMarker({ lat: homeCoords.lat, lon: homeCoords.lon - 360, popup_content: homeCoords.popup_content }, goldIcon);
}

drawMap();
