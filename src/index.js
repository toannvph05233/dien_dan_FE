import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./redux/login/store";
import {Provider} from "react-redux";
import ChangeStatusAccountOffline from "./service/ChangeStatusAccountOffline";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);


window.addEventListener("beforeunload", function (e) {
   localStorage.clear();
    ChangeStatusAccountOffline();
    e.preventDefault();
    e.returnValue = "hello";
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
