import React from 'react'
import Logo from '../../component/logo/logo'
import { List, Input, Button } from 'antd'
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
	handleChange(key, val) {
		this.setState({
			[key]: val
		})
	}
	handleLogin() {
		console.log('state', this.state)
		this.props.login(this.state)
	}
	render() {
		const ButtonGroup = Button.Group;
		return (
			<div style={ {
				width: "40%",
				margin: "0 auto",
				top: '50px'
			} }>
				{ this.props.redirectTo ? <Redirect to={ this.props.redirectTo } /> : null }
				<Logo></Logo>
				<div>
					<List>
						{ this.props.msg ? <p className='error-msg'>{ this.props.msg }</p> : null }
						<Input
							style={ { margin: "20px 0" } }
							placeholder="用户名"
							onChange={ e => this.handleChange('userName', e.target.value) } />
						<Input
							placeholder="密码"
							type="password"
							onChange={ e => this.handleChange('password', e.target.value) } />
					</List>
					<ButtonGroup size="large" style={ {
						margin:"20px 0",
						width:"100%"
					} }>
						<Button style={{width:"50%"}} type="primary" ghost onClick={ this.handleLogin }>登录</Button>
						<Button style={{width:"50%"}} type="primary" ghost onClick={ this.register }>注册</Button>
					</ButtonGroup>

				</div>
			</div>
		)
	}
}

export default Login