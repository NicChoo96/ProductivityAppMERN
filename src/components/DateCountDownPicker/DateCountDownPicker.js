import React, { Component } from 'react'
//import { Button, Form, ListGroup, DropdownButton, Dropdown, Collapse } from 'react-bootstrap';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import "./DateCountDownPicker.css"

class DateCountDownPicker extends Component {
	constructor(props){
		super(props);
		this.state = {
			min: 5,
			timeInMinutes: []
		};
		this.handleChange = this.handleChange.bind(this);
		for(var i = 1; i <= 60; i++){
			this.state.timeInMinutes.push(i);
		}
	}

	handleChange(value){
		this.setState({min: value});
		this.props.getMinute(value);
	}

	render(){

		return(
			<DropdownButton id="dropdown-item-button" title={this.state.min+" min"} onChange={this.handleChange} >
				{
					this.state.timeInMinutes.map(minValue=>(
						<Dropdown.Item as="button" key={minValue} eventKey={minValue} onSelect={e => this.handleChange(e)}>{minValue}</Dropdown.Item>
					))
				}

			</DropdownButton>
		);
	}
}

export default DateCountDownPicker