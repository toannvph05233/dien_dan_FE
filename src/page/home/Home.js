import React from 'react';
import {useRef, useEffect} from 'react';
import {useState} from 'react';
import axios from "axios";
import stompPromise from "../../service/ChatConfig";
import LocationService from "../../service/LocationService";

const Home = () => {
    const listRef = useRef(null);
    const [accounts, setAccounts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState({});
    const [idFriend, setIdFriend] = useState(10);
    const [idUser, setIdUser] = useState(localStorage.getItem('id') != null ? parseInt(localStorage.getItem('id')) : 1);
    const [room, setRoom] = useState({});
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isChatAll, setIsChatAll] = useState(true);
    const [accountToken, setAccountToken] = useState(JSON.parse(localStorage.getItem('AccountToken')));


    useEffect(() => {
        LocationService();
        stompPromise
            .then(client => {
                setStompClient(client);
                setIsConnected(true);

            })
            .catch(error => {
                console.error('Error connecting to STOMP:', error);
            });
    }, []);


    useEffect(() => {
        let subscription = null;

        if (stompClient && isConnected && idFriend) {
            if (subscription) {
                subscription.unsubscribe();
            }

            subscription = stompClient.subscribe('/topic/' + idUser, function (chat) {
                let message = JSON.parse(chat.body);
                if ((message.chat.roomChat.id === 8 && idFriend === 10) ||
                    (message.idFriend === idUser && idFriend !== 10) ||
                    (message.idUser === idUser && idFriend !== 10)) {
                    setMessages(prevMessages => [...prevMessages, message.chat]);
                }
            });
        }

        axios.get("http://localhost:8080/users/" + idUser)
            .then(data => {
                setAccounts(data.data);
            })
            .catch(function (err) {
                console.log(err)
            });

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [stompClient, isConnected, idFriend]);


    useEffect(() => {
        scrollToBottom();
    }, [messages])


    useEffect(() => {
        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [stompClient]);


    useEffect(() => {
        async function init() {
            if (isChatAll) {
                axios.get("http://localhost:8080/chats/" + 8)
                    .then(data => {
                        setMessages(data.data);
                        setMessage({message: '', idFriend, idUser, room: {id: 8}})
                    })
                    .catch(function (err) {
                        console.log(err)
                    });
            } else {
                let dataRoom = await axios.get(`http://localhost:8080/chats/room/${idUser}/${idFriend}`);
                setRoom(dataRoom.data)
                await axios.get("http://localhost:8080/chats/" + dataRoom.data.id)
                    .then(data => {
                        if (dataRoom.data.type === 'all') {
                            setIsChatAll(true);
                        } else {
                            setIsChatAll(false);
                        }
                        setMessages(data.data);
                        setMessage({message: '', idFriend, idUser, room: dataRoom.data})
                    })
                    .catch(function (err) {
                        console.log(err)
                    });

                scrollToBottom();
            }
        }

        init();
    }, [idFriend, isChatAll]);

    const sendMessage = () => {
        if (isChatAll) {
            stompClient.send("/gkz/chat/all", {}, JSON.stringify(message));
        } else {
            stompClient.send("/gkz/chat/single", {}, JSON.stringify(message));

        }

    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setMessage({...message, [name]: value});
    };

    const scrollToBottom = () => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    };

    const handleChatFriend = (idFriend) => {
        setIdFriend(idFriend);
        if (idFriend === 10) {
            setIsChatAll(true);
        } else {
            setIsChatAll(false);
        }
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
                        <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#about">{accountToken.username}</a></li>
                        <li className="nav-item"><a className="nav-link js-scroll-trigger"
                                                    href="#experience">Tìm Quanh Đây</a></li>
                        <li className="nav-item"><a className="nav-link js-scroll-trigger"
                                                    href="#education">Post</a></li>
                        {/*<li className="nav-item"><a className="nav-link js-scroll-trigger" href="#skills">Skills</a>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item"><a className="nav-link js-scroll-trigger"*/}
                        {/*                            href="#interests">Interests</a></li>*/}
                        {/*<li className="nav-item"><a className="nav-link js-scroll-trigger" href="#awards">Awards</a>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </nav>

            <div className="container-fluid p-0" style={{background: "#333366"}}>
                <section className="resume-section" id="about">
                    <div className="resume-section-content">
                        <section className="gradient-custom">

                            <div className="row">

                                <div className="col-md-5 col-lg-4 col-xl-4 mb-3 mb-md-0">

                                    <h5 className="font-weight-bold mb-3 text-center text-white">Member</h5>

                                    <div className="card mask-custom">
                                        <div className="card-body">

                                            <ul className="list-unstyled mb-0">

                                                <li className="p-2 border-bottom"
                                                    style={{
                                                        borderBottom: '1px solid rgba(255,255,255,.3) !important',
                                                        background: idFriend === 10 ? '#0099FF' : 'none'
                                                    }}>
                                                    <a href="#!"
                                                       className="d-flex justify-content-between">
                                                        <div className="d-flex flex-row">
                                                            <img
                                                                src="https://bigtop.vn/blog/wp-content/uploads/2022/02/imessege.jpg"
                                                                alt="avatar"
                                                                className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                                width="50"/>
                                                            <div className="pt-1">
                                                                <p className="fw-bold mb-0"
                                                                   onClick={() => handleChatFriend(10)}>Chat Tổng</p>
                                                                <p className="small ">Chat toàn hệ thống</p>
                                                            </div>
                                                        </div>
                                                        <div className="pt-1">
                                                            <p className="small mb-1">Just now</p>
                                                            <span
                                                                className="badge bg-danger float-end">1</span>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>

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
                                                                        <p className="small mb-1">Just now</p>
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

                                <div className="col-md-7 col-lg-8 col-xl-8 custom-box mt-auto">
                                    <div style={{maxHeight: '400px', overflowY: 'auto'}} ref={listRef}>

                                        <ul className="list-unstyled">
                                            {messages.map(message => {
                                                if (message.account.id === idUser)
                                                    return (
                                                        <>
                                                            <li key={message.id} className="d-flex justify-content-end">
                                                                <div>
                                                                    <div
                                                                        className="card-header d-flex justify-content-between">
                                                                        <p className="fw-bold mb-0"
                                                                           style={{fontSize: '25px'}}>{message.account.username}</p>
                                                                        {/*<p className="text-light small mb-0"><i*/}
                                                                        {/*    className="far fa-clock"></i> 12 mins ago</p>*/}
                                                                    </div>
                                                                    <div>
                                                                        <p>
                                                                            {message.content}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <img src={message.account.avatar}
                                                                     alt="avatar"
                                                                     className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                                                     width="30"/>
                                                            </li>
                                                        </>
                                                    )
                                                else
                                                    return (
                                                        <>
                                                            <li key={message.id} className="d-flex "
                                                                style={{width: '100%'}}>
                                                                <img src={message.account.avatar}
                                                                     alt="avatar"
                                                                     className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                                                     width="30"/>
                                                                <div>
                                                                    <div
                                                                        className="card-header d-flex justify-content-between "
                                                                        style={{borderBottom: '1px solid rgba(255,255,255,.3) !important'}}>
                                                                        <p className="fw-bold mb-0"
                                                                           style={{fontSize: '25px'}}>{message.account.username}</p>
                                                                        {/*<p className="text-light small mb-0" style={{fontSize:'10px'}}><i className="far fa-clock"> </i>{message.dateTime}</p>*/}
                                                                    </div>
                                                                    <div className="card-body">
                                                                        <p className="mb-0">
                                                                            {message.content}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </>
                                                    )
                                            })}

                                        </ul>
                                    </div>
                                    <div className="row"
                                         style={{position: 'absolute', bottom: '10px', width: '100%'}}>
                                        <div className="form-outline form-white col-10">
                                            <textarea className="form-control" id="textAreaExample3" rows="3"
                                                      placeholder="Message" name="message"
                                                      onChange={handleInputChange}></textarea>
                                        </div>

                                        <div className="button-container col-2">
                                            <button type="button"
                                                    className="btn btn-light btn-lg btn-rounded float-end"
                                                    onClick={sendMessage}>Send
                                            </button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </section>
                    </div>
                </section>
                <hr className="m-0"/>
            </div>
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
            <script src="/js/scripts.js"></script>
        </div>
    );
};

export default Home;
