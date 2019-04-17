import React, { Component } from "react";
import Request from "../../helpers/request"
import FormStepOne from './FormStepOne.js'
import FormStepTwo from './FormStepTwo.js';
import './BookingForm.css';


class BookingForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			startDate: "",
			endDate: "",
			notes: "",
			bookableItems: [],
			customer: "",
			stepOne: true,
			stepTwo: false,
			stepThree: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNewCustomer = this.handleNewCustomer.bind(this);
		this.showNext = this.showNext.bind(this);
		this.showPrev = this.showPrev.bind(this);
		this.stepThreePrev = this.stepThreePrev.bind(this);
	}

	handleNewCustomer(newCustomer){
		this.setState({customer: newCustomer._links.self.href})
	}

	handleChange(event){
		this.setState({[event.target.name]: event.target.value})
	}

	handleCheckboxChange(event){
		var newArray = this.state.bookableItems.slice();
		newArray.push(event.target.value);
		this.setState({bookableItems:newArray})
	}

	handleSubmit(event){
		event.preventDefault();
		const request = new Request();
		request.post('/api/customerBookings', this.state).then(() => {
			window.location = '/'
		})
	}

	showNext(currentStep){
		let stepOneDiv = document.getElementById("stepOne");
		let stepTwoDiv = document.getElementById("stepTwo");
		let stepThreeDiv = document.getElementById("stepThree");

		if(currentStep === 'stepOne'){
			this.setState({stepOne: false, stepTwo: true, stepThree: false});
			stepOneDiv.style.cssText="opacity: 0; display:none;";
			stepTwoDiv.style.cssText="opacity: 1; display:flex;";
		} else {
			this.setState({stepOne: false, stepTwo: false, stepThree: true});
			stepTwoDiv.style.cssText="opacity: 0; display:none;";
			stepThreeDiv.style.cssText="opacity: 1; display:flex;";
		}
	}

	showPrev(currentStep){
		let stepOneDiv = document.getElementById("stepOne");
		let stepTwoDiv = document.getElementById("stepTwo");
		let stepThreeDiv = document.getElementById("stepThree");

		if(currentStep === 'stepTwo'){
			stepTwoDiv.style.cssText="opacity: 0; display:none;";
			stepOneDiv.style.cssText="opacity: 1; display:flex;";
		} else {
			stepThreeDiv.style.cssText="opacity: 0; display:none;";
			stepTwoDiv.style.cssText="opacity: 1; display:flex;";
		}
	}

	stepThreePrev(event){
		event.preventDefault();
		this.showPrev("stepThree")
	}

	render(){
		return(
			<section id="new-booking-form">
			<h3>Add a New Booking</h3>

			<div className="current-selection">
				<p><strong>Start Date:</strong> {this.state.startDate}</p>
				<p><strong>End Date:</strong> {this.state.endDate}</p>
				<p><strong>Room/s:</strong> {this.state.bookableItems}</p>
				<p><strong>Customer:</strong> {this.state.customer}</p>
				<p><strong>Notes:</strong> {this.state.notes}</p>
			</div>

			<FormStepTwo
				bookableItems={this.props.bookableItems}
				customers={this.props.customers}
				showNext={this.showNext}
				showPrev={this.showPrev}
				handleChange={this.handleChange}
				handleNewCustomer={this.handleNewCustomer}/>

			<form onSubmit= {this.handleSubmit}>
				<FormStepOne
					handleChange={this.handleChange}
					handleCheckboxChange={this.handleCheckboxChange}
					showNext={this.showNext}
					bookableItems={this.props.bookableItems}/>

				<div id="stepThree">
					<label htmlFor="notes">Notes </label>
					<textarea name="notes" id="notes" cols="30" rows="10" onChange={this.handleChange}></textarea >
					<button className="prev" onClick={this.stepThreePrev}> &lt; Previous </button>
					<button type="submit">Save</button>
				</div>

			</form>

			</section>
		);
	}
}

export default BookingForm;
