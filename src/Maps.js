import React, { Component } from 'react';
import './App.css';
import Chart from "react-google-charts";

class Maps extends Component {

    state = {       // State to hold JSON data
        items: [],
        isLoaded: false,
    }

    /**
     * Fetches data from API and loads state.
     */
    componentDidMount() {
        fetch('https://covidtracking.com/api/states/daily')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    items: data,
                    isLoaded: true,
                })
            });
    }
    /**
     * Renders map using google chart
     *
     * @return {html} html to render.
     */
    render() {
        var { items, isLoaded } = this.state;

        if (!isLoaded) {   // Check if data is loaded
            return <div>Loading...</div>
        }

        var array = items.map(function(item) {  // JSON to array conversion
            return Object.values(item);
          });

        var idxToDelete = [0,3,4,5,7];  // array of indices to delete

        for (var i = 0; i < array.length; i++) {    // loop to delete indices from array
            var temp = array[i];
            array[i] = [];
            for(var j = 0 ; j < temp.length ; j++){
                if(idxToDelete.indexOf(j) == -1)    // dont delete
                {
                    array[i].push(temp[j]);
                }
            }
        }

        array.unshift(['State', 'Confirmed Cases', 'Tests Done']);  // append headers

        console.log(array);
        
        var spliced = array.slice(0, 57);   // get first 51 entries

        return (
            <div id="map" style={{ display: 'flex', maxWidth: 900 }}>
                <Chart
                    width={1000}
                    height={700}
                    chartType="GeoChart"
                    loader={<div>Loading Chart</div>}
                    data={ spliced }
                    options={{
                        sizeAxis: { minValue: 0, maxValue: 100 },
                        region: 'US',
                        resolution: 'provinces',
                        colorAxis: {colors: ['#edf8b1', '#7fcdbb', '#2c7fb8']},
                    }}
                />
            </div>
        )
    }
}

export default Maps;