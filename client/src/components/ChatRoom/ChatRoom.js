import React, { useState, useRef, useEffect } from 'react';
import socket from '../../socket';

import './chatRoom.scss';

const ChatRoom = ({ userName, users, messages, roomId, addMessage }) => {
    const [ messageValue, setMessageValue ] = useState('');
    const messagesRef = useRef(null);

    useEffect(() => {
        messagesRef.current.scrollTo(0, 99999);
    }, [ messages ]);

    const sendMessage = () => {
        const message = {
            roomId: getRoomId(),
            userName,
            text: messageValue
        };
        setMessageValue('');
        socket.emit('NEW_MESSAGE', message);

        const time = new Date();
        const my_message = {
            from: 'Me',
            time: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
            text: messageValue
        };
        addMessage(my_message);
    };

    const getRoomId = () => {
        return roomId = document.location.pathname.split('/')[1] === '' ?
            (roomId) :
            (document.location.pathname.split('/')[2]);
    };

    const copyLink = () => {
        document.querySelector('.chat-room__link').select();
        document.execCommand('copy');
    };

    return (
        <div className='chat-room'>
            <div className='chat-room__users'>
                <span className='chat-room__num'>Online ({users.length})</span>
                <ul className='chat-room__list'>
                    {users.map(({name, index}) => (
                        <li key={name + index}>{name}</li>
                    ))}
                </ul>
                <div className='chat-room__join'>
                    <input
                        className='chat-room__link'
                        value={'http://' + document.location.host + '/rooms/' + getRoomId()}
                    />
                    <button onClick={copyLink} className='chat-room__btn btn'>Copy invite link</button>
                </div>
            </div>
            <div className='chat-room__messenger messenger'>
                <div ref={messagesRef} className='messenger__messages'>
                    {messages.map((message) => (
                        <div className={message.from === 'Me' ? 'message message_mine' : 'message'}>
                            <div className='message__text'>
                                {message.text}
                            </div>
                            <div className='message__info'>
                                From: {message.from} {message.time}
                            </div>
                        </div>
                    ))}
                </div>
                <form className='messenger__new-message'>
                    <textarea
                        autoFocus
                        value={messageValue}
                        className='messenger__textarea'
                        onChange={(e) => setMessageValue(e.target.value)}
                        onKeyDown={(e) => e.code === 'Enter' && sendMessage()}
                        rows='3'
                    />
                    <button className='messenger__btn btn' onClick={sendMessage} type='button'>Send Message</button>
                </form>
            </div>
        </div>
    );
}

export default ChatRoom;