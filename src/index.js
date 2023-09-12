import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./redux/login/store";
import {Provider} from "react-redux";
import ChangeStatusAccountOffline from "./service/ChangeStatusAccountOffline";
import stompPromise from "./service/ChatConfig";

const root = ReactDOM.createRoot(document.getElementById('root'));
const idUser =  parseInt(localStorage.getItem('id'));

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);


window.addEventListener("beforeunload", function (e) {
    ChangeStatusAccountOffline();
    stompPromise.then(client => {
        client.send("/gkz/isOnline", {}, JSON.stringify({idUser: idUser}));
    })
        .catch(error => {
            console.error('Error connecting to STOMP:', error);
        });
    localStorage.clear();
    // e.preventDefault();
    // e.returnValue = "hello";
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
