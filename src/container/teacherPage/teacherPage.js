
import React from 'react'
import { Input, Button } from 'antd'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { getPaperList, getTestList,gotoQue,getClassList } from '../../redux/teacher.redux'
import Paper from './paper'
import Test from './test'
import Class from './class'
import PaperDetail from './PaperDetail'
import Questions from './Questions'
import ClassDetail from './ClassDetail'

@connect(
	state => state.teacher,
	{ getPaperList, getTestList ,gotoQue,getClassList}
)
class Teacher extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
		}
		this.getPaperList = this.getPaperList.bind(this)
		this.getTestList = this.getTestList.bind(this)

	}
	onChange(key, val) {
		this.setState({
			[key]: val
		})
	}
	getPaperList() {
		this.props.getPaperList()
	}
	getTestList() {
		this.props.getTestList()
	}

	render() {
		const path = this.props.location.pathname
		let redirect = this.props.redirectTo
		console.log('props:',this.props,'path:',path,'redirect:', redirect)
		return (
			<div>
				{ redirect && redirect !== path ? <Redirect to={ redirect}></Redirect> :null }
				<Button onClick={ this.getPaperList }>试卷列表</Button>
				<Button onClick={ this.getTestList }>测试列表</Button>
				<Button onClick={ this.props.gotoQue }>题库</Button>
				<Button onClick={ this.props.getClassList }>课堂</Button>
				<Route path='/teacher/paper' component={ Paper }></Route>
				<Route path='/teacher/test' component={ Test }></Route>
				<Route path='/teacher/paperDetail' component={ PaperDetail }></Route>
				<Route path='/teacher/questions' component={ Questions }></Route>                
				<Route path='/teacher/class' component={ Class }></Route>                
				<Route path='/teacher/classDetail' component={ ClassDetail }></Route>                
			</div>

		)
	}
}

export default Teacher