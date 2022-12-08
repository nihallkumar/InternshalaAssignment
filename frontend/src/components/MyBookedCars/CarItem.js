import React from 'react'

function CarItem(props) {

    const { car } = props;
    return (
        <div className="col-md-3">
            <div className=" card my-2">
                <div className="card-body">

                    <p className="card-title"> <b> Vehicle Model :</b> {car.vehicleModel}</p>
                    <p className="card-text"> <b> Vehicle Number :</b> {car.vehicleNumber}</p>
                    <p className="card-text"> <b>Days :</b> {car.days}</p>
                    <p className="card-text"> <b> Start Date :</b> {car.startDate}</p>
                    <p className="card-text"> <b> Rent Per Day(₹) :</b> {car.rentPerDay}</p>
                </div>
            </div>
        </div>
    )
}

export default CarItem