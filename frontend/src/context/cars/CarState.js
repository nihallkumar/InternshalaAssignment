import React, { useState } from "react";
import CarContext from "./CarContext";

const CarState = (props) => {

    const host = "http://localhost:5000";

    const carsinitial = [];
    const [cars, setCars] = useState(carsinitial)


    const userinitial = [];
    const [user, setUser] = useState(userinitial)

    const [newUser, setnewUser] = useState(userinitial)

    // MY CARS
    const myCars = async () => {
        const response = await fetch(`${host}/api/cars/mycars`, {
            method: 'GET',
            headers: {
                'token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        // console.log(json);
        setCars(json);
    }


    // USER DETAILS
    const userDetail = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        // console.log(json);
        setUser(json);
    }

    // ADD CAR
    const userByID = async (id) => {
        if (id) {
            const response = await fetch(`${host}/api/auth/getuserid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });
            const json = await response.json();
            // console.log(json);
            setnewUser(json);
        }
    }


    // MY BOOKED CARS
    const myBookedCars = async () => {
        const response = await fetch(`${host}/api/cars/mybookedcars`, {
            method: 'GET',
            headers: {
                'token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        // console.log(json);
        setCars(json);
    }

    // VIEW BOOKED CARS
    const viewBookedCars = async () => {
        const response = await fetch(`${host}/api/cars/viewbookedcars`, {
            method: 'GET',
            headers: {
                'token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        // console.log(json);
        setCars(json);
    }


    // AVAILABLE CARS
    const availableCars = async () => {
        const response = await fetch(`${host}/api/cars/availablecars`, {
            method: 'GET'
        });
        const json = await response.json();
        // console.log(json);
        setCars(json);
    }

    // CURRENT AVAILABLE CARS
    const current = async () => {
        const response = await fetch(`${host}/api/cars/current`, {
            method: 'GET'
        });
        const json = await response.json();
        // console.log(json);
        setCars(json);
    }

    // ADD CAR
    const addCar = async (vehicleModel, vehicleNumber, capacity, rentPerDay) => {

        const response = await fetch(`${host}/api/cars/addcar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({ vehicleModel, vehicleNumber, capacity, rentPerDay })
        });
        const car = await response.json();
        // console.log(car);
        setCars(cars.concat(car));
    }

    // DELETE CAR
    const deleteCar = async (id) => {

        const response = await fetch(`${host}/api/cars/deletecar/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        });
        const json = response.json();
        // console.log(json);

        // console.log("deleting car with id" + id);
        const newCars = cars.filter((car) => { return car._id !== id });
        setCars(newCars);
    }

    //BOOK CAR
    const bookCar = async (id, days, startDate) => {

        const response = await fetch(`${host}/api/cars/bookcar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({ days, startDate })
        });
        const json = response.json();

        const newCars = cars.filter((car) => { return car._id !== id });
        setCars(newCars)
    }


    //UPDATE CAR
    const updateCar = async (id, capacity, rentPerDay) => {

        const response = await fetch(`${host}/api/cars/updatecar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({ capacity, rentPerDay })
        });
        const json = response.json();
        // console.log(json)

        let newCars = JSON.parse(JSON.stringify(cars))

        for (let i = 0; i < cars.length; i++) {
            const element = cars[i];
            if (element._id === id) {
                newCars[i].capacity = capacity;
                newCars[i].rentPerDay = rentPerDay;
                break;
            }
        }
        setCars(newCars)
    }

    return (
        <CarContext.Provider value={{ cars, user, newUser, current, userDetail, userByID, addCar, deleteCar, updateCar, myCars, availableCars, bookCar, myBookedCars, viewBookedCars }}>
            {props.children}
        </CarContext.Provider>
    )
}

export default CarState;