import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import AvailableCars from './components/AvailableCars/AvailableCars';
import MyBookedCars from './components/MyBookedCars/MyBookedCars';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import AddNewCar from './components/AddNewCar/AddNewCar';
import ListedCars from './components/MyListedCars/ListedCars';
import CarState from './context/cars/CarState';
import ViewBookedCars from './components/ViewBookedCars/ViewBookedCars';


function App() {
  return (
    <>
      <CarState>
            <Router>
              <Navbar />
              <Routes>
                <Route exact path="/" element={<AvailableCars />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/availablecars" element={<AvailableCars />} />
                <Route exact path="/mybookedcars" element={<MyBookedCars />} />
                <Route exact path="/addnewcar" element={<AddNewCar />} />
                <Route exact path="/listedcars" element={<ListedCars />} />
                <Route exact path="/viewbookedcars" element={<ViewBookedCars />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
              </Routes>
            </Router>
      </CarState>
    </>
  );
}

export default App;
