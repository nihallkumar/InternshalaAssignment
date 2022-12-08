import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://easy-rent.onrender.com/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: credentials.username, password: credentials.password })
        });
        const json = await response.json();
        if(json.success)
        {
            localStorage.setItem('token',json.token)
            navigate("/availablecars");
        }
        else
        {
            alert(json.error)
            setCredentials({ username: '', password: '' });
        }
    }

    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }


    return (
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-md-5 login">
                    <h3 className='login-header'>Login to Continue</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                            <input type="text" onChange={onChange} name="username" value={credentials.username} className="form-control" id="exampleInputEmail1" placeholder='jacobsingh' minLength={1} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" onChange={onChange} name="password" value={credentials.password} className="form-control" id="exampleInputPassword1" placeholder='Password' minLength={1} required/>
                        </div>
                        <button type="submit" className="btn btn-primary col-md-3">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login