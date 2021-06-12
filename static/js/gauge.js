//
//
//   UCSD Data Science and Visualization Bootcamp
//     Plotly Challenge
//
//     Kate Spitzer
//
//  This function receives the wash frequency of the current
//  the current study subject and renders a gauge chart using
//  Plotly pie chart functionality.
//
//  *********
//	NOTE: Code was located on the plotly.com community forum and
//  modified to render this chart
//	*********
//
//


function generateGauge(prediction) {

	// convert quality score to gauge value
	if (prediction == "Excellent") {
		var quality = 9;
		var result_text = "Great Job!";
		var result_color = "#7d0202";
	} else if (prediction == "Good") {
		var quality = 5.5;
		var result_text = "Not Bad!";
		var result_color = "#b30404";
	} else if (prediction == "Poor") {
		var quality = 2;
		var result_text = "Needs Some Work!";
		var result_color = "#f20505";
	} else {
		var quality = 0;
		var result_text = "";
		var result_color = "black";
	}

	// trig to calc meter point
	var degrees = 180 - (quality*18);
   	var radius = .5;
	var radians = degrees * Math.PI / 180;
	var x = radius * Math.cos(radians);
	var y = radius * Math.sin(radians);

	// Path: may have to change to create a better triangle
	var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
     	pathX = String(x),
     	space = ' ',
     	pathY = String(y),
     	pathEnd = ' Z';
	var path = mainPath.concat(pathX,space,pathY,pathEnd);

	// create data trace for our gauge chart
	var data = [{ type: 'category',
		x: [0], y:[0],
    	marker: {size: 28, color: "darkslategrey"},
    	showlegend: false,
    	hoverinfo: "none"},
  		{ values: [50/3, 50/3, 50/3, 50],
  			rotation: 90,
  			hoverinfo: "none",
			font: { family: "Raleway"},
  			text: ["Excellent", "Good", "Poor"],
  			textinfo: 'text',
  			textposition:'inside',      
			marker: {colors:["#7d0202", "#b30404", "#f20505", "rgba(255,0,0,0)"]},
  		hole: .5,
  		type: 'pie',
  		showlegend: false
	}];

	// define our chart layout
	var layout = {
		title: { text: result_text, font: { color: result_color, family: "Raleway"} },
  		shapes:[{
      		type: 'path',
      		path: path,
      		fillcolor: "darkslategrey",
      		line: {
        		color: "darkslategrey"
      		}
    	}],
  		height: 400,
  		margin: { t: 70, r: 0, l: 0, b: 0 },
  		xaxis: {type:'category',zeroline:false, showticklabels:false,
            showgrid: false, range: [-1, 1]},
  		yaxis: {type:'category',zeroline:false, showticklabels:false,
            showgrid: false, range: [-1, 1]},
		paper_bgcolor: "lightgrey",
		plot_bgcolor: "lightgrey"
	};


	// render the gauge chart in the gauge div
	// on our page
	Plotly.newPlot('gauge', data, layout);

}