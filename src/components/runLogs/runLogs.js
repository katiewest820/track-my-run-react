import React from 'react';
import Header from '../header/header';
import {API_BASE_URL} from '../../config';
import axios from 'axios';
import ReactTable from 'react-table';
import '../../../node_modules/react-table/react-table.css';
import './runLogs.css';
import * as moment from 'moment';

export default class RunLogs extends React.Component{
  constructor(){
    super();
    this.state = {
      runLogs: ''
    }
  }

  componentDidMount(){
    axios.get(`${API_BASE_URL}run/getAllRuns`).then((response) => {
      console.log(response)
      this.setState({runLogs: response.data.data})
    })
  }

  deleteRowData(data){
    console.log(data)
    let runId = data.original.delete;
    axios.delete(`${API_BASE_URL}run/deleteOneRun/${runId}`).then((response) => {
      console.log(response)
    }).catch((err) => {
      console.log(err)
    })
  }


  render(){

    let onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: e => {
          console.log('A Td Element was clicked!')
          console.log('it produced this event:', e)
          console.log('It was in this column:', column)
          console.log('It was in this row:', rowInfo)
          console.log('It was in this table instance:', instance)
          this.deleteRowData(rowInfo)
        }
      }
    }

    console.log(this.state.runLogs)
    let data = [];

    for(let i = 0; i < this.state.runLogs.length; i++) {
      let sqlDate = this.state.runLogs[i].date;
      let now = moment(sqlDate).format('MM/DD/YY');
      data.push({
        date: now,
        location: this.state.runLogs[i].location,
        mileage: this.state.runLogs[i].mileage,
        rating: this.state.runLogs[i].rating,
        weather: this.state.runLogs[i].weather,
        terrain: this.state.runLogs[i].terrain,
        incline: this.state.runLogs[i].incline,
        notes: this.state.runLogs[i].notes,
        delete: this.state.runLogs[i].id
      })
    }

    const columns = [{
      Header: 'Delete',
      accessor: 'delete',
      Cell: () => <i className="fas fa-trash-alt"></i>

    } ,{
      Header: 'Date',
      accessor: 'date'
    }, {
      Header: 'Location',
      accessor: 'location'
    }, {
      Header: 'Rating',
      accessor: 'rating'
    }, {
      Header: 'Mileage',
      accessor: 'mileage'
    }, {
      Header: 'Incline',
      accessor: 'incline'
    }, {
      Header: 'Terrain',
      accessor: 'terrain'
    }, {
      Header: 'Notes',
      accessor: 'notes'
    }]
    return(
      <div>
        <Header/>

          <ReactTable
            data={data}
            columns={columns}
            filterable
            getTrProps={onRowClick}
          />

      </div>
    )
  }
}