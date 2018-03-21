import React from 'react';
import Header from '../header/header';
import PinnedToDashboard from '../pinnedToDashboard/pinnedToDashboard';

export default class Main extends React.Component{

  render(){
    return(
      <div>
        <Header/>
        <PinnedToDashboard/>
      </div>
    )
  }
}

