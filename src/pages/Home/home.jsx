import React from 'react'
import '../../style/home.css';
import {Link} from 'react-router-dom'
import {getStore,setStore} from '../../assets/commonjs/storage';
import api from "../../api/index"; // 导入api接口
import intl from 'react-intl-universal'
import { Toast } from 'antd-mobile';
class Home extends React.Component {

   
        userNameStatus() {
            let customerNumber = getStore('customerNumber')
            if (customerNumber !== "" && customerNumber !== undefined) {
              api.account.checkStatus(customerNumber).then(res => {
                if (res) {
                  if (res.data && res.data.code === 200 && res.data.code_desc === "success") {
                    console.log(res)
                  } else if (res.data.code === 500) {
                    // toast(res.data.code_desc)
                  }
                }
        
              })
            }
          }
          showInfo(){
            Toast.info("dashdkjaskldj")
          }
    componentDidMount () {
       //判断用户是否实名
       this.userNameStatus();
      }
    render(){
        return(
            <div className="login_btn">
                首页
                <Link to="/register">{intl.get('sign')}注册</Link>

                <div onClick={this.showInfo.bind(this)}>Button</div>
            </div>
        )
    }
}
export default Home