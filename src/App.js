import React from 'react';
//import ReactDOM from 'react-dom';
import TaskList from './components/TaskList/TaskList';
import Clock from './components/Clock/Clock';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import { CookiesProvider } from 'react-cookie';
//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Wall paper from: https://wallpapercave.com/w/wp2533041

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

function App() {
  //setInterval(tick, 1000);
  return (
  	<Router>
	    <div className="App">
	    	<h1>Nic's Task List</h1>
			<Link to="/" className="navbar-brand">Home</Link>
			<Link to="/Clock" className="navbar-brand">Clock App</Link>
	    	<Route path="/" exact component={TaskList} />
	    	<Route path="/clock" component={Clock} />
	    </div>
    </Router>
  );
}

export default App;
/*
  function onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
     
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data));

        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        })
 }
 constructor(props) {
        super(props);
        this.state = {todos: []};
    }
componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

 */