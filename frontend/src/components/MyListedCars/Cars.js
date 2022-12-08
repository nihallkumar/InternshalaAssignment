import React, { useContext, useEffect, useRef, useState } from 'react'
import CarContext from './../../context/cars/CarContext'
import CarItems from './CarItems';
import { useNavigate } from 'react-router-dom';


function Cars() {
    const context = useContext(CarContext);
    const { cars, myCars, updateCar } = context;
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            myCars();
        }
        else {
            navigate('/login')
        }
    }, [])

    const [car, setCar] = useState({ id: '', ecapacity: '', erentPerDay: '' });
    const update = (currentCar) => {
        ref.current.click();
        setCar({ id: currentCar._id, ecapacity: currentCar.capacity, erentPerDay: currentCar.rentPerDay })
    }

    const onChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    }

    const handleClick = (e) => {
        e.preventDefault();
        updateCar(car.id, car.ecapacity, car.erentPerDay);
        refClose.current.click();
    }

    const ref = useRef(null)
    const refClose = useRef(null)

    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none   " data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Car</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 my-2">
                                    <div className="mb-3">
                                        <label htmlFor="capacity" className="form-label">Seating Capacity</label>
                                        <input type="number" className="form-control" onChange={onChange} value={car.ecapacity} name="ecapacity" id="ecapacity" placeholder='5' />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="rentPerDay" className="form-label"> Rent Per Day(₹)</label>
                                        <input type="number" className="form-control" onChange={onChange} value={car.erentPerDay} name="erentPerDay" id="erentPerDay," placeholder='700' />
                                    </div>
                                    <div className="modal-footer">
                                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" onClick={handleClick} className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className='row my-3'>
                    {cars.length === 0 && 'No Cars To Display'}
                    {cars.map((car) => {
                        return <CarItems car={car} updateCar={update} key={car._id} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Cars