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
import {useSelector} from "react-redux";

const App = () => {
    const isLoggedIn = useSelector((state) => state.data);

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
