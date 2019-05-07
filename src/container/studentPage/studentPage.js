
import React from 'react'
import { Menu, Icon, Button } from 'antd'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { getStuTestList } from '../../redux/student.redux'
import Test from './test'
import TestPage from './testPage'

@connect(
	state => state.student,
	{ getStuTestList }
)
class Student extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			desc: '',
			company: '',
			money: ''
		}
	}
	onChange(key, val) {
		this.setState({
			[key]: val
		})
	}

	handleClick = (e) => {
		// console.log('click ', e);
		this.setState({
			current: e.key,
		});
		if (e.key == 'testList') {
			this.props.getStuTestList()
		}
	}
	
	componentWillReceiveProps(nextProps) {
        const path = nextProps.location.pathname
		if(path.indexOf('stuTestPage') !== -1 ){
			this.setState({
				current: 'testPage',
			});
		}
	}
	
	render() {
		const path = this.props.location.pathname
		const redirect = this.props.redirectTo
		return (
			<div>
				{ redirect && redirect !== path ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
				<Menu
					theme="dark"
					onClick={ this.handleClick }
					selectedKeys={ [this.state.current] }
					mode="horizontal">
					<Menu.Item key="testList" >
						<Icon type="appstore" />测试列表
                    </Menu.Item>
					<Menu.Item key="testPage" disabled >
						<Icon type="appstore" />测试页面
                    </Menu.Item>
				</Menu>
				{/* <Button onClick={ this.props.getStuTestList }>测试列表</Button> */}
				<Route path='/student/test' component={ Test }></Route>
				<Route path='/student/stuTestPage' component={ TestPage }></Route>
			</div>

		)
	}
}

export default Student