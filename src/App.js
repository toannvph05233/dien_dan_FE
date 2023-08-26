// App.js
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreateProduct from "./product/CreateProduct";
import EditProduct from "./product/EditProduct";
import Products from "./product/Products";
import Home from "./page/home/Home";
import Login from "./login/login";


const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/create" element={<CreateProduct/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/edit" element={<EditProduct/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
