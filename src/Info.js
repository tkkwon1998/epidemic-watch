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
        fetch('https://api.covidtracking.com/v1/us/daily.json')
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

        var idxToDelete = [0,1,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20,21,22,23,24];  // array of columns to delete
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

        array.unshift(['Cases','Date']);  // append headers

        
        
        var spliced = array.slice(0, 57);   // get first 57 entries

        var sw = window.screen.width;

        console.log(spliced);
        return (
            <div>
                <div id="graph-title" className="title">About</div>

                <div id="about" className="title">All data taken from <a href="https://covidtracking.com/">The Covid Tracking Project API</a>.</div>
                <div id="about" className="title">Github repo can be found <a href="https://github.com/tkkwon1998/epidemic-watch">here</a>.</div>            
            </div>
        )
    }
}

export default Maps;