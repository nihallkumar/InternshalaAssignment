import React, { useContext, useEffect, useRef, useState } from 'react'
import CarContext from './../../context/cars/CarContext'
import CarItem from './CarItem';
import { useNavigate } from 'react-router-dom';


function ViewBooked() {
  const context = useContext(CarContext);
  const { cars, myBookedCars } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
    else {
      myBookedCars();
    }
  }, [])

  return (
    <>
      <div className="container">
        <div className='row my-3'>
          {cars.length === 0 && 'No Cars To Display'}
          {cars.map((car) => {
            return <CarItem car={car} key={car._id} />
          })}
        </div>
      </div>
    </>
  )
}

export default ViewBooked