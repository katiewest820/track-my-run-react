import React from 'react';
import './dashboardGraph.css';
import { API_BASE_URL } from '../../config';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
//import Moment from 'react-moment';
import * as moment from 'moment';

export default class DashboardGraph extends React.Component{
  constructor(){
    super();
    this.state = {
      month: '',
      monthlyileage: '',
      graphData: '',
      currentlyViewedDate: ''
    }
  }

  componentDidMount(){
    //let monthlyMileage = 0;
    let today = new Date();
    this.setState({currentlyViewedDate: today})
    let month = moment(today).format('MMMM')
    let MM = moment(today).format('MM');
    this.getRunsForGraph(MM, month)
  }

  getRunsForGraph(MM, month){
     let monthlyMileage = 0;
     this.setState({month: month});
     let userid = localStorage.getItem('userid');
    axios.get(`${API_BASE_URL}run/getAllRuns/${userid}`, {headers: {authorization: localStorage.getItem('authToken')}}).then((response) => {
      console.log(response)
      let data = [{name: ' ', mileage: 0, rating: 0}];
      for(let i = 0; i < response.data.data.length; i++) {
        let sqlDate = new Date(response.data.data[i].date);
        let now = moment(sqlDate).format('MM/DD/YY');
        if (now.startsWith(MM)) {
          monthlyMileage = monthlyMileage + response.data.data[i].mileage;
          data.push({name: now, mileage: response.data.data[i].mileage, rating: response.data.data[i].rating})
        }
      }
      this.setState({monthlyMileage: monthlyMileage});
      this.setState({graphData: data})
    }).catch((err) => {
      console.log(err)
    })
  }

  nextMonth(){
    let futureMonth = moment(this.state.currentlyViewedDate).add(1, 'M');
    let futureMonthEnd = moment(futureMonth._d).endOf('month');
    this.setState({currentlyViewedDate: futureMonthEnd._d})
    let month = moment(futureMonthEnd._d).format('MMMM')
    let MM = moment(futureMonthEnd._d).format('MM');
    this.getRunsForGraph(MM, month)
  }

  prevMonth(){
    var pastMonth = moment(this.state.currentlyViewedDate).subtract(1, 'M');
    var pastMonthEnd = moment(pastMonth._d).endOf('month');
    console.log(pastMonthEnd)
    this.setState({currentlyViewedDate: pastMonthEnd._d})
    let month = moment(pastMonthEnd._d).format('MMMM')
    let MM = moment(pastMonthEnd._d).format('MM');
    this.getRunsForGraph(MM, month)
  }

  render(){
    console.log(localStorage.getItem('authToken'))
    console.log(localStorage.getItem('userid'))
    return(
      <div>
        <h1>Your {this.state.month} Run History</h1>
        <h3>Total Mileage This Month: {this.state.monthlyMileage}</h3>
        <LineChart width={600} height={400} data={this.state.graphData}>
          <Line type="monotone" dataKey="mileage" stroke="#8884d8" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip/>
        </LineChart>
        <div className="arrowDiv">
          <button onClick={this.prevMonth.bind(this)}>
            <i className="fas fa-2x fa-arrow-left"></i>
          </button>
          <button onClick={this.nextMonth.bind(this)}>
            <i className="fas fa-2x fa-arrow-right"></i>
          </button>
        </div>
      </div>
    )
  }
}