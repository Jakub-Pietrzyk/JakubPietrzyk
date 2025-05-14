let autoRotate = true;
let timer, projection, svg;
const sensitivity = 40;


async function drawGlobe() {
    const response = await fetch('../data/c.json');
    const world_json = await response.json();

    const countriesResponse = await fetch('../data/countries.json');
    const countries = await countriesResponse.json();

    const isMobile = window.innerWidth < 768;

    const width = window.innerWidth;
    const height = window.innerHeight - 50;
    const size = isMobile ? 130 : 250;

    projection = d3.geoOrthographic()
        .scale(size)
        .center([0, 0])
        .rotate([0, -30])
        .translate([width / 2, height / 2]);

    const initialScale = projection.scale();
    let path = d3.geoPath().projection(projection);

    svg = d3.select("#globe")
        .attr("width", width)
        .attr("height", height);

    let globe = svg.append("circle")
        .attr("fill", "#EEE")
        .attr("stroke", "#000")
        .attr("stroke-width", "0.2")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("r", initialScale);

    svg.call(d3.drag().on('drag', (event) => {
        const rotate = projection.rotate();
        const k = sensitivity / projection.scale();
        projection.rotate([
            rotate[0] + event.dx * k,
            rotate[1] - event.dy * k
        ]);
        path = d3.geoPath().projection(projection);
        svg.selectAll("path").attr("d", path);
    }));

    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function (event) {
            projection.rotate([
                rotate[0] + event.beta * k,
                rotate[1] - event.gamma * k
            ]);
            path = d3.geoPath().projection(projection);
            svg.selectAll("path").attr("d", path);
        }, true);
    } else if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function (event) {
            projection.rotate([
                rotate[0] + event.acceleration.x * 2 * k,
                rotate[1] - event.acceleration.y * 2 * k
            ]);
            path = d3.geoPath().projection(projection);
            svg.selectAll("path").attr("d", path);
        }, true);
    } else {
        window.addEventListener("MozOrientation", function (orientation) {
            projection.rotate([
                rotate[0] + orientation.x * 50 * k,
                rotate[1] - orientation.y * 50 * k
            ]);
            path = d3.geoPath().projection(projection);
            svg.selectAll("path").attr("d", path);
        }, true);
    }

    let map = svg.append("g");

    map.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(world_json.features)
        .enter().append("path")
        .attr("class", "country")
        .attr("d", path)
        .style("fill", (d) => {
            if(d.properties.name === "Poland") {
                return "gold";
            } else if (countries.countries.includes(d.properties.name)) {
                return "red";
            } else {
                return "#fff";
            }
        })
        .style('stroke', 'black')
        .style('stroke-width', 0.3)
        .style("opacity", 0.8);

    // Optional rotate
    timer = d3.timer(function(elapsed) {
        if (autoRotate) {
            const rotate = projection.rotate();
            const k = sensitivity / projection.scale();
            projection.rotate([
                rotate[0] - 1 * k,
                rotate[1]
            ]);
            path = d3.geoPath().projection(projection);
            svg.selectAll("path").attr("d", path);
        }
    }, 200);
}

drawGlobe();