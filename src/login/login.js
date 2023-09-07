import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import LocationServer from "../service/LocationServer";
import {useDispatch} from "react-redux";

const Login = () => {
    const [account, setAccount] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setAccount({...account, [name]: value});
    };

    const login = () => {
        axios.post(LocationServer+"login", account)
            .then(data => {
                localStorage.setItem('AccountToken', JSON.stringify(data.data));
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('id', data.data.id);
                dispatch({ type: 'SET_DATA', payload: true });
                navigate('/');
            })
            .catch(function (err) {
                console.log(err)
            });
    }
    return (

        <section className="vh-100">
            <div className="container h-100">
                <div className="row h-100">
                    <h1>Login</h1>
                    <div className="col-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                             className="img-fluid" alt="Phone image"/>
                    </div>
                    <div className="col-5">
                        <form>
                            <div className="form-outline mb-4">
                                <input type="email" name="username" onChange={handleInputChange} id="form1Example13"
                                       className="form-control form-control-lg"/>
                                <label className="form-label" htmlFor="form1Example13">Email address</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input name="password" type="password" onChange={handleInputChange} id="form1Example23"
                                       className="form-control form-control-lg"/>
                                <label className="form-label" htmlFor="form1Example23">Password</label>
                            </div>

                            <div className="d-flex justify-content-around align-items-center mb-4">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="form1Example3"
                                           checked/>
                                    <label className="form-check-label" htmlFor="form1Example3"> Remember
                                        me </label>
                                </div>
                                <a href="#!">Forgot password?</a>
                            </div>

                            <button style={{margin:'40px'}} type="button" onClick={login} className="btn btn-primary btn-lg btn-block">Sign in
                            </button>
                            <Link to="/register">
                                <button type="button" className="btn btn-primary btn-lg btn-block">Register</button>
                            </Link>

                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Login;
