import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Home from './Components/Home';
import Results from './Components/Results';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Recipe from './Components/Recipe';
import Account from './Components/Account';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/results">
            <Results />
          </Route>
          <Route path="/recipe/:recipeID">
            <Recipe />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
