import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router'
import FastClick from 'fastclick'
import * as serviceWorker from './serviceWorker';
import {AppContainer} from 'react-hot-loader'
import './config/rem'
import "./style/common.scss"
import 'antd-mobile/dist/antd-mobile.css';
FastClick.attach(document.body)
const render = Component => {
  ReactDOM.render(
        <AppContainer>
          <Component/>
        </AppContainer>,
    document.getElementById('root')
  )
}

render(Route)


serviceWorker.unregister();
