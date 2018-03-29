import React from 'react';
import LandingPageHeader from '../landingPageHeader/landingPageHeader';
import axios from 'axios';
import {API_BASE_URL} from '../../config';
import {saveAuthTokenAndUserId} from '../../localStorage';
import {Redirect} from 'react-router-dom';


export default class Login extends React.Component{
  constructor(){
    super()
    this.state ={
      userName: '',
      password: '',
      redirect: false
    }
  }

  logUserIn(){
    let userData = {
      username: this.state.userName,
      password: this.state.password
    }
    axios.post(`${API_BASE_URL}user/login`, userData).then((user) => {
      console.log(user)
      saveAuthTokenAndUserId(user.data.token, user.data.userId)
      this.setState({redirect: true})
    }).catch((err) => {
      console.log(err)
    })
  }

  render(){
    return(
      <div>
        <LandingPageHeader/>
        <form action="">
          <label htmlFor="">Username:</label>
          <input value={this.state.userName} onChange={e => this.setState({userName: e.target.value})} type="text"/>
          <label htmlFor="">Password:</label>
          <input value={this.state.password} onChange={e => this.setState({password: e.target.value})} type="text"/>
        </form>
        <button onClick={this.logUserIn.bind(this)}>Login</button>
        {this.state.redirect && (<Redirect to="/home" />)}
      </div>
    )
  }
}