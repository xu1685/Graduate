
import React from 'react'
import {Input, Button} from 'antd'
import {connect} from 'react-redux'
import {Redirect,Route} from 'react-router-dom'
import {getStuTestList} from '../../redux/student.redux'
import Test from './test'
import TestPage from './testPage'

@connect(
	state=>state.student,
	{getStuTestList}
)
class Student extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			title:'',
			desc:'',
			company:'',
			money:''
		}
	}
	onChange(key,val){
		this.setState({
			[key]:val
		})
	}
	// componentWillMount(){
	// 	 let url = this.props.location.pathname
    //     if (url.indexOf('testPage') == -1 && this.props.testList.length == 0) {
    //         console.log('STUPAGE testList=[]')
    //         this.props.getStuTestList()
    //     }
	// }

	render(){
		const path = this.props.location.pathname
		const redirect = this.props.redirectTo
		return (
			<div>
				{redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> :null}
				<h2>student page</h2>
				<Button onClick={ this.props.getStuTestList }>测试列表</Button>
				<Route path='/student/test' component={ Test }></Route>
				<Route path='/student/stuTestPage' component={ TestPage }></Route>
			</div>
			
		)
	}
}

export default Student