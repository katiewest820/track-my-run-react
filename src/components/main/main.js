import React from 'react';
import Header from '../header/header';
import DashboardGraph from '../dashboardGraph/dashboardGraph';

export default class Main extends React.Component{

  render(){
    return(
      <div>
        <Header/>
        <DashboardGraph/>
      </div>
    )
  }
}

