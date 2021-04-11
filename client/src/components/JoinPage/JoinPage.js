import React from 'react';
import socket from '../../socket';
import axios from 'axios';

import './joinPage.scss'

const JoinPage = ({onJoin}) => {
    const [userName, setUserName] = React.useState('');

    const joinNewChat = async () => {
        if (!userName) {
            return alert('Enter your name, please :)');
        }

        const roomId = document.location.pathname.split('/')[1] === '' ? (
                (await axios.get('http://localhost:9095')).data
            ) : (document.location.pathname.split('/')[2]);

        const obj = {
            userName,
            roomId
        };

        onJoin(obj);

        socket.emit('room', obj);
    };

    return (
        <div className='join-page'>
            <h1 className='join-page__title'>Welcome to Chat Room</h1>
            <label htmlFor='userName' className='join-page__label'>Enter your name: </label>
            <input
                id='userName'
                className='join-page__user-name'
                type='text'
                placeholder='Name'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button className='join-page__bth' onClick={joinNewChat}>Join New Chat Room</button>
        </div>
    );
}

export default JoinPage;