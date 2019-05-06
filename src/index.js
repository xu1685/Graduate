import React from 'react';
import ReactDOM from 'react-dom';
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux'
import thunk from 'redux-thunk'
import {
    Provider
} from 'react-redux'
import {
    BrowserRouter,
    Route,
    Redirect,
    Switch
} from 'react-router-dom'

import './config'
import reducers from './reducer'
import Login from './container/login/login'
import Register from './container/register/register'
import Student from './container/studentPage/studentPage'
import Teacher from './container/teacherPage/teacherPage'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

// console.log('index store',store)

ReactDOM.render(
    (<Provider store={ store }>
        <BrowserRouter>
            <div>
                <Route path='/student' component={ Student }></Route>
                <Route path='/teacher' component={ Teacher }></Route>
                <Route path='/login' component={ Login }></Route>
                <Route path='/register' component={ Register }></Route>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);