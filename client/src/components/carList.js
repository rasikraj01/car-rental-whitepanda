import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {get_data} from '../actions/getInitialData';
import Header from './header';
import Footer from './footer';
import CarCard from './carCard';
import '../scss/car-list.scss';

function CarList() {
    const carList = useSelector(state => state.BookingReducer)


	// const dispatch = useDispatch()
	// useEffect(() => {

	// 	// update the store initially
	// 	axios
	// 		.get('/api/car/list')
	// 		.then((data)=>{
	// 			dispatch(get_data(data.data))
	// 		})
	// 		.catch( (err) => {
	// 			if(axios.isCancel(err)){
	// 				console.log('cancelled')
	// 			}else{
	// 				console.log(err);
	// 			}
	// 		})

	// }, [])

    return (
        <div>
            <Header/>
            <div className="car-list">
                <h2>Cars for rent</h2>
                <hr/>
                <div className="title">
                    <div className="title-detail">Car Details</div>
                    <div className="title-rent">RENT PER DAY</div>
                </div>
                {carList.map((car, index) => {
                    return <CarCard car={car} list={true} isBooked={car.isBooked} key={car._id}/>
                })}
            </div>
            <Footer/>
        </div>
  );
}

export default CarList;