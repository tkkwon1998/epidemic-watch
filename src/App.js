import React from 'react';

import { BrowserRouter, Route, Link } from 'react-router-dom'; 
import Maps from './Maps.js'; 
import Info from './Info.js'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <div className="navigation">
          <div className="navigation-sub">                         
            <Link to="/epidemic-watch" className="item">Map</Link>
            <Link to="/info1" className="item">Info</Link>
          </div>
        </div>
  
        <div className="main-page">
          <Route exact path="/epidemic-watch" component={Maps} />
          <Route path="/info1" component={Info} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
