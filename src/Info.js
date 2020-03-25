import React, { Component } from 'react';
import './App.css';
import Chart from "react-google-charts";
import Tile from "./Tiles.js"
import { white } from 'color-name';

class Maps extends Component {

    state = {       // State to hold JSON data
        items: [],
        isLoaded: false,
    }

    /**
     * Fetches data from API and loads state.
     */
    componentDidMount() {
        fetch('https://covidtracking.com/api/us/daily')
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

        var idxToDelete = [0,1,3,4,5,6,7,8];  // array of columns to delete
        var counter = 22;

        for (var i = 0; i < array.length; i++) {    // loop to delete indices from array
            var temp = array[i];
            array[i] = [];
            for(var j = 0 ; j < temp.length ; j++){
                if(idxToDelete.indexOf(j) == -1)    // dont delete
                {   
                    array[i].push(counter);
                    counter = counter - 1;
                    array[i].push(temp[j]);
                }
            }
        }

        array.unshift(['Day', 'Cases']);  // append headers

        
        
        var spliced = array.slice(0, 57);   // get first 57 entries

        console.log(spliced);
        return (
            <div>
                <div id="graph-title" className="title">Number of Cases in US</div>
                <div id="graph" style={{ display: 'flex', maxWidth: 900 }}>
                    <Chart
                        width={1400}
                        height={625}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={ spliced }
                        options={{
                            sizeAxis: { minValue: 0, maxValue: 100 },
                            lineWidth: 10,
                            hAxis: {
                                textStyle:{color: '#FFF'},
                                title: "Days",
                            },
                            vAxis: {
                                textStyle:{color: '#FFF'},
                                title: "Cases",
                            },
                            backgroundColor: { fill:'transparent' , stroke: 2},
                            animation: {
                                duration: 1000,
                                easing: 'out',
                                startup: true
                            },
                            curveType: 'function',
                            legend: {
                                textStyle: {
                                    color: '#FFF',
                                }
                            }
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default Maps;