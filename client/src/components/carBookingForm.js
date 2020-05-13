import React, {useState} from 'react';
import {useHistory, useParams, Link} from 'react-router-dom';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import Modal from 'react-modal';
import moment from 'moment';

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

	const car = useSelector(state => state.BookingReducer.filter((car) => car.id == id))[0]
	const dispatch = useDispatch()

	const toPreviousRoute = () => {
		history.goBack()
	}

	return (
		<div className="car-booking-form-container">
			<div className="car-booking-form">
				<div className="heading">
					<h1>Booking Details</h1>
					<img src={logo} alt="logo"/>
				</div>

				{
					!(car.bookingDetails.isBooked) && <Formik
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
						if(car.bookingDetails.isBooked == false){
							data.id = car.id
							data.issueDate = moment(data.issueDate).format('DD/MM/YYYY')
							data.returnDate = moment(data.returnDate).format('DD/MM/YYYY')
							dispatch(booking(data))
							setShowModal(true)
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
					{(car.bookingDetails.isBooked) && <p className="already-booked">This car is already Booked</p>}

					<Modal style={customModalStyles} isOpen={showModal}>
						<div className="modal-content-container">
							<h3>Booking Confirmed !</h3>
							<p>You have Booked <span>{car.carName}</span></p>
							<p>For the duration <span>{car.bookingDetails.issueDate}</span>-<span>{car.bookingDetails.returnDate}</span></p>
						</div>
						<Link to='/'>Continue</Link>
					</Modal>
			</div>
		</div>
  );
}

export default CarBookingForm;