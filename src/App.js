import React from 'react';
//import ReactDOM from 'react-dom';
import TaskList from './components/TaskList';
//import { CookiesProvider } from 'react-cookie';
//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
/*
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}*/


function Welcome(props){
  return(
    <div> 
      <h1>{props.name}</h1>
    </div>
  );
}

function App() {
  //setInterval(tick, 1000);
  return (
    <div className="App">
      <Welcome name="Nic's Task List" />
      <TaskList />
    </div>
  );
}

export default App;