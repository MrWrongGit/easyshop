//react
import React from 'react';
import ReactDOM from 'react-dom';
//router
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
//redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
//containers
import Invalid from './container/invalid/Invalid'
import GoodsManage from './container/goodsManage/GoodsManage'
import Login from './container/login/Login'
//reducer
import rootReducer from './redux/index'

const store = createStore(rootReducer)

ReactDOM.render((
	<Provider store={store}>
	<BrowserRouter>
		<Switch>
			<Route path='/login' component={Login}></Route>
			<Route path='/goodsmanage' component={GoodsManage}></Route>
			<Route path='/invalid' component={Invalid}></Route>

			<Redirect to='/invalid'></Redirect>
		</Switch>
	</BrowserRouter>
	</Provider>
), document.getElementById('root'));
