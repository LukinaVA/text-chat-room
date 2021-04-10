import React, {useReducer, useEffect} from 'react';

import reducer from './reducer';
import JoinPage from './components/JoinPage/JoinPage';
import ChatRoom from './components/ChatRoom/ChatRoom';
import axios from 'axios';
import {Route, Switch} from 'react-router';
import socket from './socket';

function App() {
    const [state, dispatch] = useReducer(reducer, {
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

    const addMessage = (obj) => {
        dispatch({
            type: 'ADD_MESSAGE',
            payload: obj,
        });
    };

    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users,
        });
    };

    useEffect(() => {
        socket.on('setUsers', setUsers);
        socket.on('message', addMessage);
        socket.on('alreadyTaken', () => {
            alert('Name is already taken');
        });
    }, []);

    return (
        <div className='app'>
            <Switch>
                <Route path='/' render={() => {
                    return !state.joined ? (
                        <JoinPage onJoin={onJoin}/>
                    ) : (
                        <ChatRoom {...state} addMessage={addMessage}/>
                    );
                }}/>
            </Switch>
        </div>
    );
}

export default App;