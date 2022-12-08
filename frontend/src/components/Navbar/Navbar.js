import React, { useContext, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import CarContext from './../../context/cars/CarContext'


function Navbar() {
    const navigate = useNavigate();
    let location = useLocation();

    const context = useContext(CarContext);
    const { userDetail, user } = context;

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login');
    }

    useEffect(() => {
        userDetail()
    }, [])


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark" >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home">Easy Rent</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/availablecars" ? "active" : ""}`} aria-current="page" to="availablecars">Available Cars</Link>
                            </li>

                            {user.role === "customer" &&
                                <>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/bookedcars" ? "active" : ""}`} to="mybookedcars">My Booked Cars</Link>
                            </li>
                            </>
                            }

                            {user.role === "agent" &&
                                <>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/addnewcar" ? "active" : ""}`} to="addnewcar">Add New Car</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/listedcars" ? "active" : ""}`} to="listedcars">My Listed Cars</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/viewbookedcars" ? "active" : ""}`} to="viewbookedcars">View Booked Cars</Link>
                            </li>
                            </>
                            }
                        </ul>

                        {!localStorage.getItem('token') ? <form>
                            <Link className='btn btn-primary mx-2' to='/login'>Login</Link>
                            <Link className='btn btn-primary mx-2' to='/signup'>SignUp</Link>
                        </form> : <div className="btn btn-danger" onClick={handleLogout}>Logout</div>}

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar