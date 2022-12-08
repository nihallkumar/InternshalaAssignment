import React, { useContext, useEffect, useRef, useState } from 'react'
import CarContext from './../../context/cars/CarContext'
import { useNavigate } from 'react-router-dom';
import BookCar from './BookCar';


function Cars() {
    const context = useContext(CarContext);
    const { cars, availableCars, bookCar, userDetail, user } = context;
    const navigate = useNavigate();

    useEffect(() => {
        availableCars()
        userDetail();
    }, [])

    const [bookcar, setBookcar] = useState({ id: '', days: '', startDate: '' });

    const book = (currentCar) => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
        else {

            ref.current.click();
            console.log(bookcar)
            setBookcar({ id: currentCar._id, days: '', startDate: '' })
        }
    }

    const onChange = (e) => {
        setBookcar({ ...bookcar, [e.target.name]: e.target.value });
    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log(bookcar);
        bookCar(bookcar.id, bookcar.days, bookcar.startDate);
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
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Book Car</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 my-2">
                                    <div className="mb-3">
                                        <label htmlFor="capacity" className="form-label">For Days</label>
                                        <input type="number" className="form-control" onChange={onChange} value={bookcar.days} name="days" id="days" placeholder='5' />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="rentPerDay" className="form-label">Start Date</label>
                                        <input type="date" className="form-control" onChange={onChange} value={bookcar.startDate} name="startDate" id="startDate" placeholder='5' />
                                    </div>
                                    <div className="modal-footer">
                                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" onClick={handleClick} className="btn btn-primary">Book</button>
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
                        return <BookCar car={car} user={user} book={book} key={car._id} />
                    })}
                </div>
            </div>

        </>
    )
}

export default Cars