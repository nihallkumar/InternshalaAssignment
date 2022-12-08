import React, { useContext, useEffect, useRef, useState } from 'react'
import CarContext from './../../context/cars/CarContext'
import BookedItems from './BookedItems';
import { useNavigate } from 'react-router-dom';


function Booked() {
  const context = useContext(CarContext);
  const { cars, viewBookedCars, } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      viewBookedCars();
    }
    else {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <div className="container">
        <div className='row my-3'>
          {cars.length === 0 && 'No Cars To Display'}
          {cars.map((car) => {
            return <BookedItems car={car} key={car._id} />
          })}
        </div>
      </div>
    </>
  )
}

export default Booked