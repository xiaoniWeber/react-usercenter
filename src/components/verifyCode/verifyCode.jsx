
import React from 'react'
import api from "../../api/index"; // 导入api接口
import intl from 'react-intl-universal'
import {getStore,setStore} from '../../assets/commonjs/storage';
import initGeetest from '../../assets/static-js/gt.js'
import { Toast } from 'antd-mobile';
import PropTypes from 'prop-types'
import '../../style/verifyCode.scss'
class VerifyCode extends React.Component {
   constructor(props){
       super(props)
   }
    static propTypes = {
        // phoneNumber: PropTypes.bool.isRequired,
        getVerify:PropTypes.func.isRequired,
      }
    state ={
        getVerifyAble:false,
        pageLable:false,
        computedTime:0,
        mobilePhonePrefix:84,
        phoneTip:intl.get('getVerify.phoneTip'),
        focusnewIndex:0,
    }
    getVerifyData(event){
        this.props.getVerify(event.target.value)
    }
      //初始化验证码
      initVerifyCode(){
        let _this = this;
         api.account.getGeetest({}).then(res => {
                // console.log(res);
                if(res.data && res.data.code === 200 &&res.data.data.success === 1){
                    let data = res.data.data
                    setStore("visitorId", data.visitorId)
                    // 调用 initGeetest 进行初始化
                    // 参数1：配置参数
                    // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
                    initGeetest({
                        // 以下 4 个配置参数为必须，不能缺少
                        gt: data.gt,
                        challenge: data.challenge,
                        offline: !data.success, // 表示用户后台检测极验服务器是否宕机
                        new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
                        product: "bind", // 产品形式，包括：float，popup
                        width: "300px",
                        lang:"en"
                    },function (captchaObj) {
                        
                        _this.refs.getVerifyCode.onclick = function(){
                               if(!_this.props.phoneNumber){
                                Toast.info(_this.state.phoneTip );
                                    return
                                  }{
                                     captchaObj.verify();
                                     
                                  }  
                            }
                        
                            captchaObj.onSuccess(function () {
                                let result = captchaObj.getValidate();
                                //发送验证码
                                  let datas = {
                                    'mobilePhonePrefix':_this.state.mobilePhonePrefix,
                                     'mobilePhone': _this.props.phoneNumber,
                                    }
                                  let newDatas = {...datas,...result}
                                   // 或者
                                   // let newDatas = Object.assign({},datas,result)
                               api.account.sendVerifyCode(newDatas).then(res => {
                                //    console.log(res)
                                   if(res.data.code === 200){
                                    Toast.info(res.data.code_desc);
                                      // 倒计时
                                      _this.setState({"getVerifyAble":true})
                                      _this.setState({"computedTime":60})
                                        _this.timer = setInterval(() => {
                                            _this.setState({"computedTime":_this.state.computedTime - 1})
                                            if (_this.state.computedTime === 0) {
                                                clearInterval(_this.timer)
                                                _this.setState({"getVerifyAble":false})
                                           
                                            }
                                        }, 1000)
                                   }else if(res.data.code === 500){
                                    Toast.info(res.data.code_desc); 
                                   }
                               });
                              
                            })
                     }
                    )
            
                    
            
        
                
             }
         })
    }
    showTime(){
        if(this.state.computedTime){
            return <span>{this.state.computedTime}s</span>
        }else{
            return <span>{intl.get('getVerify.getCode')}</span>
        }
    }
    changeBorder(index){
        this.setState({"focusnewIndex":index})
    }
    componentDidMount () {
        this.initVerifyCode()
        if(this.props.location.pathname === '/register' || this.props.location.pathname === '/forget'){
          
            this.setState({"pageLable":true})
        }
    }
    render(){
        return(
            <div  className={['input_container',this.state.focusIndex === 3?'input_focus':'',this.state.errorIndex === 3 ?'input_error':''].join(' ')}>
               <section className={`code_number left_area`}>
                    <section className="code_top">
                        <span>{intl.get('getVerify.code')}</span>
                        <button type="button" disabled={this.state.getVerifyAble} 
                        className="get_identify" ref="getVerifyCode">
                            {this.showTime()}
                        </button>
                    </section>
                    <input type="text" 
                        className={this.state.pageLable === true ?'special':''}
                        placeholder={intl.get('getVerify.codePlace')}
                         onFocus={this.changeBorder.bind(this,3)}
                        onChange ={this.getVerifyData.bind(this)}
                        maxLength="4"
                    />  
                </section>
                 

            </div>
        )
    }
}
export default VerifyCode