// App.js
import React from 'react';
import Home from "./page/home/Home";
import Chat from "./page/chat/Chat";
import LocationHere from "./page/location/LocationHere";
import Profile from "./page/profile/Profile";
import Login from "./login/login";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from "./register/register";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        let accountToken = localStorage.getItem('AccountToken');
        if (accountToken !== null){
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <div className="App">
            <Router>
                <Routes>
                    {isLoggedIn ? (
                        <Route path="/" element={<Home />}>
                            <Route path="/" element={<Chat />} />
                            <Route path="/location" element={<LocationHere />} />
                            <Route path="/profile/:userId" element={<Profile />} />
                        </Route>
                    ) : (
                        <Route path="/" element={<Navigate to="/login" />} />
                    )}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
