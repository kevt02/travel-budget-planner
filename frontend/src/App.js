import React from 'react'
import Header from './components/Header'

import "./App.css";
import Sidebar from './components/Sidebar';
import LogIn from "./components/LogIn"; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Savings from './routes/Savings';
import Flights from './routes/Flights';
import Trains from './routes/Trains';
import Stays from './routes/Stays';




function App() {
    return (
        <>
            <BrowserRouter>
            {/* <Header /> */}
            <Sidebar />
                <Routes>
                    <Route path="/" element={<Home />} />
		    <Route path = "/" element = {<LogIn />} />
                    <Route path="/savings" element={<Savings />} />
                    <Route path="/flights" element={<Flights />} />
                    <Route path="/trains" element={<Trains />} />
                    <Route path="/stays" element={<Stays />} />
                </Routes>
            </BrowserRouter>

        </>

    )
}

export default App;