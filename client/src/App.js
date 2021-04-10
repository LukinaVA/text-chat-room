import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch} from 'react-router';


import axios from 'axios';

import JoinPage from './components/JoinPage/JoinPage';

function App() {
    const [newUrl, setNewUrl] = useState('');

    useEffect( () => {
        axios.get('http://localhost:9095/')
        .then( (newUrl) => (setNewUrl(newUrl.data.url)));
    }, []);

    return (
        <div className='app'>
          <Switch>
              <Route path='/rooms/*' component={JoinPage}/>
              {newUrl && <Redirect to={newUrl}/>}
          </Switch>
        </div>
    );
}

export default App;
