import React from 'react';
//import logo from './logo.svg';
import './App.css';

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

function Welcome(props){
  return(
    <div> 
      <h1>{props.name}</h1>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Welcome name="Welcome to Learning new React!" />
    </div>
  );
}

export default App;
