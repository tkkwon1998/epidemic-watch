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
      <h1 className="title">COVID-19 MAP OF U.S.</h1>
          <div className="navigation-sub">                         
            <Link to="/epidemic-watch" className="item">Cases by State</Link>
            <Link to="/info1" className="item">About</Link>
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
