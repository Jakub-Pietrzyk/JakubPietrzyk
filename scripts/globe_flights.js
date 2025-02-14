const data_obj = document.getElementById("globe_flights_data").dataset;

// Versor class copied from the solution, important
class Versor {
    static fromAngles([l, p, g]) {
    l *= Math.PI / 360;
    p *= Math.PI / 360;
    g *= Math.PI / 360;
    const sl = Math.sin(l), cl = Math.cos(l);
    const sp = Math.sin(p), cp = Math.cos(p);
    const sg = Math.sin(g), cg = Math.cos(g);
    return [
        cl * cp * cg + sl * sp * sg,
        sl * cp * cg - cl * sp * sg,
        cl * sp * cg + sl * cp * sg,
        cl * cp * sg - sl * sp * cg
    ];
    }
    static toAngles([a, b, c, d]) {
    return [
        Math.atan2(2 * (a * b + c * d), 1 - 2 * (b * b + c * c)) * 180 / Math.PI,
        Math.asin(Math.max(-1, Math.min(1, 2 * (a * c - d * b)))) * 180 / Math.PI,
        Math.atan2(2 * (a * d + b * c), 1 - 2 * (c * c + d * d)) * 180 / Math.PI
    ];
    }
    static interpolateAngles(a, b) {
    const i = Versor.interpolate(Versor.fromAngles(a), Versor.fromAngles(b));
    return t => Versor.toAngles(i(t));
    }
    static interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]) {
    a2 -= a1, b2 -= b1, c2 -= c1, d2 -= d1;
    const x = new Array(4);
    return t => {
        const l = Math.hypot(x[0] = a1 + a2 * t, x[1] = b1 + b2 * t, x[2] = c1 + c2 * t, x[3] = d1 + d2 * t);
        x[0] /= l, x[1] /= l, x[2] /= l, x[3] /= l;
        return x;
    };
    }
    static interpolate([a1, b1, c1, d1], [a2, b2, c2, d2]) {
    let dot = a1 * a2 + b1 * b2 + c1 * c2 + d1 * d2;
    if (dot < 0) a2 = -a2, b2 = -b2, c2 = -c2, d2 = -d2, dot = -dot;
    if (dot > 0.9995) return Versor.interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]); 
    const theta0 = Math.acos(Math.max(-1, Math.min(1, dot)));
    const x = new Array(4);
    const l = Math.hypot(a2 -= a1 * dot, b2 -= b1 * dot, c2 -= c1 * dot, d2 -= d1 * dot);
    a2 /= l, b2 /= l, c2 /= l, d2 /= l;
    return t => {
        const theta = theta0 * t;
        const s = Math.sin(theta);
        const c = Math.cos(theta);
        x[0] = a1 * c + a2 * s;
        x[1] = b1 * c + b2 * s;
        x[2] = c1 * c + c2 * s;
        x[3] = d1 * c + d2 * s;
        return x;
    };
    }
}

async function drawGlobe() {
    const response = await fetch('../../data/c.json');
    const world_json = await response.json();

    const countriesResponse = await fetch('../../data/trips/polynesia_flights.json');
    const countries = await countriesResponse.json();

    const isMobile = window.innerWidth < 768;
    const width = isMobile ? window.innerWidth - 40 : 700;
    const height = 400;

    const dpr = window.devicePixelRatio ?? 1;
    const canvas = d3.select(`#${data_obj.svgId}`)
        .attr("width", dpr * width)
        .attr("height", dpr * height)
        .style("width", `${width}px`)
        .style("height", `${height}px`);
    const context = canvas.node().getContext("2d");
    context.scale(dpr, dpr);

    const projection = d3.geoOrthographic().fitExtent([[10, 10], [width - 10, height - 10]], {type: "Sphere"});
    const path = d3.geoPath(projection, context);

    function render(country, arc, cityData = null) {
        context.clearRect(0, 0, width, height);
        
        context.beginPath(), path({type: "Sphere"}), context.fillStyle = "#EEE", context.fill();
        context.beginPath(), path(world_json), context.fillStyle = "#fff", context.fill();
        context.beginPath(), path(world_json.features.filter(function(f) { return f.properties.name == country; })[0].geometry), context.fillStyle = "red", context.fill();
        context.beginPath(), path(world_json), context.strokeStyle = "black", context.lineWidth = 0.3, context.stroke();
        context.beginPath(), path({type: "Sphere"}), context.strokeStyle = "#000", context.lineWidth = 0.3, context.stroke();
        context.beginPath(), path(arc), context.strokeStyle = "#000", context.lineWidth = 1, context.stroke();

        if(cityData){
            const [x, y] = projection(cityData.coords);
            context.fillStyle = "black";
            context.font = "10px Arial";
            context.fillText(cityData.name, x, y);
        }

        return context.canvas;
    }

    const tilt = 5;
    async function animateFlights(countries) {
        let p1, p2 = countries[0].coords, r1, r2 = [0, 0, 0];
        
        for (const { country, coords, name, zoom } of countries) {
            console.log(country);
            p1 = p2, p2 = coords;
            r1 = r2, r2 = [-p2[0], tilt - p2[1], 0];
            const ip = d3.geoInterpolate(p1, p2);
            const iv = Versor.interpolateAngles(r1, r2);

            await d3.transition()
                .duration(1250)
                .tween("render", () => t => {
                    projection.rotate(iv(t));
                    projection.scale(d3.interpolate(projection.scale(), zoom * (isMobile ? 0.75 : 1))(t));
                    render(country, {type: "LineString", coordinates: [p1, ip(t)]}, {name, coords});
                })
                .transition()
                .tween("render", () => t => {
                    projection.rotate(iv(1)); // Ensure final rotation is set
                    projection.scale(zoom * (isMobile ? 0.75 : 1)); // Ensure final scale is set
                    render(country, {type: "LineString", coordinates: [ip(t), p2]}, {name, coords});
                })
                .end();
            
            prevCoords = coords;
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateFlights(countries.trace);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 });

    observer.observe(canvas.node());
}

drawGlobe();