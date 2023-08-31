import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';

const Register = () => {
    const [account, setAccount] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setAccount({...account, [name]: value});
    };

    const register = () => {
        axios.post("http://45.117.179.204:8080/register", account)
            .then(data => {
                navigate('/login');
            })
            .catch(function (err) {
                console.log(err)
            });
    }
    return (

        <section className="vh-100">
            <div className="container h-100">
                <div className="row h-100">
                    <h1>Register</h1>
                    <div className="col-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                             className="img-fluid" alt="Phone image"/>
                    </div>
                    <div className="col-5">
                        <form>
                            <div className="form-outline mb-4">
                                <input type="email" name="username" onChange={handleInputChange} id="form1Example13"
                                       className="form-control form-control-lg"/>
                                <label className="form-label" htmlFor="form1Example13">Username</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input name="password" type="password" onChange={handleInputChange} id="form1Example23"
                                       className="form-control form-control-lg"/>
                                <label className="form-label" htmlFor="form1Example23">Password</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input name="bio" type="text" onChange={handleInputChange} id="form1Example23"
                                       className="form-control form-control-lg"/>
                                <label className="form-label" htmlFor="form1Example23">Bio</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input name="avatar" type="text" onChange={handleInputChange} id="form1Example23"
                                       className="form-control form-control-lg"/>
                                <label className="form-label" htmlFor="form1Example23">Avatar</label>
                            </div>

                            <div className="d-flex justify-content-around align-items-center mb-4">
                                <Link to="/login">
                                    <a href="#!">Quay lại login</a>
                                </Link>
                            </div>

                            <button type="button" onClick={register} className="btn btn-primary btn-lg btn-block">Register
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Register;
