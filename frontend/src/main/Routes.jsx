import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import PessoaCrud from '../components/pessoas/PessoaCrud'

export default props =>
	<Switch>
		<Route exact path='/' component={Home} />
		<Route path='/users' component={UserCrud} />
		<Route path='/pessoas' component={PessoaCrud} />
		<Redirect from='*' to='/' />
	</Switch>