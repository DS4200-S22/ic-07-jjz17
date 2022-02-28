/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do? 
// Creates an svg object on the hard-coded-bar div and set the dimensions
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// TODO: What does this code do?
// This code finds the maximum score in the d1 dataset and stores it in the maxY1 variable
let maxY1 = d3.max(data1, function(d) { return d.score; });

// TODO: What does each line of this code do? 
// This creates the y scale by establishing constaints for the domain and range
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// TODO: What does each line of this code do? 
// Creates an offset scale that is centered on each bar
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// TODO: What does each line of this code do?  
// Adds the y scale to the visualization
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// TODO: What does each line of this code do? 
// Adds the x scale to the visualization
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? 
// Adds a div to the hard-coded-bar div with attriute id: tooltip1 and class tooltip
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// TODO: What does each line of this code do?
// Creates the mouseover function
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// TODO: What does each line of this code do? 
// Creates the mousemove function
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? 
// Creates the mouseleave function
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// TODO: What does each line of this code do? 
// Selects the bar id divs and adds the data bars and adds the event listeners with appropriate functions 
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);




const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


d3.csv("data/barchart.csv").then((data2) => {

    console.log(data2); 

    // TODO: What does this code do?
    // This code finds the maximum score in the d2 dataset and stores it in the maxY2 variable
    let maxY2 = d3.max(data2, function(d) { return d.score; });

    // TODO: What does each line of this code do? 
    // This creates the y scale by establishing constaints for the domain and range
    let yScale2 = d3.scaleLinear()
                .domain([0,maxY2])
                .range([height-margin.bottom,margin.top]); 

    // TODO: What does each line of this code do? 
    // Creates an offset scale that is centered on each bar
    let xScale2 = d3.scaleBand()
                .domain(d3.range(data2.length))
                .range([margin.left, width - margin.right])
                .padding(0.2); 

    svg2.selectAll(".bar") 
    .data(data2) 
    .enter()  
    .append("rect") 
      .attr("class", "bar") 
      .attr("x", (d,i) => xScale2(i)) 
      .attr("y", (d) => yScale2(d.score)) 
      .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) 
      .attr("width", xScale2.bandwidth()) 
      .on("mouseover", mouseover2) 
      .on("mousemove", mousemove2)
      .on("mouseleave", mouseleave2);


    // TODO: What does each line of this code do?  
    // Adds the y scale to the visualization
    svg2.append("g")
      .attr("transform", `translate(${margin.left}, 0)`) 
      .call(d3.axisLeft(yScale2)) 
      .attr("font-size", '20px'); 

    // TODO: What does each line of this code do? 
    // Adds the x scale to the visualization
    svg2.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(xScale2) 
                .tickFormat(i => data2[i].name))  
        .attr("font-size", '20px'); 

});

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? 
// Adds a div to the hard-coded-bar div with attriute id: tooltip2 and class tooltip
const tooltip2 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip2") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// TODO: What does each line of this code do?
// Creates the mouseover function
const mouseover2 = function(event, d) {
  tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// TODO: What does each line of this code do? 
// Creates the mousemove function
const mousemove2 = function(event, d) {
  tooltip2.style("left", (event.x)+"px") 
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? 
// Creates the mouseleave function
const mouseleave2 = function(event, d) { 
  tooltip2.style("opacity", 0); 
}



