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
            return <div></div>
        }

        var array = items.map(function(item) {  // JSON to array conversion
            return Object.values(item);
          });

        var idxToDelete = [0,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];  // array of columns to delete

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

        
        
        var spliced = array.slice(0, 57);   // get first 57 entries

        var sw = window.screen.width;

        console.log(spliced);
        return (
            <div>
                <div id="graph-title" className="title">Cases by State</div>
                <div id="map" style={{ display: 'flex', maxWidth: 900 }}>
                    <Chart
                        width={sw * 0.7}
                        height={sw *0.4}
                        chartType="GeoChart"
                        data={ spliced }
                        options={{
                            sizeAxis: { minValue: 0, maxValue: 100 },
                            region: 'US',
                            resolution: 'provinces',
                            colorAxis: {colors: ['#fee8c8', '#fdbb84', '#e34a33']},
                            backgroundColor: { fill:'transparent' },
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default Maps;