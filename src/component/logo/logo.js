import React from 'react'
import {Icon} from 'antd'
import './logo.css'
class Logo extends React.Component{

	render(){
		return (
			<div className="logo-container">
				<Icon style={{fontSize:'70px'}} type="team" />
			</div>
		)
	}
}

export default Logo
