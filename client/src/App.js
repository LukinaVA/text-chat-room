import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router';
import JoinPage from './components/JoinPage/JoinPage';

function App() {
  useEffect(() => {

  }, []);

  return (
    <div className="app">
      <Switch>
        <Route path='/rooms/*' component={JoinPage}/>
      </Switch>
    </div>
  );
}

export default App;
