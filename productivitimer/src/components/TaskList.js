import React, { Component } from 'react'
import { Button, Form, ListGroup } from 'react-bootstrap';

function elaspedTime(currentTime, taskTime){
	var diffTime = Math.round(Math.abs(taskTime - currentTime)/1000);
	return new Date(diffTime * 1000).toISOString().substr(11, 8);
}

function Task(props){
	return(
		<ol key={props.count}>{props.name} ({props.count}): {props.timerCountDown.toLocaleTimeString()} Time Elapsed:{elaspedTime(props.currentTime, props.timerCountDown)}</ol>
	);
}

class TaskList extends Component {
	constructor(props){
		super(props);
		this.state = 
			{
				currentTime: new Date(),
				tasks: []
			};
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
		this.setState(
			{currentTime: new Date()}
		)
	}

	AddTask(props){
		const taskListArr = this.state.tasks;
		taskListArr.push({name: "New Task", timerCountDown: new Date(), count:1});
		console.log(this.state.tasks);
		this.setState(
			{currentTime: new Date()}
		)
	}

	render(){
		const taskObj = this.state.tasks;
		//const names = ["This Task", "That Task"]
		const list = taskObj.map((element, index)=>{
			return(
				<ListGroup.Item>
				<Task name={element.name} timerCountDown={element.timerCountDown} count={index+1} currentTime={this.state.currentTime} />
				</ListGroup.Item>
			);
		});

		return (
			<div>
				<h1>{this.state.currentTime.toLocaleTimeString()}</h1>
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Task Name:</Form.Label>
						<Form.Control type="text" placeholder="Enter New Task" />
					</Form.Group>
					<Button variant="primary" onClick={()=>this.AddTask()}>Add Task</Button>
				</Form>
				<ListGroup>
				{list}
				</ListGroup>
			</div>
		);
		
	}
}

export default TaskList