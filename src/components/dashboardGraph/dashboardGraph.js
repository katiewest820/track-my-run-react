import React from 'react';
import './dashboardGraph.css';
import RunDetails from '../runDetails/runDetails';
import { API_BASE_URL } from '../../config';
import axios from 'axios';
import { LineChart, BarChart, Bar, CartesianGrid, Legend, Line, XAxis, YAxis, Tooltip } from 'recharts';
//import Moment from 'react-moment';
import * as moment from 'moment';

export default class DashboardGraph extends React.Component{
  constructor(){
    super();
    this.state = {
      month: '',
      monthlyileage: '',
      graphData: '',
      currentlyViewedDate: '',
      chartType: 'line',
      clickedRunData: ''
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
      let data = [{name: ' ', mileage: 0, rating: 0, id: ''}];
      for(let i = 0; i < response.data.data.length; i++) {
        let sqlDate = new Date(response.data.data[i].date);
        let now = moment(sqlDate).format('MM/DD/YY');
        if (now.startsWith(MM)) {
          monthlyMileage = monthlyMileage + response.data.data[i].mileage;
          data.push({name: now, mileage: response.data.data[i].mileage, rating: response.data.data[i].rating, id: response.data.data[i].id})
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

  changeChartType(value){
    this.setState({chartType: value})
  }

  loadRunData(data){
    console.log('hi')
    console.log(data)
    console.log(this)
    console.log(data.payload.id)
    //this.setState({redirectToRunId: data.payload.id})
    this.callApiForRunData(data.payload.id)
  }

  callApiForRunData(runId){
    axios.get(`${API_BASE_URL}run/getOneRun/${runId}`, {headers: {authorization: localStorage.getItem('authToken')}}).then((runData) => {
      console.log(runData)
      this.setState({clickedRunData: runData})
    }).catch((err) => {
      console.log(err)
    })
  }


  render(){
    console.log(localStorage.getItem('authToken'))
    console.log(localStorage.getItem('userid'))
    if(this.state.chartType === 'line'){
      return (
        <div>
          <h1>Your {this.state.month} Run History</h1>
          <h3>Total Mileage This Month: {this.state.monthlyMileage}</h3>
          <LineChart width={700} height={400} data={this.state.graphData}>
            <Line type="monotone" dataKey="mileage" stroke="#8884d8" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>

          <div className="arrowDiv">
            <button onClick={this.prevMonth.bind(this)}>
              <i className="fas fa-2x fa-arrow-left"></i>
            </button>
            <button onClick={this.nextMonth.bind(this)}>
              <i className="fas fa-2x fa-arrow-right"></i>
            </button>
          </div>
          <div className="chartTypeDiv">
            <button onClick={this.changeChartType.bind(this, 'bar')}>
              <i className="fas fa-3x fa-chart-bar"></i>
            </button>
            <button onClick={this.changeChartType.bind(this, 'line')}>
              <i className="fas fa-3x fa-chart-line"></i>
            </button>
          </div>
          <RunDetails runData={this.state.clickedRunData}/>
        </div>
      )
    } else if(this.state.chartType === 'bar'){
      return (
        <div>
          <h1>Your {this.state.month} Run History</h1>
          <h3>Total Mileage This Month: {this.state.monthlyMileage}</h3>
          <BarChart width={700} height={400} data={this.state.graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="mileage" fill="#8884d8" value="id" onClick={e => this.loadRunData(e)}/> 
          </BarChart>
          <div className="arrowDiv">
            <button onClick={this.prevMonth.bind(this)}>
              <i className="fas fa-2x fa-arrow-left"></i>
            </button>
            <button onClick={this.nextMonth.bind(this)}>
              <i className="fas fa-2x fa-arrow-right"></i>
            </button>
          </div>
          <div className="chartTypeDiv">
            <button onClick={this.changeChartType.bind(this, 'bar')}>
              <i className="fas fa-3x fa-chart-bar"></i>
            </button>
            <button onClick={this.changeChartType.bind(this, 'line')}>
              <i className="fas fa-3x fa-chart-line"></i>
            </button>
          </div>
          <RunDetails runData={this.state.clickedRunData}/>
        </div>
      )
    }
    
    
      

        
       

      
    
  }
}