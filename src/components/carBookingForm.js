import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Formik, Field, Form} from 'formik';

function CarBookingForm() {

	let history = useHistory();
	let {id} = useParams()
	
	const toPreviousRoute = () => {
		history.goBack()
	}
	const onBookingFormSubmit = (e) => {
		e.preventDefault()
	}
	return (
		<div>
			<h1>Booking Details</h1>
			<img alt="logo"/>
			<Formik
				initialValues={{name : "", phoneNumber: "", issueDate: "", returnDate: ""}}
				validate={(values) => {
					let errors = {}
					
					// checks if fields are not empty
					if(!values.name){
						errors.name = 'name is required'
					}
					if(!values.phoneNumber){
						errors.phoneNumber = 'phone number is required'
					}
					if(!values.issueDate){
						errors.issueDate = 'issue date is required'
					}
					if(!values.returnDate){
						errors.returnDate = 'returnDate is required'
					}
					
					// chcek if name contains any number
					if((/\d/.test(values.name))){
						errors.name = `name can't contain numbers`
					}

					// checks if valid phone number
					if(!(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}$/.test(values.phoneNumber))){
						errors.phoneNumber = 'enter a valid indian phone number'
					}
					// checks if issue date is not in past
					if(values.issueDate < Date.now()){
						errors.issueDate = `Invalid Issue Date`
					}
					// checks if return date is after issue date
					if (values.returnDate < values.issueDate){
						errors.returnDate = 'invalid Return Date'
					}

					return errors
				}}
				onSubmit={(data) => {
					console.log(data)
				}}
			>
				{({values, errors, touched}) => (
					<Form>
						<Field name="name" type="text" placeholder="Jon Doe"/>
						{errors.name && touched.name ? (<div>{errors.name}</div>) : null}
						<Field name="phoneNumber" type="text" placeholder="+91"/>
						{errors.phoneNumber && touched.phoneNumber ? (<div>{errors.phoneNumber}</div>) : null}
						<Field name="issueDate" type="date" placeholder="DD/MM/YYYY"/>
						{errors.issueDate && touched.issueDate ? (<div>{errors.issueDate}</div>) : null}
						<Field name="returnDate" type="date" placeholder="DD/MM/YYYY"/>
						{errors.returnDate && touched.returnDate ? (<div>{errors.returnDate}</div>) : null}
						<button type="submit">BOOK NOW</button>
					</Form>
				)}
			</Formik>
				<button onClick={toPreviousRoute}>Back</button>
		</div>
  );
}

export default CarBookingForm;