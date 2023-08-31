import React from 'react';
import axios from "axios";

const LocationService = () => {
        if ("geolocation" in navigator) {
            let idUser = localStorage.getItem('id');
            navigator.geolocation.getCurrentPosition(function (position) {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;

                console.log("Vĩ độ: " + latitude + ", Kinh độ: " + longitude);
                let location = {latitude,longitude, account:{id: idUser}}

                axios.post("http://45.117.179.204:8080/locations", location)
                    .then(data => {
                        console.log(data);
                    })
                    .catch(function (err) {
                        console.log(err)
                    });
            }, function (error) {
                console.error("Không thể lấy vị trí: " + error.message);
            });
        } else {
            console.error("Trình duyệt không hỗ trợ Geolocation");
        }
};

export default LocationService;
