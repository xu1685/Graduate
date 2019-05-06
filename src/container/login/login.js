import React from 'react'
import Logo from '../../component/logo/logo'
import { List, Input, WhiteSpace, Button } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'


@connect(
	state => state.user,
	{ login }
)
class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userName: '',
			password: ''
		}
		this.register = this.register.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}
	register() {
		this.props.history.push('/register')
	}
	handleChange(key,val) {
		this.setState({
			[key]: val
		})
	}
	handleLogin() {
		console.log('state',this.state)
		this.props.login(this.state)
	}
	render() {
		return (
			<div>
				{ this.props.redirectTo ? <Redirect to={ this.props.redirectTo } /> : null }
				<Logo></Logo>
				<div>
					<List>
						{ this.props.msg ? <p className='error-msg'>{ this.props.msg }</p> : null }
						<Input onChange={ e => this.handleChange('userName', e.target.value) } />
						<Input onChange={ e => this.handleChange('password', e.target.value) }/>
					</List>
					<Button onClick={ this.handleLogin } type='primary'>登录</Button>
					<Button onClick={ this.register } type='primary'>注册</Button>
				</div>
			</div>
		)
	}
}

export default Login