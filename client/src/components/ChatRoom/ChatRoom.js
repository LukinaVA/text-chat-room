import React, { useState, useRef, useEffect } from 'react';
import socket from '../../socket';

import './chatRoom.scss';

const ChatRoom = ({ userName, users, messages, roomId, addMessage }) => {
    const [ messageValue, setMessageValue ] = useState('');
    const messagesRef = useRef(null);

    useEffect(() => {
        messagesRef.current.scrollTo(0, 99999);
    }, [ messages ]);

    useEffect(() => {
        document.querySelector('.messenger__textarea').focus();
    }, [ messageValue ]);

    const sendMessage = () => {
        const message = {
            roomId: getRoomId(),
            userName,
            text: messageValue
        };
        socket.emit('NEW_MESSAGE', message);

        const time = new Date();
        const my_message = {
            from: 'Me',
            time,
            text: messageValue
        };
        addMessage(my_message);

        document.querySelector('.messenger__textarea').innerHTML = '';
        setMessageValue('');
    };

    const getRoomId = () => {
        return roomId = document.location.pathname.split('/')[1] === '' ?
            (roomId) :
            (document.location.pathname.split('/')[2]);
    };

    const copyLink = (e) => {
        const btns = document.querySelectorAll('.chat-room__btn');
        if (e.target === btns[0]) {
            document.querySelectorAll('.chat-room__link')[0].select();
        } else {
            document.querySelectorAll('.chat-room__link')[1].select();
        }
        document.execCommand('copy');
    };

    const handleKeyDown = (e) => {
        if (e.code === 'Enter') {
            if (!/^\s*$/.test(messageValue) && !e.shiftKey) {
                sendMessage();
            }
            e.preventDefault();
        }
    };

    return (
        <div className='chat-room'>
            <div className='chat-room__users'>
                <span className='chat-room__num'>Online ({ users.length })</span>
                <ul className='chat-room__list'>
                    {users.map(({ name, index }) => (
                        <li key={ name + index }>{ name === userName ? 'Me' : name }</li>
                    ))}
                </ul>
                <div className='chat-room__join'>
                    <input
                        readOnly
                        className='chat-room__link'
                        value={ 'http://' + document.location.host + '/rooms/' + getRoomId() }
                    />
                    <button onClick={ copyLink } className='chat-room__btn btn'>Copy Invite Link</button>
                </div>
                <div className='chat-room__join'>
                    <input
                        readOnly
                        className='chat-room__link'
                        value={ 'http://' + document.location.host + '/rooms/video/' + getRoomId() }
                    />
                    <button onClick={ copyLink } className='chat-room__btn btn'>Copy VideoChat Link</button>
                </div>
            </div>
            <div className='chat-room__messenger messenger'>
                <div ref={ messagesRef } className='messenger__messages'>
                    {messages.map((message) => (
                        <div key={message.time + Math.random()} className={ message.from === 'Me' ? 'message message_mine' : 'message' }>
                            <div className='message__text'>
                                { message.text }
                            </div>
                            <div className='message__info'>
                                From: { message.from } { message.time }
                            </div>
                        </div>
                    ))}
                </div>
                <form className='messenger__new-message'>
                    <div
                        contentEditable={true}
                        className='messenger__textarea'
                        onInput={ (e) => setMessageValue(e.target.textContent) }
                        onKeyDown={ handleKeyDown }
                    />
                    <button className='messenger__btn btn' onClick={ sendMessage } type='button'>Send Message</button>
                </form>
            </div>
        </div>
    );
}

export default ChatRoom;