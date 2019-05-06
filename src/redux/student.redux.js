import axios from 'axios'
import {
    getStudentRedirectPath
} from '../util'
import {
    notification
} from 'antd'
const ERROR_MSG = 'ERROR_MSG'
const GET_STU_TEST_SUCCESS = 'GET_STU_TEST_SUCCESS'
const GET_TEST_PAGE_SUCCESS = 'GET_TEST_PAGE_SUCCESS'

notification.config({
    duration: 2,
    placement: 'bottomRight',
    bottom: 20,
});
const openNotification = (type, msg) => {
    notification[type]({
        message: msg,
        //   description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
};

const initState = {
    msg: '',
    redirectTo: '',
    testList: [],
    testData:{}
}

// reducer
export function student(state = initState, action) {
    // console.log(action, 'action student')
    switch (action.type) {
        case GET_STU_TEST_SUCCESS:
            return {
                ...state,
                msg: action.type,
                redirectTo: getStudentRedirectPath('test'),
                testList: action.payload
            }
        case GET_TEST_PAGE_SUCCESS:
            return {
                ...state,
                msg: action.type,
                redirectTo: getStudentRedirectPath('stuTestPage', action.payload.testId),
                testData: action.payload
            }

        default:
            return state
    }
}


function getSuccess(data, type, msg) {
    openNotification('success', msg)
    return {
        type: type,
        payload: data
    }
}
function errorMsg(msg) {
    alert('操作失败')
    return { msg, type: ERROR_MSG }
}

// export function loadData(userinfo) {
//     console.log(loadData)
//     return { type: LOAD_DATA, payload: userinfo }
// }


export function getStuTestList() {
    return dispatch => {
        axios.get('/api/student/testList')
            .then(res => {
                if ((res.status == 200 || res.status == 304) && res.data.errno === 0) {
                    // console.log(res.data.data, 'res.data.data')
                    dispatch(getSuccess(res.data.data, 'GET_STU_TEST_SUCCESS', '获取列表成功'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}

export function getTestPage(postData) {
    return dispatch => {
        axios.post('/api/student/testPage', postData)
            .then(res => {
                if ((res.status == 200 || res.status == 304) && res.data.errno === 0) {
                    // console.log(res.data.data, 'testPage data')
                    let data = {
                        ...res.data.data,
                        testId:postData.testId
                    }
                    dispatch(getSuccess(data, 'GET_TEST_PAGE_SUCCESS', '获取考卷成功'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}