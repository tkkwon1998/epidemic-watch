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
                                          
            <Link to="/" className="item">Map</Link>
            <Link to="/info" className="item">Info</Link>
  
          </div>
        </div>
  
        <div className="main-page">
          <Route exact path="/" component={Maps} />
          <Route path="/info" component={Info} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
