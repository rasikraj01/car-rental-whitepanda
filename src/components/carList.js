import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import Header from './header';
import Footer from './footer';
import CarCard from './carCard';
import '../scss/car-list.scss';

function CarList() {
    const carList = useSelector(state => state.BookingReducer)

    return (
        <div>
            <Header/>
            <div className="car-list">
                <h2>Cars for rent</h2>
                <hr/>
                <div className="title">
                    <div>Car Details</div>
                    <div>RENT PER DAY</div>
                </div>
                {carList.map((car, index) => {
                    return <CarCard car={car} list={true}/>
                })}
            </div>
            <Footer/>
        </div>
  );
}

export default CarList;