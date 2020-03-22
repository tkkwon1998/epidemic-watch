import React from 'react'; // Import the Component component from React
import {Link} from 'react-router-dom'; // Import the Link component
import './App.css';
 
function Tile(props) {
  return (
    <div className="tile">
        <Link to={props.link}>
            <div className="project-title">{props.title}</div>
            <div className="project-category">{props.category}</div>
        </Link>
    </div>
  );
}
 
export default Tile;