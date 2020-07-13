import React, { Component } from 'react'
//import { Button, Form, ListGroup, Dropdown, Collapse } from 'react-bootstrap';
import { Button, Form, ListGroup } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
//import { withCookies, Cookies } from 'react-cookie';
import DateCountDownPicker from './DateCountDownPicker';

function elaspedTime(currentTime, taskTime){
	var diffTime = Math.round(Math.abs(taskTime - currentTime)/1000);
	return new Date(diffTime * 1000).toISOString().substr(11, 8);
}

function remainingTime(currentTime, deadlineTime){
	var diffTime = Math.round((deadlineTime - currentTime)/1000);
	if(diffTime < 0)
	{
		diffTime = 0;
	}
	return new Date(diffTime * 1000).toISOString().substr(11, 8);
}

function Task(props){
	return(
		<ol key=
		{props.count}>{props.name}: {props.timerCountDown.toLocaleTimeString()} 
		Time Elapsed:{elaspedTime(props.currentTime, props.timerCountDown)} 
		Remaining Time: {remainingTime(props.currentTime, props.dateSetter)}
		</ol>
	);
}

class TaskList extends Component {
	constructor(props){
		super(props);
		this.state = 
			{
				currentTime: new Date(),
				tasks: [],
				nameInput: "",
				dateSetter: new Date(),
				min: 5
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
		if(this.state.nameInput != ""){
			
			const taskListArr = this.state.tasks;

			console.log(this.state.min);

			const newCountDownDate = new Date((new Date()).getTime() + this.state.min*60000);

			taskListArr.push({name: this.state.nameInput, timerCountDown: new Date(), count:1, dateSetter: newCountDownDate});
			this.setState(
				{nameInput:""}
			)
		}
	}

	RemoveTask(props){
		this.state.tasks.splice(props.taskIndex, 1);
		this.setState({
			tasks: this.state.tasks
		});
	}

	handleChange(event) {
    	this.setState({nameInput: event.target.value});
  	}

  	onChange = dateSetter => this.setState(
  		{
  			dateSetter
  		}
	);

	getMinute = min => this.setState(
		{
			min
		}
	);

	render(){
		const taskObj = this.state.tasks;
		//const names = ["This Task", "That Task"]
		const list = taskObj.map((element, index)=>{
			return(
				<ListGroup.Item key={index}>
				<Task name={element.name} timerCountDown={element.timerCountDown} count={index+1} currentTime={this.state.currentTime} dateSetter={element.dateSetter} />
				<Button variants="primary" onClick={()=>this.RemoveTask({taskIndex:index})}>X</Button>
				</ListGroup.Item>
			);
		});


		return (
			<div>				
				<h1>{this.state.currentTime.toLocaleTimeString()}</h1>
				<Form>
					<Form.Group>
						<Form.Label>Task Name:</Form.Label>
						<Form.Control width="20px" istype="text" placeholder="Enter New Task" value={this.state.nameInput} onChange={this.handleChange.bind(this)} />
					</Form.Group>

					<Form.Group>
						<h5>Time Deadline</h5>
						<DateTimePicker onChange={this.onChange} value={this.state.dateSetter} />
					</Form.Group>

				</Form>

				<DateCountDownPicker getMinute = {this.getMinute} />

				<Button variants="primary" onClick={()=>this.AddTask()}>Add Task</Button>
				<ListGroup>
					{list}
				</ListGroup>
			</div>
		);
		
	}
}

export default TaskList