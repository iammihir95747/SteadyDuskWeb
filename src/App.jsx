import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Home  from './components/Home';
import About from './components/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './App.css';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Students from './Pages/Students';
import Homepage from './components/Homepage';
import Profile from './Auth/Profile';
import Services from './components/Services';



const App = () => {

    const [isshow, setIsshow] = useState(true);


    return (
        <Router>
            <div>
    
            {isshow && ( <Home />) }
            
                <Routes>
                <Route path="/" element={<Homepage />} />
                    <Route path="/Homepage" element={<Homepage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/Services" element={<Services />} />
                    <Route path="/Register" element={<Register setIsshow={setIsshow} />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path='/Students'  element={<Students />}/>
                </Routes>
                
            </div>
        </Router>
    );
};

export default App;