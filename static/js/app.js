//
//
//   UCSD Data Science and Visualization Bootcamp
//


const idList = ["fixedacidity", "volatileacidity", "citricacid", "residualsugar", "chlorides", "freesulfurdi", "totsulfurdi", "density", "pH", "sulfates", "alcohol"];

/////////////////////////////////////////
// define the function to run on-click //
/////////////////////////////////////////
function runEnter() {

	// Prevent the page from refreshing
	d3.event.preventDefault();
  

	var errorText = "";
	var feature_str = "";
  
	// loop through each input field for filtering
	for (var i = 0; i < idList.length; i++) {
  
	  // Select the input element and get the raw HTML node
	  var inputElement = d3.select("#" + idList[i]);
  
		// Get the value property of the input element
		var inputValue = String(inputElement.property("value"));

		// make sure each input can be evaluated to floating point
		if (!isNaN(parseFloat(inputValue))) {
			// passed edits
			// save in parameter string
			feature_str = feature_str + parseFloat(inputValue) + "/";
		}
		else {
			// invalid input -- generate error message
			errorText = `${inputElement.property("name")} must be numeric.`;
			break;
		}	
	}
  
  
	// grab pointer to the error message area
	errorMsg = d3.select("#errorMsg");

	if (errorText.length > 0) {
		// there is text in our error message, display it
		errorMsg.classed("current_error", true);
		errorMsg.text(errorText);
	}
	else {
	  	// no errors -- clear any previous erros
		errorMsg.classed("current_error", false);	
		errorMsg.text("");

		// add the current input value to our api string
		var api_str = "predict/" + feature_str;

		// send input values to the model to predict
		Promise.all([
		d3.json(api_str)]).then((prediction) => {
			console.log(prediction[0]);
			
			// use response from prediction
			// to generate gauge chart
			generateGauge(prediction[0]);
		});
	}
  
}


///////////////////////////////////////////
// define function to clear input fields //
///////////////////////////////////////////
function clearFields() {

	console.log("clearing fields")

	// Prevent the page from refreshing
	d3.event.preventDefault();
  

	// loop through each input field
	for (var i = 0; i < idList.length; i++) {
  
		// Select the input element
		var inputElement = d3.select("#" + idList[i]);
  
		// clear field
		inputElement.property("value", "");
	}

	// clear error area
	errorMsg = d3.select("#errorMsg");
	errorMsg.text("");
	errorMsg.classed("current-error", false);

	generateGauge("none");
}


////////////////////////////////////////////////////////////////
// define function to redraw bar chart with current selection //
////////////////////////////////////////////////////////////////
function optionChanged(feature) {

	// read in feature units
	// and red wine bar chart summary
	d3.csv(unitFile).then((importedUnits) => {
		d3.csv(dataFile).then((importedData) => {

			console.log(`feature passed in: ${feature}`);

			// grab the values associated with the feature passed in
			// and set the quality values
			var feature_list = importedData.map(data => +data[feature]);
			var quality = importedData.map(data => data["quality_label"]);

			// grab the units associated with the feature passed in
			var feature_units = importedUnits.map(data => data[feature]);

			// set feature to title case for chart, unless it is pH
			if (feature != "pH") {
				var y_title = feature.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
			}
			else {
				var y_title = feature;
			}

			// add units to y-axis title
			y_title = y_title + ' ' + feature_units;
			console.log(`y-axis title: ${y_title}`)


			// create bar chart trace
			var trace1 = {
				x: quality,
				y: feature_list,
				type: "bar",
				orientation: "v",
				marker:{
					// color: ['#E06767', '#C94242', '#C70404', '#AB0303', '#8F0303', '#730202']
					color: ['#C94242', '#AB0303', '#730202']
				},

			};

			var data = [trace1];

			// create layout for bar chart
			var layout = {
				xaxis: {
					title: "Quality"
				},
				yaxis: {
					title: `${y_title}`
				},
				showlegend: false
			};

			//  Plotting the bar graph bar targeting the bar id
			Plotly.newPlot("bar", data, layout);
		});
		
	});

}


////////////////
// BEGIN MAIN //
////////////////
var dataFile = "./static/data/barchart_data.csv";
var unitFile = "./static/data/bar_desc.csv";

// initialize bar chart
optionChanged("fixed acidity");

// initialize wine quality gauge
generateGauge("none");


// getting a reference to the buttons on the page
var submitButton = d3.select("#submit-test");
var clearButton = d3.select("#clear-fields");
	
// create event handlers for clicking the buttons
submitButton.on("click", runEnter);
clearButton.on("click", clearFields);

