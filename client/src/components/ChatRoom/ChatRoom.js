import React, {useEffect} from 'react';
import socket from '../../socket';

const ChatRoom = ({userName, users, messages, roomId, addMessage}) => {
    const [messageValue, setMessageValue] = React.useState('');

    // useEffect(() => {
    //     socket.on('message', (message) => {
    //         addMessage(message);
    //     });
    // }, []);

    const sendMessage = () => {
        const obj = {
            roomId: getRoomId(),
            from: userName,
            text: messageValue
        };
        setMessageValue('');
        socket.emit('message', obj)
    };

    const getRoomId = () => {
        return roomId = document.location.pathname.split('/')[1] === '' ? (roomId) :
            (document.location.pathname.split('/')[2]);
    }

    const copyLink = () => {
        document.querySelector('.chat-room__link').select();
        document.execCommand('copy');
    };

    return (
        <div className='chat-room'>
            <input className='chat-room__link' value={'http://' + document.location.host + '/rooms/' + getRoomId()}/>
            <button onClick={copyLink}>Copy invite link</button>
            <div className='chat-room__users'>
                Online ({users.length}):
                <ul>
                    {users.map(({name, index}) => (
                        <li key={name + index}>{name}</li>
                    ))}
                </ul>
            </div>
            <div className='chat-room__messenger messenger'>
                <div className='messenger__messages'>
                    {messages.map((message) => (
                        <div className='messenger__message message'>
                            <div className='message__text'>
                                {message.text}
                            </div>
                            <div className='message__info'>
                                {message.from} {message.time}
                            </div>
                        </div>
                    ))}
                </div>
                <form className='messenger__new-message'>
                    <textarea
                        onChange={(e) => setMessageValue(e.target.value)}
                        value={messageValue}
                        rows='3'
                    />
                    <button onClick={sendMessage} type='button'>Send</button>
                </form>
            </div>
        </div>
    );
}

export default ChatRoom;