
import React from 'react'

import "./App.css";
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Savings from './routes/Savings';
import Flights from './routes/Flights';
import Trains from './routes/Trains';
import Stays from './routes/Stays';
import CreateAccount from './routes/CreateAccount';
import CreateAccountDetail from './routes/CreateAccountDetail';
import Preferences from './routes/Preferences';

function App() {
    return (
        <>
            <BrowserRouter>
            {/* <Header /> */}
            <Sidebar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/savings" element={<Savings />} />
                    <Route path="/flights" element={<Flights />} />
                    <Route path="/trains" element={<Trains />} />
                    <Route path="/stays" element={<Stays />} />
                    <Route path="/createaccount" element={<CreateAccount />} />
                    <Route path="/createaccountdetail" element={<CreateAccountDetail />} />
                    <Route path="/preferences" element={<Preferences/>}/>
                </Routes>
            </BrowserRouter>

        </>

    )
}

export default App