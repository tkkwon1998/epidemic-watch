import React, { Component } from 'react';
import './App.css';
import Chart from "react-google-charts";
import Tile from "./Tiles.js"

class Maps extends Component {

    state = {       // State to hold JSON data
        items: [],
        isLoaded: false,
    }

    /**
     * Fetches data from API and loads state.
     */
    componentDidMount() {
        fetch('https://covidtracking.com/api/us')
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

        var idxToDelete = [1,2,3];  // array of columns to delete

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

        array.unshift(['positive', 'deaths', 'total tested']);  // append headers

        console.log(array);

        
        return (
            <div id="stats">
                <Tile
                    link=""
                    image=""
                    title="hello"
                    category=""
                />
            </div>
        )
    }
}

export default Maps;