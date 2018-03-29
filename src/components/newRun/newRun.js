import React from 'react';
import Header from '../header/header';
import { API_BASE_URL } from '../../config';
import axios from 'axios';

export default class NewRun extends React.Component{
  constructor(){
    super()
    this.state = {
      location: '',
      date: '',
      mileage: '',
      terrain: '',
      incline: '',
      weather: '',
      rating: '',
      notes: ''
    }
  }

  submitRunToApi(){
    //TODO user id from local storage
    let newRun ={
      userid: '1234',
      location: this.state.location,
      date: this.state.date,
      mileage: this.state.mileage,
      terrain: this.state.terrain,
      incline: this.state.incline,
      weather: this.state.weather,
      rating: this.state.rating,
      notes: this.state.notes
    }
    axios.post(`${API_BASE_URL}run/newRun`, newRun).then((response) => {
      console.log(response)
    }).catch((err) => {
      console.log(err)
    });
  }

  render(){
   console.log(this.state)
    return(
      <div>
        <Header/>
        <div className="newRunForm">
          <h2>Log Your Run</h2>
          <form action="">
            <label htmlFor="">Location</label>
            <input value={this.state.location} onChange={e => this.setState({location: e.target.value})} type="text"/>
            <label htmlFor="">Date</label>
            <input value={this.state.date} onChange={e => this.setState({date: e.target.value})} type="date"/>
            <label htmlFor="">Mileage</label>
            <input value={this.state.mileage} onChange={e => this.setState({mileage: e.target.value})} type="text"/>
            <label htmlFor="">Terrain</label>
            <input value={this.state.terrain} onChange={e => this.setState({terrain: e.target.value})} type="text"/>
            <label htmlFor="">Incline</label>
            <input value={this.state.incline} onChange={e => this.setState({incline: e.target.value})} type="text"/>
            <label htmlFor="">Weather</label>
            <input value={this.state.weather} onChange={e => this.setState({weather: e.target.value})} type="text"/>
            <label htmlFor="">Rate your run</label>
            <select value={this.state.rating} onChange={e => this.setState({rating: e.target.value})} name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <label htmlFor="">Notes</label>
            <input value={this.state.notes} onChange={e => this.setState({notes: e.target.value})} type="textArea"/>
          </form>
          <button onClick={this.submitRunToApi.bind(this)} >Submit</button>
        </div>
      </div>
    )
  }
}