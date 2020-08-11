import React, { Component, useState } from 'react'
import { Button, Form, ListGroup, Collapse, Toast } from 'react-bootstrap';
import { Link } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';
import './TaskList.css';
//import { withCookies, Cookies } from 'react-cookie';
import DateCountDownPicker from '../DateCountDownPicker/DateCountDownPicker';
import Switch from '@material-ui/core/Switch';

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

function TestFetchApiData(){
	const link = 'https://api.data.gov.sg/v1/environment/air-temperature'
	fetch(link)
		.then(response => response.json())
		.then(data => console.log(data));
}

function Task(props){
	const [open, setOpen] = useState(false);
	let alertStyling = "";

	if(Math.round((props.end_date - props.currentTime)/1000) <= 0)
		alertStyling = "red";
	else
		alertStyling = "white";

	return(
		<Toast className="task-toast-wrapper">
			<Toast.Header key={props.key} style={{background:alertStyling}} onMouseEnter={() => setOpen(!open)}
	        onMouseLeave={() => setOpen(!open)}>
		        <p class="mr-auto task-id" >{props.name}</p>
		        <small>{remainingTime(props.currentTime, props.end_date)}</small>
        	</Toast.Header>
      		<Toast.Body>
			<Collapse in={open}>
				<div className="task-toast-desc-wrapper">
					<p>Time Created: {props.created_date.toLocaleTimeString()}</p>
					<p>Time Elapsed: {elaspedTime(props.currentTime, props.created_date)}</p>
				</div>
			</Collapse>
			<Button	variants="primary" onClick={()=>this.RemoveTask(props.taskIndex, props.key)}>Archive</Button>
			</Toast.Body>
		</Toast>
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
				min: 5,
				isDatePicker: false
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
		fetch('http://localhost:4000/tasklist/archive/'+props.key, {
				method: 'post'
			}).then(response => console.log("Task Archive Succesfully!"));
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

	toggleSwitch = isDatePicker => this.setState({
		isDatePicker
	}, ()=>console.log(this.state.isDatePicker));

	render(){
		const taskObj = this.state.tasks;
		//const names = ["This Task", "That Task"]

		return (
			<div>
				<h1>{this.state.currentTime.toLocaleTimeString()}</h1>
				<Form>
					<Form.Group>
						<Form.Label>Task Name:</Form.Label>
						<Form.Control width="20px" istype="text" placeholder="Enter New Task" value={this.state.nameInput} onChange={this.handleChange.bind(this)} />
					</Form.Group>

					<div className="time-pick-wrapper">
						<h5>Time Deadline <span><Switch size="small" checked={this.state.isDatePicker} onChange={this.toggleSwitch} /></span></h5>
						<DateTimePicker onChange={this.onChange} value={this.state.dateSetter} />
						<DateCountDownPicker style="color:white;" getMinute = {this.getMinute} />
					</div>
				</Form>
				<Button variants="primary" onClick={()=>this.AddTask()}>Add Task</Button>
				<div class="container task-wrapper col-md-12">
					{
					taskObj.map((task, index)=>{
						if(!task.archiveStatus)
							return(
								<Task key={task._id} taskIndex={index} name={task.task_name} 
								created_date={new Date(task.task_created_date)} count={index+1} 
								currentTime={this.state.currentTime} end_date={new Date(task.task_end_date)} />
							);
					})
					}
				</div>
			</div>
		);
		
	}
}

export default TaskList