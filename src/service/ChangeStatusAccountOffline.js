import React from 'react';
import axios from "axios";
import LocationServer from "./LocationServer";

const ChangeStatusAccountOffline = () => {
    let id = localStorage.getItem("id");
    if (id != null){
        axios.get(LocationServer + "users/status/off/" +id )
            .then(data => {
                console.log("bạn đang Offline")
            })
            .catch(function (err) {
                console.log(err)
            });
    }
}

export default ChangeStatusAccountOffline;
