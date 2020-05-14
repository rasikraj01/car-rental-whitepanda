import React, {useState} from 'react';
import {useHistory, useParams, Link} from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import Modal from 'react-modal';
import moment from 'moment';
import axios from 'axios';

import {useSelector, useDispatch} from 'react-redux';
import {addBooking} from '../actions/booking';
import DatePicker from "./datePicker";

import validateForm from './validateForm';

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
						return await validateForm(values)
					}}
					onSubmit={(data) => {
						data.issueDate = moment(data.issueDate).format('YYYY-MM-DD')
						data.returnDate = moment(data.returnDate).format('YYYY-MM-DD')
						// data = JSON.stringify(data)
						if(car.isBooked == false){
							axios
								.post(`/api/car/${id}/book/`, data )
								.then((response) => {
									if(response.status === 200){
										dispatch(addBooking(response.data))
										setShowModal(true)
									}
								})
								.catch((err) => {
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
			: <div className="car-booking-form"><div className="loading">Loading...</div></div>}
		</div>
  );
}

export default CarBookingForm;