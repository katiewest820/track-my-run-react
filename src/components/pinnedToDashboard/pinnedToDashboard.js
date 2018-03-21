import React from 'react';
import './pinnedToDashboard.css';
import { API_BASE_URL } from '../../config';
import axios from 'axios';

export default class PinnedToDashboard extends React.Component{
  constructor(){
    super();
    this.state = {
      pinned: []
    }

  }

  componentDidMount(){
    axios.get(`${API_BASE_URL}run/getAllRuns`).then((response) => {
      console.log(response)
      for(let i = 0; i < response.data.data.length; i++){
        if(response.data.data[i].pinned === 1){
          this.setState({pinned: [...this.state.pinned, response.data.data[i]]})

        }
      }
    })

  }

  render(){
    console.log(this.state.pinned)
    let pinnedRun;
    if(this.state.pinned.length > 0) {
      pinnedRun = this.state.pinned.map((item, index) => {
        return (
          <div className="pinnedRunBox" key={index}>
            <button>Remove From Dashboard</button>
            <p>{item.name}</p>
            <p>{item.date}</p>
            <p>{item.goal}</p>
            <p>See Run Details</p>
            <p>Log A Run</p>
          </div>
        )
      });
    }
    return(
      <div>
        {pinnedRun}
      </div>

    )
  }
}