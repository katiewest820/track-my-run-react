import React from 'react';
import LandingPageHeader from '../landingPageHeader/landingPageHeader';
import axios from 'axios';
import {API_BASE_URL} from '../../config';

export default class Register extends React.Component{
  constructor(){
    super()
    this.state = {
      userName: '',
      password: ''
    }
  }

  submitNewUser(){
    let newUser = {
      username: this.state.userName,
      password: this.state.password
    }
    axios.post(`${API_BASE_URL}user/register`, newUser).then((response) => {
      console.log(response)
    }).catch((err) => {
      console.log(err)
    });
  };

  render(){
    console.log(this.state)
    return(
      <div>
        <LandingPageHeader/>
        <form action="">
          <label htmlFor="">Username:</label>
          <input value={this.state.userName} onChange={e => this.setState({userName: e.target.value})} type="text"/>
          <label htmlFor="">Password:</label>
          <input value={this.state.password} onChange={e => this.setState({password: e.target.value})} type="text"/>
        </form>
        <button onClick={this.submitNewUser.bind(this)} >Register</button>
      </div>
    )
  }
}