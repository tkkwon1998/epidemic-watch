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
            return <div></div>
        }

        var array = items.map(function(item) {  // JSON to array conversion
            return Object.values(item);
          });

        var idxToDelete = [0,1,3,4,5,6,8];  // array of columns to delete
        var counter = 22;

        for (var i = 0; i < array.length; i++) {    // loop to delete indices from array
            var temp = array[i];
            array[i] = [];
            array[i].push(counter);
            counter = counter - 1;
            for(var j = 0 ; j < temp.length ; j++){
                if(idxToDelete.indexOf(j) == -1)    // dont delete
                {  
                    if (temp[j] == null) {
                        array[i].push(0);
                    }
                    else {
                        array[i].push(temp[j]);
                    }
                }
            }
        }

        array.unshift(['Day', 'Cases', "Deaths"]);  // append headers

        
        
        var spliced = array.slice(0, 57);   // get first 57 entries

        var sw = window.screen.width;

        console.log(spliced);
        return (
            <div>
                <div id="graph-title" className="title">Number of Cases in US</div>
                <div id="graph" style={{ display: 'flex', maxWidth: 900 }}>
                    <Chart
                        width={sw}
                        height={sw*0.4}
                        chartType="LineChart"
                        data={ spliced }
                        options={{
                            sizeAxis: { minValue: 0, maxValue: 100 },
                            lineWidth: 6,
                            hAxis: {
                                textStyle:{color: '#FFF'},
                                title: "Days since March 4th",
                                titleTextStyle: { color: '#FFF' },
                            },
                            vAxis: {
                                textStyle:{color: '#FFF'},
                                title: "Number of People",
                                titleTextStyle: { color: '#FFF' },
                                gridlineColor: '#FFF',
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