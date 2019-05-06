//合并所有reducer并返回
import {combineReducers} from 'redux'
import { user } from './redux/user.redux'
import { teacher } from './redux/teacher.redux'
import { student } from './redux/student.redux'

export default combineReducers({user,teacher,student})
