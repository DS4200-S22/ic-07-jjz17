/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 



const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


d3.csv("data/scatter.csv").then((data3) => {

    console.log(data3); 

    // Our first step to mapping data to pixels is to find the
    //  ranges for our x and y values

    // find max X
    let maxX = d3.max(data3, (d) => { return d.day; }); 
    console.log("Max x: " + maxX); 

    // find max Y 
    let maxY = d3.max(data3, (d) => { return d.score; }); 
    console.log("Max y: " + maxY); 

    // Now that we have our maxes we define scale functions that
    // map our data values (domain for the scale function) to our
    // pixel values (range for the scale function)

    let xScale = d3.scaleLinear() // linear scale because we have 
                                // linear data 
                    .domain([0, maxX])  // inputs for the function
                    .range([margin.left, width - margin.right]); 
                    // ^ outputs for the function 

    let yScale = d3.scaleLinear()
                .domain([0, maxY])
                .range([height - margin.bottom, margin.top]); 


    // now we can use these functions to map data values 
    // to pixel values
    console.log("Input 7, xScale output: " + xScale(7)); 
    console.log("Input: 95, yScale output: " + yScale(95)); 

    // Let's use these scales to append axes to our page

    // Add x axis to svg6  
    svg3.append("g") // g is a "placeholder" svg
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        // ^ moves axis to bottom of svg 
        .call(d3.axisBottom(xScale)) // built in function for bottom
                                    // axis given a scale function 
            .attr("font-size", '20px'); // set font size

    // Add y axis to svg6 
    svg3.append("g") // g is a "placeholder" svg
        .attr("transform", `translate(${margin.left}, 0)`) 
        // ^ move axis inside of left margin
        .call(d3.axisLeft(yScale)) // built in function for left
                                    // axis given a scale function 
        .attr("font-size", '20px'); // set font size

    svg3.selectAll("circle") 
        .data(data3)
        .enter()  
        .append("circle")
            .attr("cx", (d) => xScale(d.day)) // use xScale to return 
                                            // pixel value for given
                                            // datum 
            .attr("cy", (d) => yScale(d.score)) // use yScale to return 
                                            // pixel value for given
                                            // datum 
            .attr("r", 10) 
            .attr("class", "myFirstPlot");

    // add event listeners

    // on mouseover event, call mouseover function
    svg3.selectAll("circle")
    .on("mouseover", mouseover3)
    .on("mouseout", mouseout3)
    .on("mousemove", mousemove3)

});


/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? 
// Adds a div to the hard-coded-bar div with attriute id: tooltip2 and class tooltip
const tooltip3 = d3.select("#csv-scatter") 
                .append("div") 
                .attr('id', "tooltip3") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// TODO: What does each line of this code do?
// Creates the mouseover function
const mouseover3 = function(event, d) {
  tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}


const mouseout3 = function(event, d) { 
    tooltip3.style("opacity", 0); 
  }

// TODO: What does each line of this code do? 
// Creates the mousemove function
const mousemove3 = function(event, d) {
  tooltip3.style("left", (event.x)+"px") 
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
}
