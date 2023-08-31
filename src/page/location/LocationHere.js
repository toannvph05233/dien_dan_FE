import React, {useEffect, useState} from 'react';
import axios from "axios";

const LocationHere = () => {
    const [accounts, setAccounts] = useState([]);
    const [idUser, setIdUser] = useState(localStorage.getItem('id') != null ? parseInt(localStorage.getItem('id')) : 1);
    const [idFriend, setIdFriend] = useState(10);


    useEffect(() => {
        axios.get("http://45.117.179.204:8080/users/areas/" + idUser)
            .then(data => {
                setAccounts(data.data);
            })
            .catch(function (err) {
                console.log(err)
            });

    }, []);


    const handleChatFriend = (idFriend) => {
        setIdFriend(idFriend);
    }
    return (
            <div className="container-fluid p-0" style={{background: "cadetblue"}}>
                <section className="resume-section" id="about">
                    <div className="resume-section-content">
                        <section className="gradient-custom">

                            <div className="row">
                                <div className="col-10">

                                    <h5 className="font-weight-bold mb-3 text-center text-white">Người dùng gần bạn</h5>

                                    <div className="card mask-custom">
                                        <div className="card-body">

                                            <ul className="list-unstyled mb-0">
                                                {
                                                    accounts.map(account => {
                                                        return (
                                                            <li key={account.id} className="p-2 border-bottom"
                                                                style={{
                                                                    borderBottom: '1px solid rgba(255,255,255,.3) !important',
                                                                    background: idFriend === account.id ? '#0099FF' : 'none'
                                                                }}>
                                                                <a href="#!"
                                                                   className="d-flex justify-content-between">
                                                                    <div className="d-flex flex-row">
                                                                        <img
                                                                            src={account.avatar}
                                                                            alt="avatar"
                                                                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                                            width="50"/>
                                                                        <div className="pt-1">
                                                                            <p className="fw-bold mb-0"
                                                                               onClick={() => handleChatFriend(account.id)}>{account.username}</p>
                                                                            <p className="small ">{account.bio}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="pt-1">
                                                                        <p className="small mb-1">{Math.round(account.distance) + ' km'}</p>
                                                                        <span
                                                                            className="badge bg-danger float-end">1</span>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        )
                                                    })
                                                }

                                            </ul>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>
                </section>
                <hr className="m-0"/>
            </div>
    );
};

export default LocationHere;
