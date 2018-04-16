import React from 'react';
import { API_BASE_URL } from '../../config';
import axios from 'axios';

export default class RunDetails extends React.Component{
	constructor(props){
		super(props)
		console.log(props)
		this.state = {
			
		}

	}

	componentDidUpdate(){
		if(this.props.runData){
			console.log('yessssssssss')
			
		}
	}

	// callApiForRunData(runId){
	// 	axios.get(`${API_BASE_URL}run/getOneRun/${runId}`, {headers: {authorization: localStorage.getItem('authToken')}}).then((runData) => {
	// 		console.log(runData)
	// 		this.setState({runId: ''})
	// 		this.setState({runData: runData.data.data[0]})
	// 	}).catch((err) => {
	// 		console.log(err)
	// 	})
	// }

	render(){
		console.log(this.props.runData)
		if(this.props.runData){
			return(
				<div>
					<p>hiya</p>
				</div>
			)
		} else {
			return(
				<div>

				</div>
			)
		}
	}
}