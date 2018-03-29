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

    }
  }
  componentDidMount(){
    let monthlyMileage = 0;
    let today = new Date();
    let month = moment(today).format('MMMM')
    let MM = moment(today).format('MM');
    this.setState({month: month});

    axios.get(`${API_BASE_URL}run/getAllRuns`).then((response) => {
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



  render(){
    console.log(this.state.graphData)
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
      </div>
    )
  }
}