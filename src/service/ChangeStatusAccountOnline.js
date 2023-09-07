import React from 'react';
import axios from "axios";
import LocationServer from "./LocationServer";

const ChangeStatusAccountOnline = () => {
    let id = localStorage.getItem("id");
    if (id != null) {
        axios.get(LocationServer + "users/status/on/" +id )
            .then(data => {
                console.log("bạn đang online")
            })
            .catch(function (err) {
                console.log(err)
            });
    }
}

export default ChangeStatusAccountOnline;
