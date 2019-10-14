import React, {Component} from 'react'
import intl from 'react-intl-universal'
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom'
import asyncComponent from '../utils/asyncComponent'
import { getStore } from '../assets/commonjs/storage';
import vn from '../assets/lang/lang-vn'
import en from '../assets/lang/lang-en'
const home = asyncComponent(() => import("../pages/Home/home.jsx")) 
const register = asyncComponent(() => import("../pages/Register/register.jsx")) 
const registerSucc = asyncComponent(() => import("../pages/Register/registerSucc.jsx")) 
const login = asyncComponent(() => import("../pages/Login/login.jsx")) 
const rechargeRecode = asyncComponent(() => import("../pages/recharge/rechargeRecode.jsx")) 
const test = asyncComponent(() => import("../pages/test/test.jsx")) 

const locales = {
  'vn': vn, 
  'en': en, 
}
export default class RouteConfig extends Component {
  componentDidMount() {
    this.loadLocales();
  }
  loadLocales() {
    let currentLocale = 'vn'
    if(getStore('lang')){
      currentLocale = getStore('lang')  
    }
    intl.init({
      currentLocale,
      locales   
    })
  }
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/home" exact component= {home}/>
          <Route exact path="/register"  component= {register}/>
          <Route exact path="/register/registerSucc"  component= {registerSucc}/>
          <Route exact path="/login"  component= {login}/>
          <Route exact path="/test"  component= {test}/>
          <Route exact path="/recharge/rechargeRecode"  component= {rechargeRecode}/>
          {/* <Route component= {test}/> */}
          <Redirect exact from='/' to='/home'/>
          {/* 输入 / 的时候直接跳转到test页面 */}
        </Switch>
      </Router>
    )
  }
}