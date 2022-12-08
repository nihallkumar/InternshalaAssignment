import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [select, setSelect] = useState('Select')
    const handleSelect = (e) => {
        setSelect(e);
        setCredentials({ ...credentials, role: e });
    }

    const [credentials, setCredentials] = useState({ name: '', role: '', username: '', password: '', cpassword: '' });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.password !== credentials.cpassword) {
            alert("Password Didn't Matched");
        }
        else if (credentials.password === credentials.cpassword) {
            const response = await fetch(`https://easy-rent.onrender.com/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credentials.name, role: credentials.role, username: credentials.username, password: credentials.password })
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.token)
                navigate("/availablecars");
            }
            else {
                alert(json.error);
            }
        }
    }


    return (
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-md-5 signup">
                    <h3 className='signup-header'>SignUp to Easy Rent</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input type="text" className="form-control" onChange={onChange} name="name" id="name" placeholder='Jacob Singh' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Role</label>
                            <DropdownButton id="dropdown-basic-button" variant="warning" name="role" onSelect={handleSelect} title={select}>
                                <Dropdown.Item onSelect={handleSelect} value="agent" eventKey="agent">Agent</Dropdown.Item>
                                <Dropdown.Item onSelect={handleSelect} value="customer" eventKey="customer">Customer</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" onChange={onChange} name="username" id="username" placeholder='jacobsingh' aria-describedby="username" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={onChange} name="password" id="password" placeholder='Password' minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" onChange={onChange} name="cpassword" id="cpassword" placeholder='Confirm Password' minLength={5} required />
                        </div>
                        <button type="submit" className=" btn btn-primary submit-btn col-md-3" >SignUp</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup