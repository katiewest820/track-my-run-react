import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Main from './components/main/main';
import NewRun from './components/newRun/newRun';
import RunLogs from './components/runLogs/runLogs';
import LandingPage from './components/landingPage/landingPage';
import Register from './components/register/register';
import Login from './components/login/login';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/home" component={Main}/>
          <Route exact path="/newRun" component={NewRun}/>
          <Route exact path="/runLogs" component={RunLogs}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
        </Switch>
      </div>
    );
  }
}

