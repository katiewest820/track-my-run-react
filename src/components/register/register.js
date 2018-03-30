import React from 'react';
import LandingPageHeader from '../landingPageHeader/landingPageHeader';
import axios from 'axios';
import {API_BASE_URL} from '../../config';
import {saveAuthTokenAndUserId} from '../../localStorage';
import {Redirect} from 'react-router-dom';

export default class Register extends React.Component{
  constructor(){
    super()
    this.state = {
      userName: '',
      password: '',
      redirect: false
    }
  }

  submitNewUser(){
    let newUser = {
      username: this.state.userName,
      password: this.state.password
    }
    axios.post(`${API_BASE_URL}user/register`, newUser).then((response) => {
      console.log(response)
      if(response.status === 200){
        axios.post(`${API_BASE_URL}user/login`, newUser).then((user) => {
          console.log(user)
          saveAuthTokenAndUserId(user.data.token, user.data.userId)
          this.setState({redirect: true})
        });
      };
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
        {this.state.redirect && (<Redirect to='/home'/>)}
      </div>
    )
  }
}