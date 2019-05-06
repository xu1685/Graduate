import React from 'react'
import Logo from '../../component/logo/logo'
import { List, Input, Radio, Button } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { regisger } from '../../redux/user.redux'

@connect(
	state => state.user,
	{ regisger }
)
class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userName: '',
			realName: '',
			password: '',
			repeatpwd: '',
			type: 0 // tea
		}

		this.handleRegister = this.handleRegister.bind(this)
	}
	handleChange(key, val) {
		this.setState({
			[key]: val
		})
	}
	handleRegister() {
		this.props.regisger(this.state)
	}
	render() {
		return (
			<div>
				{ this.props.redirectTo ? <Redirect to={ this.props.redirectTo } /> : null }
				<Logo></Logo>
				<List>
					{ this.props.msg ? <p className='error-msg'>{ this.props.msg }</p> : null }
					<Input onChange={ e => this.handleChange('userName', e.target.value) } placeholder="用户名"></Input>
					<Input onChange={ e => this.handleChange('realName', e.target.value) } placeholder="真实姓名"></Input>
					<Input
						type='password'
						onChange={ e => this.handleChange('password', e.target.value) }
						placeholder="密码"
					></Input>
					<Input
						type='password'
						onChange={ e => this.handleChange('repeatpwd', e.target.value) }
						placeholder="确认密码"
					></Input>
					<Radio
						checked={ this.state.type == 1 }
						onChange={ () => this.handleChange('type', 1) }
					>
						学生
					</Radio>
					<Radio
						checked={ this.state.type == 0 }
						onChange={ () => this.handleChange('type', 0) }
					>
						老师
					</Radio>
					<Button type='primary' onClick={ this.handleRegister }>注册 </Button>
				</List>


			</div>

		)
	}
}

export default Register