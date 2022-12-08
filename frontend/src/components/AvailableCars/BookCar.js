import React, { useContext } from 'react'
import CarContext from './../../context/cars/CarContext'

function BookCar(props) {
    const context = useContext(CarContext);
    const { car, book, user } = props;

    return (
        <div className="col-md-3">
            <div className=" card my-2">
                <div className="card-body">

                    <p className="card-title"> <b> Vehicle Model :</b> {car.vehicleModel}</p>
                    <p className="card-text"> <b> Vehicle Number :</b> {car.vehicleNumber}</p>
                    <p className="card-text"> <b> Seating Capacity :</b> {car.capacity}</p>
                    <p className="card-text"> <b> Rent Per Day(₹) :</b> {car.rentPerDay}</p>

                    {user.role === "customer" && <button className="btn btn-warning" onClick={() => { book(car) }}>Book</button>}
                </div>
            </div>
        </div>
    )
}

export default BookCar