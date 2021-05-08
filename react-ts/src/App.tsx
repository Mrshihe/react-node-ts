import React from 'react';
import  { HashRouter, Switch, Route } from 'react-router-dom';

import LoginPage from './pages/login';
import HomePage from './pages/home';

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
      </Switch>
    </HashRouter>
  )
}

export default App;