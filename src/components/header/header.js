import React from 'react';
import './header.css';

export default class Header extends React.Component{

  render(){
    return(
      <header className="mainPageHeader">
        <p>Home</p>
        <p>Your Runs</p>
        <p>New Run</p>
        <p>Log Out</p>
      </header>
    )
  }
}