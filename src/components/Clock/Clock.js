import React, { Component } from 'react';
import { Link } from "react-router-dom";

function Task(props){
	return(
		<li>{props.name} ({props.count}): {props.timerCountDown.toLocaleTimeString()}</li>
	);
}

class Clock extends Component{
	constructor(props){
		super(props);
		this.state = {date: new Date(), name:"Task", count:0};
	}

	componentDidMount(){
		this.timerID = setInterval(
			()=> this.tick(), 1000
		);
	}

	componentWillUnmount(){
		clearInterval(this.timerID);
	}

	tick(){
		this.setState({
			date: new Date(), count:this.state.count+1
		});
	}

	render(){
		return(
			<div>
				<div>
					<h1>Hello</h1>
					<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
				</div>
				<div>
						<Task name={this.state.name} timerCountDown={this.state.date} count={this.state.count} /> 
				</div>
			</div>
		);
	}
}

export default Clock