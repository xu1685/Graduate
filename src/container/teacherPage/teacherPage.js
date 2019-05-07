
import React from 'react'
import { Menu, Icon, Button } from 'antd';
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { getPaperList, getTestList, gotoQue, getClassList } from '../../redux/teacher.redux'
import Paper from './paper'
import Test from './test'
import Class from './class'
import PaperDetail from './PaperDetail'
import Questions from './Questions'
import ClassDetail from './ClassDetail'

@connect(
	state => state.teacher,
	{ getPaperList, getTestList, gotoQue, getClassList }
)
class Teacher extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			current: ''
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

	handleClick = (e) => {
		// console.log('click ', e);
		this.setState({
			current: e.key,
		});
		switch (e.key) {
			case 'paperList':
				this.getPaperList()
				break;
			case 'testList':
				this.getTestList()
				break;
			case 'questions':
				this.props.gotoQue()
				break;
			case 'class':
				this.props.getClassList()
				break;
		}
	}
	render() {
		const path = this.props.location.pathname
		let redirect = this.props.redirectTo
		console.log('props:', this.props, 'path:', path, 'redirect:', redirect)
		return (
			<div>
				{ redirect && redirect !== path ? <Redirect to={ redirect }></Redirect> : null }
				<Menu
					theme="dark"
					onClick={ this.handleClick }
					selectedKeys={ [this.state.current] }
					mode="horizontal">
					<Menu.Item key="paperList">
						<Icon type="appstore" />试卷列表
                    </Menu.Item>
					<Menu.Item key="testList" >
						<Icon type="appstore" />测试列表
                    </Menu.Item>
					<Menu.Item key="questions" >
						<Icon type="appstore" />题库
                    </Menu.Item>
					<Menu.Item key="class" >
						<Icon type="appstore" />课堂
                    </Menu.Item>
				</Menu>
				
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