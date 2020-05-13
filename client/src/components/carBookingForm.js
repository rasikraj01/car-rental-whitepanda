import React, {useState} from 'react';
import {useHistory, useParams, Link} from 'react-router-dom';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import Modal from 'react-modal';
import moment from 'moment';
import axios from 'axios';

import {useSelector, useDispatch} from 'react-redux';
import {booking} from '../actions/booking';
import DatePicker from "./datePicker";

import logo from '../imgs/logo.png';
import done from '../imgs/done.png';

import '../scss/car-booking-form.scss';
import "react-datepicker/dist/react-datepicker.css";

// modal formating
Modal.defaultStyles.overlay.backgroundColor = '#00000080';
const customModalStyles = {
	content : {
		top : '50%',
		left : '50%',
		transform : 'translate(-50%, -50%)',
		background : `url(${done})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat'
	}
  }

function CarBookingForm() {

	let [showModal, setShowModal] = useState(false)

	let history = useHistory();
	let {id} = useParams()

	const car = useSelector(state => state.BookingReducer.filter((car) => car._id == id))[0]
	const dispatch = useDispatch()

	const toPreviousRoute = () => {
		history.goBack()
	}

	return (
		<div className="car-booking-form-container">
			{(car !== undefined) ? 
				<div className="car-booking-form">
				<div className="heading">
					<h1>Booking Details</h1>
					<img src={logo} alt="logo"/>
				</div>

				{
					!(car.isBooked) && <Formik
					initialValues={{name : "", phoneNumber: "", issueDate: "", returnDate: ""}}
					validate={async (values) => {
						let errors = {}
						

						// chcek if name contains any number
						if((/\d/.test(values.name))){
							errors.name = `Name can't contain numbers`
						}

						// checks if valid phone number
						if(!(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}$/.test(values.phoneNumber))){
							errors.phoneNumber = 'Enter a valid Indian phone number'
						}

						// checks if issue date is not in past
						if(values.issueDate < Date.now()){
							errors.issueDate = 'Invalid Issue Date'
						}
						
						// checks if return date is after issue date
						if (values.returnDate < values.issueDate){
							errors.returnDate = 'Invalid Return Date'
						}

						// checks if fields are not empty
						if(!values.name){
							errors.name = 'Name is required'
						}
						if(!values.phoneNumber){
							errors.phoneNumber = 'Phone number is required'
						}
						if(!values.issueDate){
							errors.issueDate = 'Issue date is required'
						}
						if(!values.returnDate){
							errors.returnDate = 'Return date is required'
						}
						
						return errors
					}}
					onSubmit={(data) => {
						data.issueDate = moment(data.issueDate).format('YYYY-MM-DD')
						data.returnDate = moment(data.returnDate).format('YYYY-MM-DD')
						// data = JSON.stringify(data)
						if(car.isBooked == false){
							axios.patch(`/api/car/${id}/book/`, data ).then((response) => {
								console.log(response);
								
								dispatch(booking(response.data))
								setShowModal(true)
							}).catch((err) => {
								console.log(err)
							})
						}
					}}
				>
					{({values, errors, touched}) => (
						<Form>
							<div className="input-container">
								<label>Name</label><br/>
								<Field name="name" type="text" placeholder="Jon Doe"/>
								{errors.name && touched.name ? (<div className="error">{errors.name}</div>) : null}
							</div>
							<div className="input-container">
								<label>Phone Number</label><br/>
								<Field name="phoneNumber" type="text" placeholder="+91"/>
								{errors.phoneNumber && touched.phoneNumber ? (<div className="error">{errors.phoneNumber}</div>) : null}
							</div>
							<div className="input-container">
								<label>Issue Date</label><br/>
								<DatePicker name="issueDate" />
								{errors.issueDate && touched.issueDate ? (<div className="error">{errors.issueDate}</div>) : null}
							</div>
							<div className="input-container">
								<label>Return Date</label><br/>
								<DatePicker name="returnDate" />
								{errors.returnDate && touched.returnDate ? (<div className="error">{errors.returnDate}</div>) : null}
							</div>
							<div className="form-buttons">
								<button className="back" onClick={toPreviousRoute}>Back</button>
								<button className="submit" type="submit">Book Car</button>
							</div>
						</Form>
					)}
				</Formik>	
				}
					{(car.isBooked) && <p className="already-booked">This car is already Booked</p>}

					<Modal style={customModalStyles} isOpen={showModal}>
						{(car.isBooked) && 
							<div className="modal-content-container">
								<h3>Booking Confirmed !</h3>
								<p>You have Booked <span>{car.carName}</span></p>
								<p>For the duration 
									<span>
										{moment(car.bookingDetails[0].issueDate).format('DD/MM/YYYY')}
									</span>-
									<span>
										{moment(car.bookingDetails[0].returnDate).format('DD/MM/YYYY')}
									</span></p>
							</div>
						}
						<Link to='/'>Continue</Link>
					</Modal>
			</div>
			: <div className="car-booking-form">Loading...</div>}
		</div>
  );
}

export default CarBookingForm;