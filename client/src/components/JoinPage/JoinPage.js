import React, { useState } from 'react';
import axios from 'axios';

import socket from '../../socket';

import './joinPage.scss'

const JoinPage = () => {
    const [ userName, setUserName ] = useState('');

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

        socket.emit('ROOM_JOIN', obj);
        setUserName('');
    };

    return (
        <div className='join-page'>
            <h1 className='join-page__title'>Welcome to Chat Room</h1>
            <label htmlFor='userName' className='join-page__label'>Enter your name:</label>
            <input
                autoFocus
                id='userName'
                type='text'
                maxLength='20'
                placeholder='Name'

                value={userName}
                className='join-page__user-name'
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.code === 'Enter' && joinNewChat()}
            />
            <button className='join-page__bth btn' onClick={ joinNewChat }>Join New Chat Room</button>
        </div>
    );
}

export default JoinPage;