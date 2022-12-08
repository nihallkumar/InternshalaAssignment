import React, { useContext, useEffect } from 'react'
import CarContext from './../../context/cars/CarContext'


function BookedItems(props) {
    const context = useContext(CarContext);
    const { newUser, userByID } = context;
    const { car } = props;

    useEffect(() => {
        userByID(car.customer);
    }, [])


    return (
        <div className="col-md-3">
            <div className=" card my-2">
                <div className="card-body">

                    <p className="card-title"> <b> Vehicle Model :</b> {car.vehicleModel}</p>
                    <p className="card-text"> <b> Vehicle Number :</b> {car.vehicleNumber}</p>
                    <p className="card-text"> <b> Customer Name :</b> {newUser.name}</p>
                    <p className="card-text"> <b>Days :</b> {car.days}</p>
                    <p className="card-text"> <b> Start Date :</b> {car.startDate}</p>
                    <p className="card-text"> <b> Rent Per Day(₹) :</b> {car.rentPerDay}</p>
                </div>
            </div>
        </div>
    )
}

export default BookedItems