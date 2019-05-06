
import axios from 'axios'
import {getUserRedirectPath} from '../util'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCESS = 'LOGIN_SUCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const initState={
	redirectTo:'',
	isAuth:false,
	msg:'',
	user:'',
	type:''
}
// reducer
export function user(state=initState, action){
	// console.log(action,'action user')
	switch(action.type){
		case REGISTER_SUCCESS:
			return {...state, msg:'',redirectTo:getUserRedirectPath(action.payload),isAuth:true,...action.payload}
		case LOGIN_SUCESS:
			return {...state, msg:'',redirectTo:getUserRedirectPath(action.payload),isAuth:true,...action.payload}
		case LOAD_DATA:
			return {...state, ...action.payload}
		case ERROR_MSG:
			return {...state, isAuth:false, msg:action.msg}
		default:
			return state
	}
} 

function registerSuccess(data){
	alert('注册成功')
	return { type:REGISTER_SUCCESS, payload:data}
}
function loginSuccess(data){
	alert('登录成功')
	return { type:LOGIN_SUCESS , payload:data}
}
function errorMsg(msg){
	alert('操作失败')
	return { msg, type:ERROR_MSG }
}

export function loadData(userinfo){
	console.log(loadData)
	return { type:LOAD_DATA, payload:userinfo}
}
export function login({userName,password}){
	if (!userName||!password) {
		return errorMsg('用户密码必须输入')
	}
	console.log('login',userName,password)
	return dispatch=>{
		axios.post('/api/user/login',{userName,password})
			.then(res=>{
				if (res.status==200&&res.data.errno===0) {
					dispatch(loginSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.message))
				}
			})		
	}


}

export function regisger({userName,realName,password,repeatpwd,type}){
	if (!userName||!realName||!password||!type) {
		return errorMsg('用户名密码必须输入')
	}
	if (password!==repeatpwd) {
		return errorMsg('密码和确认密码不同')
	}
	return dispatch=>{
		axios.post('/api/user/register',{userName,realName,password,type})
			.then(res=>{
				if (res.status==200&&res.data.errno===0) {
					dispatch(registerSuccess({userName,realName,password,type}))
				}else{
					dispatch(errorMsg(res.data.message))
				}
			})		
	}

}





