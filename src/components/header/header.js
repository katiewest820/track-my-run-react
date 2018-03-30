import React from 'react';
import './header.css';
import {Link} from 'react-router-dom';
import {clearLocalStorage} from '../../localStorage';
import {Redirect} from 'react-router-dom';

export default class Header extends React.Component{
  constructor(){
    super()
    this.state = {
      redirect: false
    }
  }

  logUserOut(){
    clearLocalStorage()
    this.setState({redirect: true})
  }


  render(){
    return(
      <header className="mainPageHeader">
        <Link to="/home">Home</Link>
        <Link to="/newRun">New Run</Link>
        <Link to="/runLogs">Run Logs</Link>
        <a className="logOutLink" onClick={this.logUserOut.bind(this)} >Log Out</a>
        {this.state.redirect && (<Redirect to="/" />)}
      </header>
    )
  }
}