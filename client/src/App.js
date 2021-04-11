import React, {useReducer, useEffect} from 'react';
import {Route, Switch} from 'react-router';

import reducer from './reducer';
import JoinPage from './components/JoinPage/JoinPage';
import ChatRoom from './components/ChatRoom/ChatRoom';

import socket from './socket';

import './styles.scss';

function App() {
    const [appState, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: [],
    });

    const onJoin = (obj) => {
        dispatch({
            type: 'JOIN_ROOM',
            payload: obj,
        });
    };

    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users,
        });
    };

    const addMessage = (message) => {
        dispatch({
            type: 'ADD_MESSAGE',
            payload: message,
        });
    };

    useEffect(() => {
        socket.on('SERVER:ALLOW_JOIN', onJoin);
        socket.on('SERVER:SET_USERS', setUsers);
        socket.on('SERVER:ADD_MESSAGE', addMessage);
        socket.on('SERVER:USER_EXISTS', () => alert('Name is already taken :('));
        socket.on('SERVER:INVALID_ROOM', () => alert('Invalid invite link :('));
    }, []);

    return (
        <div className='app'>
            <Switch>
                <Route path='/' render={() => {
                    return !appState.joined ? (
                        <JoinPage />
                    ) : (
                        <ChatRoom {...appState} addMessage={addMessage}/>
                    );
                }}/>
            </Switch>
        </div>
    );
}

export default App;