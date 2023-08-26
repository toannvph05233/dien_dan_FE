import { Stomp } from '@stomp/stompjs';
let socket = new WebSocket('ws://localhost:8080/connect-socket/websocket');
let stompClient = Stomp.over(socket);

const stompPromise = new Promise((resolve, reject) => {
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        resolve(stompClient);
    }, error => {
        reject(error);
    });
});

export default stompPromise;
