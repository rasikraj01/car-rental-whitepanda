import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import CarCard from './carCard';

function CarList() {
    const carList = useSelector(state => state.BookingReducer)

    return (
        <div>
            {carList.map((car, index) => {
            	return <CarCard key={car.id} car={car}/>
            })}
        </div>
  );
}

export default CarList;