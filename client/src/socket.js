import io from 'socket.io-client';

const socket = io('http://chat.lukina.me:9095');

export default socket;