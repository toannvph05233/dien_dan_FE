import React from 'react';
import {useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ChangeStatusAccountOffline from "../../service/ChangeStatusAccountOffline";


const Home = () => {
    const [accountToken, setAccountToken] = useState(JSON.parse(localStorage.getItem('AccountToken')));
    const isLoggedIn = useSelector((state) => state.data);
    const dispatch = useDispatch();

    const handleIsLoggedIn = () => {
        dispatch({ type: 'SET_DATA', payload: false });
        ChangeStatusAccountOffline();
        localStorage.clear();
    };

    return (
        <div id="page-top">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
                <a className="navbar-brand js-scroll-trigger" href="#page-top">
                    <span className="d-block d-lg-none">Clarence Taylor</span>
                    <span className="d-none d-lg-block"><img
                        className="img-fluid img-profile rounded-circle mx-auto mb-2" src={accountToken.avatar}
                        alt="..."/></span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                        aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <Link to={`/profile/${accountToken.id}`}>
                            <li className="nav-item"><a className="nav-link js-scroll-trigger"
                                                        href="#about">{accountToken.username}</a></li>
                        </Link>
                        <Link to="/">
                            <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#skills">Home</a>
                            </li>
                        </Link>
                        <Link to="/location">
                            <li className="nav-item"><a className="nav-link js-scroll-trigger"
                                                        href="#experience">Tìm Quanh Đây</a></li>
                        </Link>
                        <li className="nav-item"><a className="nav-link js-scroll-trigger"
                                                    href="#education">Post</a></li>

                        {isLoggedIn ?
                            <li className="nav-item" onClick={handleIsLoggedIn}><a className="nav-link js-scroll-trigger"
                                                        href="#education">Logout</a></li>
                            :
                            <Link to="/login">
                                <li className="nav-item"><a className="nav-link js-scroll-trigger"
                                                            href="#experience">Login</a></li>
                            </Link>
                        }


                        {/*<li className="nav-item"><a className="nav-link js-scroll-trigger"*/}
                        {/*                            href="#interests">Interests</a></li>*/}
                        {/*<li className="nav-item"><a className="nav-link js-scroll-trigger" href="#awards">Awards</a>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </nav>

            <Outlet></Outlet>

            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
            <script src="/js/scripts.js"></script>
        </div>
    );
};

export default Home;
