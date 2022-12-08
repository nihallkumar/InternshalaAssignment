import React from 'react';
import ViewBooked from './ViewBooked';

function MyBookedCars() {
  return (
    <div className='container'>
      <h1 className='my-3'>Cars Booked By Me</h1>
      <ViewBooked/>
    </div>
  )
}

export default MyBookedCars