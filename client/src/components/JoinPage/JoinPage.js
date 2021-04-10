import React from 'react';
//import socket from '../../socket';

const JoinPage = () => {
    const [userName, setUserName] = React.useState('');

    const joinNewChat = () => {
        if (!userName) {
            return alert('Enter your name, please :)');
        }
        //socket.emit('test');
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