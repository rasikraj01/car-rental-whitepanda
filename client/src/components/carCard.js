import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEyeDropper, faMale } from '@fortawesome/free-solid-svg-icons'


import BookNowButton from './bookNowButton';
import '../scss/car-card.scss';

function CarCard(props) {
    let id = props.car._id.toString()
    return (
        <div className="car-card">
            <figure>
                <img src={props.car.imageUrl} alt="car"/>
            </figure>
            <div className="brief">
                <h3>{props.car.carName}</h3>
                <div className="color">
                    <FontAwesomeIcon icon={faEyeDropper}/>
                    <span>{props.car.color}</span>
                </div>
                <div className="max-capacity">
                    <FontAwesomeIcon icon={faMale}/>
                    <span>{props.car.maxCapacity} Seater</span>
                </div>
            </div>
            <div className="rent">
                {!(props.list) && <span>Rent per Day : </span>} &#8377; {props.car.rent}
            </div>
            <BookNowButton id={id} isBooked={(props.car.isBooked)}/>

            {
                props.list && 
                <Link to={'/details/' + id} className="details-link"><button>Details</button></Link>
            }
        </div>
  );
}

export default CarCard;