import axios from 'axios'
import {
    getTeacherRedirectPath
} from '../util'
import {
    notification
} from 'antd'
const GET_TEST_SUCCESS = 'GET_TEST_SUCCESS'
const GET_PAPER_SUCESS = 'GET_PAPER_SUCESS'
const DELETE_PAPER_SUCCESS = 'DELETE_PAPER_SUCCESS'
const CREATE_PAPER_SUCCESS = 'CREATE_PAPER_SUCCESS'
const CREATE_QUE_SUCCESS = 'CREATE_QUE_SUCCESS'
const DELETE_QUE_SUCCESS = 'DELETE_QUE_SUCCESS'
const UPDATE_QUE_SUCCESS = 'UPDATE_QUE_SUCCESS'
const UPDATE_PAPER_SUCCESS = 'UPDATE_PAPER_SUCCESS'
const GET_PAPER_DETAIL_SUCCESS = 'GET_PAPER_DETAIL_SUCCESS'
const GET_ALLQUE_SUCCESS = 'GET_ALLQUE_SUCCESS'
const GET_ALLTAGS_SUCCESS = 'GET_ALLTAGS_SUCCESS'
const CREATE_CLASS_SUCCESS = 'CREATE_QUE_SUCCESS'
const GET_CLASS_SUCCESS = 'GET_CLASS_SUCCESS'
const GET_CLASS_NAME_SUCCESS = 'GET_CLASS_NAME_SUCCESS'
const GET_CLASS_DETAIL_SUCCESS = 'GET_CLASS_DETAIL_SUCCESS'
const DISPATCH_SUCCESS = 'DISPATCH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const OPEN_MODAL = 'OPEN_MODAL'
const POSTDATA = 'POSTDATA'
// const LOAD_DATA = 'LOAD_DATA'
const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: '',
    paperList: [],
    testList: [],
    classList: [],
    classDetail: {},
    createPaper: {},
    queList: {},
    allTags: {},
    nowPaperId: '',
    refreshPaperDetail: true,
    isAllQue: false,
    showModal: false,
    postdata: {},
    loading: false
}
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

// reducer
export function teacher(state = initState, action) {
    // console.log(action.payload, 'teacher action')
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                msg: action.type,
                showModal: action.payload
            }
        case POSTDATA:
            return {
                ...state,
                msg: action.type,
                postdata: action.payload
            }
        case GET_PAPER_SUCESS:
            return {
                ...state,
                msg: action.type,
                redirectTo: getTeacherRedirectPath('paper'),
                paperList: action.payload,
                refreshPaperDetail: false
            }
        case GET_TEST_SUCCESS:
            return {
                ...state,
                msg: action.type,
                redirectTo: getTeacherRedirectPath('test'),
                testList: action.payload
            }
        case DISPATCH_SUCCESS:
            return {
                ...state,
                msg: action.type,
                // redirectTo: getTeacherRedirectPath('test'),
                testList: action.payload,
                loading: false
            }
        case GET_CLASS_SUCCESS:
            return {
                ...state,
                msg: action.type,
                redirectTo: getTeacherRedirectPath('class'),
                classList: action.payload
            }
        case GET_CLASS_NAME_SUCCESS:
            return {
                ...state,
                msg: action.type,
                classList: action.payload
            }
        case GET_CLASS_DETAIL_SUCCESS:
            return {
                ...state,
                msg: action.type,
                redirectTo: getTeacherRedirectPath('classDetail', action.payload.classData.classId),
                classDetail: action.payload
            }

        case CREATE_CLASS_SUCCESS:
            return {
                ...state,
                msg: action.type,
                classList: action.payload
            }
        case DELETE_PAPER_SUCCESS:
            return {
                ...state,
                msg: action.type,
                redirectTo: getTeacherRedirectPath('paper'),
                paperList: action.payload
            }
        case CREATE_PAPER_SUCCESS:
            return {
                ...state,
                msg: action.type,
                redirectTo: getTeacherRedirectPath('paperDetail', action.payload.resPaper[0].paperId),
                createPaper: action.payload,
                queList: {},
                nowPaperId: action.payload.resPaper[0].paperId,
            }
        case UPDATE_PAPER_SUCCESS:
            return {
                ...state,
                msg: action.type,
                redirectTo: getTeacherRedirectPath('paperDetail', action.payload.paperId),
                queList: action.payload,
                isAllQue: false,
                nowPaperId: action.payload.paperId,
            }
        case GET_PAPER_DETAIL_SUCCESS:
            return {
                ...state,
                msg: action.type,
                redirectTo: getTeacherRedirectPath('paperDetail', action.payload.paperId),
                queList: action.payload,
                nowPaperId: action.payload.paperId,
                isAllQue: false,
            }
        case GET_ALLQUE_SUCCESS:
            return {
                ...state,
                msg: action.type,
                redirectTo: getTeacherRedirectPath('allQue', action.payload.paperId),
                nowPaperId: action.payload.paperId,
                queList: action.payload,
                isAllQue: true,
            }
        case CREATE_QUE_SUCCESS:
            return {
                ...state,
                msg: action.type,
                queList: action.payload,
                loading: false
            }
        case DELETE_QUE_SUCCESS:
            return {
                ...state,
                queList: action.payload,
                msg: action.type,
            }
        case UPDATE_QUE_SUCCESS:
            return {
                ...state,
                queList: action.payload,
                msg: action.type,
            }
        case GET_ALLTAGS_SUCCESS:
            return {
                ...state,
                msg: action.type,
                allTags: action.payload,
                loading: false
            }
        case ERROR_MSG:
            return {
                ...state,
                msg: action.msg
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

// function getSuccessAndNotice(data, type, msg) {
//     openNotification2()
//     return {
//         type: type,
//         payload: data
//     }
// }

function operateSuccess(data, type) {
    return {
        type: type,
        payload: data
    }
}

function postSuccess(data, type, msg) {
    openNotification('success', msg)
    return {
        type: type,
        payload: data
    }
}

function errorMsg(msg) {
    openNotification('error', msg)
    return {
        msg,
        type: ERROR_MSG
    }
}

export function openModal(data, postData) {
    return dispatch => {
        dispatch(operateSuccess(data, 'OPEN_MODAL'))
        // console.log(postData)
        if (postData) {
            dispatch(operateSuccess(postData, 'POSTDATA'))
        }
    }
}

export function getPaperList() {
    return dispatch => {
        axios.get('/api/teacher/paperList')
            .then(res => {
                // console.log('res304')
                if ((res.status == 200) && res.data.errno === 0) {
                    // console.log('res.data.data',res.data.data)
                    dispatch(getSuccess(res.data.data, 'GET_PAPER_SUCESS', '获取列表成功'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}

export function gotoQue() {
    return dispatch => {
        axios.post('/api/teacher/allQue', {})
            .then(res => {
                if (res.status == 200 && res.data.errno === 0) {
                    let data = {
                        listData: res.data.data,
                        paperId: -1
                    }
                    dispatch(postSuccess(data, 'GET_ALLQUE_SUCCESS', '成功获取题目'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}

export function getTestList() {
    return dispatch => {
        axios.get('/api/teacher/testList')
            .then(res => {
                if ((res.status == 200 || res.status == 304) && res.data.errno === 0) {
                    // console.log(res.data.data,'res.data.data')
                    dispatch(getSuccess(res.data.data, 'GET_TEST_SUCCESS', '获取列表成功'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }

}

export function dispatchTest(postdata) {
    return dispatch => {
        axios.post('/api/teacher/dispatch', postdata)
            .then(res => {
                if ((res.status == 200 || res.status == 304) && res.data.errno === 0) {
                    // console.log(postdata, 'postdata')
                    dispatch(getSuccess(res.data.data, 'DISPATCH_SUCCESS', '派发试卷成功'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}

export function createClass(postdata) {
    return dispatch => {
        axios.post('/api/teacher/createClass', postdata)
            .then(res => {
                if (res.status == 200 && res.data.errno === 0) {
                    dispatch(postSuccess(res.data.data, 'CREATE_CLASS_SUCCESS', '新增课堂成功'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}

export function getClassList() {
    return dispatch => {
        axios.get('/api/teacher/classList')
            .then(res => {
                if (res.status == 200 && res.data.errno === 0) {
                    dispatch(getSuccess(res.data.data, 'GET_CLASS_SUCCESS', '获取课堂列表成功'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}
export function getClassName() {
    return dispatch => {
        axios.get('/api/teacher/classList')
            .then(res => {
                if (res.status == 200 && res.data.errno === 0) {
                    dispatch(getSuccess(res.data.data, 'GET_CLASS_NAME_SUCCESS', '获取课堂列表成功'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}
export function getClassDetail(postdata) {
    return dispatch => {
        axios.post('/api/teacher/classDetail', {
                classId: postdata.classId
            })
            .then(res => {
                if ((res.status == 200 || res.status == 304) && res.data.errno === 0) {
                    console.log(postdata, 'postdata')
                    dispatch(getSuccess(res.data.data, 'GET_CLASS_DETAIL_SUCCESS', '获取课堂成功'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}

export function createPaper(postdata) {
    return dispatch => {
        axios.post('/api/teacher/createPaper', postdata)
            .then(res => {
                if (res.status == 200 && res.data.errno === 0) {
                    dispatch(postSuccess(res.data.data, 'CREATE_PAPER_SUCCESS', '创建试卷成功'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}

export function updatePaper(postdata) {
    return dispatch => {
        axios.post('/api/teacher/updatePaper', postdata)
            .then(res => {
                if (res.status == 200 && res.data.errno === 0) {
                    // console.log(res.data.data, 'updatepaper')
                    let data = {
                        listData: res.data.data.paperData,
                        questionIdarr: res.data.data.questionIdarr,
                        paperId: res.data.data.paperId
                    }
                    dispatch(postSuccess(data, 'UPDATE_PAPER_SUCCESS', '更新试卷成功'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}

export function deletePaperQue(postdata) {
    return dispatch => {
        axios.post('/api/teacher/deletePaperQue', postdata)
            .then(res => {
                if (res.status == 200 && res.data.errno === 0) {
                    // console.log(res.data.data,'updatepaper')
                    let data = {
                        listData: res.data.data.paperData,
                        questionIdarr: res.data.data.questionIdarr,
                        paperId: res.data.data.paperId
                    }
                    dispatch(postSuccess(data, 'UPDATE_PAPER_SUCCESS', '删除试卷题目成功'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}

export function getPaperDetail(paperId) {
    // console.log(paperId, 'paperid')
    return dispatch => {
        axios.post('/api/teacher/paperList/paper', {
                paperId: paperId
            })
            .then(res => {
                if (res.status == 200 && res.data.errno === 0) {
                    let data = {
                        listData: res.data.data.queData,
                        questionIdarr: res.data.data.questionIdarr,
                        paperId: paperId
                    }
                    // console.log('paper detail',res.data.data)
                    dispatch(postSuccess(data, 'GET_PAPER_DETAIL_SUCCESS', '获取试卷详情成功'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}

export function deletePaper(paperId) {
    return dispatch => {
        axios.post('/api/teacher/paperList/paperDelete', {
            paperId: paperId
        }).then(res => {
            if (res.status == 200 && res.data.errno === 0) {
                dispatch(postSuccess(res.data.data.resData, 'DELETE_PAPER_SUCCESS', '试卷已删除'))
            } else {
                dispatch(errorMsg(res.data.message))
            }
        })
    }
}
export function getAllQue(postdata) {
    return dispatch => {
        axios.post('/api/teacher/allQue', postdata)
            .then(res => {
                if (res.status == 200 && res.data.errno === 0) {
                    let data = {
                        listData: res.data.data,
                        paperId: postdata.paperId
                    }
                    dispatch(postSuccess(data, 'GET_ALLQUE_SUCCESS', '成功获取题目'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}

export function createQue(postdata) {
    return dispatch => {
        axios.post('/api/teacher/createQue', postdata)
            .then(res => {
                if (res.status == 200 && res.data.errno === 0) {
                    let data = {
                        listData: res.data.data.all,
                        queId: res.data.data.queId,
                        questionIdarr: postdata.questionIdarr
                    }
                    dispatch(postSuccess(data, 'CREATE_QUE_SUCCESS', '题目创建成功'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}

export function updateQue(postdata) {
    return dispatch => {
        axios.post('/api/teacher/updateQue', postdata)
            .then(res => {
                if (res.status == 200 && res.data.errno === 0) {
                    let data = {
                        listData: res.data.data.all,
                        questionIdarr: res.data.data.questionIdarr,
                        queId: res.data.data.queId,
                    }
                    dispatch(postSuccess(data, 'UPDATE_QUE_SUCCESS', '题目已更新'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}

export function deleteQue(postdata) {
    return dispatch => {
        axios.post('/api/teacher/deleteQue', postdata)
            .then(res => {
                if (res.status == 200 && res.data.errno === 0) {
                    let data = {
                        listData: res.data.data.all,
                        deleteTags: res.data.data.deleteTags
                    }
                    dispatch(postSuccess(data, 'DELETE_QUE_SUCCESS', '题目已删除'))
                    // console.log(res.data.data, 'DELETE deleteCount')
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}

export function getAllTags() {
    return dispatch => {
        axios.post('/api/teacher/allTags', {})
            .then(res => {
                if (res.status == 200 && res.data.errno === 0) {
                    let data = res.data.data
                    dispatch(postSuccess(data, 'GET_ALLTAGS_SUCCESS', '获取标签成功'))
                } else {
                    dispatch(errorMsg(res.data.message))
                }
            })
    }
}