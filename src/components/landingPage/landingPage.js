import React from 'react';
import {Link} from 'react-router-dom';
import LandingPageHeader from '../landingPageHeader/landingPageHeader';

export default class LandingPage extends React.Component{

  render(){
    return(
      <div>
        <LandingPageHeader/>
        Hello from Landing Page Component
      <Link to="/home">Demo Login</Link>
      </div>
    )
  }
}