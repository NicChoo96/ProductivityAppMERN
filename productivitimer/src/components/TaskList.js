import React, { Component } from 'react'

function elaspedTime(currentTime, taskTime){
	var diffTime = Math.abs(taskTime - currentTime);
	return Math.round(diffTime/1000);
}

function Task(props){
	return(
		<ol key={props.count}>{props.name} ({props.count}): {props.timerCountDown.toLocaleTimeString()} Time Elapsed:{elaspedTime(props.currentTime, props.timerCountDown)} sec</ol>
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
				<div>
				<Task name={element.name} timerCountDown={element.timerCountDown} count={index+1} currentTime={this.state.currentTime} />
				</div>
			);
		});

		return (
			<div>
				<h1>{this.state.currentTime.toLocaleTimeString()}</h1>
				<button onClick={()=>this.AddTask()}>Add Task</button>
				{list}
			</div>
		);
		
	}
}

export default TaskList