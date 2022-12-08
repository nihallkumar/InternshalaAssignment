import React, { useContext, useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import CarContext from './../../context/cars/CarContext'


function AddNewCar() {
  const context = useContext(CarContext);
  const { addCar } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])

  const [car, setCar] = useState({ vehicleModel: '', vehicleNumber: '', capacity: '', rentPerDay: '' });

  const onChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  }

  const handleClick = (e) => {
    // e.preventDefault();
    addCar(car.vehicleModel, car.vehicleNumber, car.capacity, car.rentPerDay);
    setCar({ vehicleModel: '', vehicleNumber: '', capacity: '', rentPerDay: '' });

    navigate("/listedcars");
  }


  return (
    <div className='container'>
      <div className="row justify-content-center">

        <div className="col-md-5 addnewcar">
          <h3 className='addnewcar-header'>Add New Car</h3>
          <form onSubmit={handleClick}>
            <div className="mb-3">
              <label htmlFor="vehicleModel" className="form-label">Vehicle Model</label>
              <input type="text" className="form-control" onChange={onChange} value={car.vehicleModel} name="vehicleModel" id="vehicleModel" minLength={1} required />
            </div>
            <div className="mb-3">
              <label htmlFor="vehicleNumber" className="form-label"> Vehicle Number</label>
              <input type="text" className="form-control" onChange={onChange} value={car.vehicleNumber} name="vehicleNumber" id="vehicleNumber" minLength={1} required />
            </div>
            <div className="mb-3">
              <label htmlFor="capacity" className="form-label">Seating Capacity</label>
              <input type="number" className="form-control" onChange={onChange} value={car.capacity} name="capacity" id="capacity" minLength={1} required />
            </div>
            <div className="mb-3">
              <label htmlFor="rentPerDay" className="form-label"> Rent Per Day(₹)</label>
              <input type="number" className="form-control" onChange={onChange} value={car.rentPerDay} name="rentPerDay" id="rentPerDay" minLength={1} required />
            </div>
            <button type="submit" className="btn btn-primary col-md-3 submit-btn">Add Car</button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default AddNewCar