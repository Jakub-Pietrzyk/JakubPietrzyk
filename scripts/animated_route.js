const data_obj = document.getElementById("animated_route_data").dataset;

const isMobile = window.innerWidth < 768;
const width = isMobile ? window.innerWidth : 700;
const height = 400;
const size = 250;


const svg = d3.select(`#${data_obj.svgId}`)
    .attr('width', width)
    .attr('height', height);

const g = svg.append("g"); // Group for zooming

const projection = d3.geoMercator().scale(size).translate([width / 2, height / 2]);
const path = d3.geoPath().projection(projection);

const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", (event) => {
    g.attr("transform", event.transform);
});

svg.call(zoom);

Promise.all([
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"),
    d3.json("../../data/pp_detailed.json"),
    d3.json("../../data/s_detailed.json"),
]).then(([countriesJSON, populatedPlaces, states]) => {
    const countries = topojson.feature(countriesJSON, countriesJSON.objects.countries);

    g.append("g")
        .selectAll("path")
        .data(countries.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", "#ccc")
        .attr("stroke", "#333");

    g.append("g")
        .selectAll("path")
        .data(states.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", "none")
        .attr("stroke", "#888")
        .attr("stroke-width", 0.5); 

    const places = g.append("g")
        .selectAll("g")
        .data(populatedPlaces.features)
        .enter().append("g")
        .attr("transform", d => `translate(${projection(d.geometry.coordinates)})`);

    places.append("circle")
        .attr("r", 0.5)
        .attr("fill", "black");

    places.append("text")
        .attr("x", 2)
        .attr("y", 0)
        .attr("font-size", "3px")
        .attr("fill", "black")
        .text(d => d.properties.name);
    

    d3.json(`../../data/${data_obj.dataUrl}`).then(data => {

        const line = d3.line()
            .x(d => projection(d)[0])
            .y(d => projection(d)[1]);

        const pathElement = g.append("path")
            .datum(data)
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 0.5)
            .attr("stroke-dasharray", function() { return this.getTotalLength(); })
            .attr("stroke-dashoffset", function() { return this.getTotalLength(); });

        let progress = 0;
        const totalLength = pathElement.node().getTotalLength();
        point = pathElement.node().getPointAtLength(progress);
        let zoomLevel = 11;
        svg.transition()
            .duration(100)
            .call(zoom.transform, d3.zoomIdentity
                .translate(width / 2 - point.x * zoomLevel, height / 2 - point.y * zoomLevel)
                .scale(zoomLevel)
        );


        function animatePath() {
            pathElement.transition()
                .duration(10000)
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0)
                .on("start", function repeat() {
                    var point;
                    let interval = setInterval(() => {
                        progress += totalLength / 100;
                        if (progress >= totalLength) {
                            clearInterval(interval);
                            zoomOut(point); 
                            return;
                        }

                        point = pathElement.node().getPointAtLength(progress);

                        svg.transition()
                        .duration(200)
                        .ease(d3.easeCubicInOut)
                        .call(zoom.transform, d3.zoomIdentity
                            .translate(width / 2 - point.x * zoomLevel, height / 2 - point.y * zoomLevel)
                            .scale(zoomLevel)
                        );
                        
                    }, 100);
                });
        }

        function zoomOut(lastPoint) {
            let zoomLevel = 4;

            svg.transition()
                .duration(2000)
                .ease(d3.easeCubicInOut)
                .call(zoom.transform, d3.zoomIdentity
                    .translate(width / 2 - lastPoint.x * zoomLevel, height / 2 - lastPoint.y * zoomLevel)
                    .scale(zoomLevel)
                );
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animatePath();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 1 });

        observer.observe(svg.node());
    });
});
            