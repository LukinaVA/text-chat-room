import React from 'react';

const ChatRoom = ({ users, messages }) => {
    const [messageValue, setMessageValue] = React.useState('');

    const sendMessage = () => {

    };

    return (
        <div className="chat-room">
            <div className="chat-room__users">
                Online ({users.length}):
                <ul>
                    {users.map((name, index) => (
                        <li key={name + index}>{ name }</li>
                    ))}
                </ul>
            </div>
            <div className="chat-room__messenger messenger">
                <div className='messenger__messages'>
                    {messages.map((message) => (
                        <div className="messenger__message message">
                            <div className='message__text'>
                                {message.text}
                            </div>
                            <div className='message__info'>
                                {message.userName} {message.time}
                            </div>
                        </div>
                    ))}
                </div>
                <form className='messenger__new-message'>
                    <textarea
                        value={messageValue}
                        onChange={(e) => setMessageValue(e.target.value)}
                        rows="3"
                    />
                    <button onClick={sendMessage} type="button" >Send</button>
                </form>
            </div>
        </div>
    );
}

export default ChatRoom;