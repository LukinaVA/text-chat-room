import React from 'react';
import socket from '../../socket';
import axios from 'axios';

const JoinPage = ({onJoin}) => {
    const [userName, setUserName] = React.useState('');

    const joinNewChat = async () => {
        if (!userName) {
            return alert('Enter your name, please :)');
        }
        console.log(document.location.pathname.split('/')[1])
        const roomId = document.location.pathname.split('/')[1] === '' ? (
                (await axios.get('http://localhost:9095')).data
            ) : (document.location.pathname.split('/')[2]);

        console.log(roomId);

        const obj = {
            userName,
            roomId
        };

        onJoin(obj);

        socket.emit('room', obj);
    };

    return (
        <div className='join-page'>
            <input
                type='text'
                placeholder='Enter your name'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button className='join-page__bth' onClick={joinNewChat}>Join new chat room</button>
        </div>
    );
}

export default JoinPage;