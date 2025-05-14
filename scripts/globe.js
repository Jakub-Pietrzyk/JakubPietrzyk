let autoRotate = true;
let timer, projection, svg;
const sensitivity = 40;
var isTouchDevice = 'ontouchstart' in document.documentElement;


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

    if(isTouchDevice){
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', function(event) {
                // event.beta: front-back tilt [-180,180], event.gamma: left-right tilt [-90,90]
                // We'll use gamma for left-right rotation, beta for up-down (if desired)
                if (projection) {
                    const rotate = projection.rotate();
                    const gamma = event.gamma || 0; // left-right
                    const beta = event.beta || 0;   // front-back
                    
                    // Example: rotate horizontally with gamma, vertically with beta
                    projection.rotate([rotate[0] + gamma * 1, rotate[1] + -30 + beta * 0.2]);
                    const path = d3.geoPath().projection(projection);
                    svg.selectAll("path").attr("d", path);
                }
            });
        }
    } else {
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
}

drawGlobe();