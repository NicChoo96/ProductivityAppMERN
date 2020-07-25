import React, { Component, useState } from 'react'
import { Button, Form, ListGroup, Collapse } from 'react-bootstrap';
import { Link } from "react-router-dom";
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
	const [open, setOpen] = useState(false);
	let alertStyling = "";

	if(Math.round((props.end_date - props.currentTime)/1000) <= 0)
		alertStyling = "red";
	else
		alertStyling = "white";

	return(

		<ListGroup.Item key={props.key} style={{background:alertStyling}} onMouseEnter={() => setOpen(!open)}
          onMouseLeave={() => setOpen(!open)}>
          {props.name}:Remaining Time: {remainingTime(props.currentTime, props.end_date)}
			<Collapse in={open}>
				<div>
					<p>Time Created: {props.created_date.toLocaleTimeString()}</p>
					<p>Time Elapsed: {elaspedTime(props.currentTime, props.created_date)}</p>
				</div>
			</Collapse>
		</ListGroup.Item>
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
		fetch('http://localhost:4000/tasklist/')
			.then(response => response.json())
			.then(data => this.setState({tasks: data}));
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

			const endDate = new Date((new Date()).getTime() + this.state.min*60000);

			const newTask = {
				"task_name": this.state.nameInput, "task_created_date": new Date(), "task_end_date": endDate
			};

			taskListArr.push({task_name: this.state.nameInput, task_created_date: new Date(), count:1, task_end_date: endDate});

			fetch('http://localhost:4000/tasklist/add', {
				method: 'post',
				headers: {
			      'Content-Type': 'application/json'
			    },
				body: JSON.stringify(newTask)
			})
				.then(response => console.log(response.json()));

			this.setState(
				{
					nameInput:"",
					tasks: taskListArr
				}
			)
		}
	}

	RemoveTask(props){
		this.state.tasks.splice(props.taskIndex, 1);
		this.setState({
			tasks: this.state.tasks
		});
		fetch('http://localhost:4000/tasklist/archive/'+props.key, {
				method: 'post'
			}).then(response => console.log(response.json()));
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
		const list = taskObj.map((task, index)=>{
			if(!task.archiveStatus)
				return(
					<div className="taskItem">
						<Task key={task._id} name={task.task_name} created_date={new Date(task.task_created_date)} count={index+1} currentTime={this.state.currentTime} end_date={new Date(task.task_end_date)} />
						<Button variants="primary" onClick={()=>this.RemoveTask({taskIndex:index, key:task._id})}>Archive</Button>
					</div>
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