// function to initialize page
function init() {

    // select dropdown menu
    var dropdown = d3.select("#selDataset");

    // read data using d3.json
    d3.json("samples.json").then((data) => {

        // iterate through "names" key to append id options to dropdown menu
        data.names.forEach(function(d) {
            dropdown.append("option").text(d).property("value");
        });

        // var samples = data.samples.filter(d => d.otu_ids)[0];
        // console.log("samples:", samples);

        // var topSamples = (samples.sample_values.slice(0, 10)).reverse();
        // console.log("top samples:", topSamples)

        // var topOTUs = (samples.otu_ids.slice(0, 10)).reverse();
        // console.log("top OTUs: ", topOTUs);

        // var OTUid = topOTUs.map(d => "OTU " + d);
        // console.log("OTU ids: ", OTUid);

        // var labels = samples.otu_labels.slice(0, 10);
        // console.log("labels: ", labels);

        // // bar chart of OTU samples
        // var trace1 = {
        //     x: topSamples,
        //     y: OTUid,
        //     type: "bar",
        //     orientation: "h",
        //     text: labels
        // };

        // var data1 = [trace1];

        // var layout1 = {
        //     title: "Top OTUs",
        //     yaxis: {tickmode: "linear"},
        //     // margin: {
        //     //     top: 100,
        //     //     bottom: 30,
        //     //     left: 100,
        //     //     right: 100
        //     // }
        // };

        // Plotly.newPlot("bar", data1, layout1);

        // // bubble chart
        // var trace2 = {
        //     x: samples.otu_ids,
        //     y: samples.sample_values,
        //     text: samples.otu_labels,
        //     mode: "markers",
        //     marker: {
        //         size: samples.sample_values,
        //         color: samples.otu_ids
        //     }
        // };

        // var data2 = [trace2];

        // var layout2 = {
        //     xaxis: {title: "OTU ID"},
        //     height: 600,
        //     width: 1000
        // };

        // Plotly.newPlot("bubble", data2, layout2);


        makePlot(data.names[0])
        getData(data.names[0]);
    });
};

function makePlot(value) {

    // read samples.json using d3
    d3.json("samples.json").then((data) => {
        console.log(data);

        // create variables for function references
        var sample = data.samples;
        var sampleResults = sample.filter(d => d.id.toString() === value);

        // create variables for samples.json metadata and print in console
        var samples = sampleResults.filter(d => d.otu_ids)[0];
        console.log("samples:", samples);

        var topSamples = (samples.sample_values.slice(0, 10)).reverse();
        console.log("top samples:", topSamples)

        var topOTUs = (samples.otu_ids.slice(0, 10)).reverse();
        console.log("top OTUs: ", topOTUs);

        var OTUid = topOTUs.map(d => "OTU " + d);
        console.log("OTU ids: ", OTUid);

        var labels = samples.otu_labels.slice(0, 10);
        console.log("labels: ", labels);

        // bar chart of OTU samples
        var trace1 = {
            x: topSamples,
            y: OTUid,
            type: "bar",
            orientation: "h",
            text: labels
        };

        var data1 = [trace1];

        var layout1 = {
            title: "Top OTUs",
            yaxis: {tickmode: "linear"},
        };

        Plotly.newPlot("bar", data1, layout1);

        // bubble chart
        var trace2 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            text: samples.otu_labels,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            }
        };

        var data2 = [trace2];

        var layout2 = {
            xaxis: {title: "OTU ID"},
            height: 600,
            width: 1000
        };

        Plotly.newPlot("bubble", data2, layout2);

    });
};

// function to fill metadata table with individual's id
function getData(id) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        console.log("metadata: ", metadata);

        var result = metadata.filter(d => d.id.toString() === id)[0];
        console.log("result: ", result);

        var demographic = d3.select("#sample-metadata");

        // append information to h5 tag in html file
        Object.entries(result).forEach((key) => {
            demographic.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
};


// function to get data and plots for each id in dropdown menu
function optionChanged(selectValue) {

    // select id sample-metadata to make changes to page
    var metaData = d3.select("#sample-metadata");
    // clear metadata panel information
    metaData.html("");

    // change plots and metadata panel based on name id
    makePlot(selectValue);
    getData(selectValue);
}


// initialize page
init();