import React from 'react'
import '../../style/login.scss';
import intl from 'react-intl-universal'
import Item from './components/Item'
import {setStore, getStore} from '../../assets/commonjs/storage'
import vn from '../../assets/lang/lang-vn'
import en from '../../assets/lang/lang-en'
class Login extends React.Component {
    constructor(){
        super()
        this.state = {
            mobilePhonePrefix:84, //手机区号
            showCloseBtn:false, //是否显示清除按钮
            phoneNumber:null, //电话号码
            passWord:null, //密码
            showPassword:false, //是否显示密码
            passwordType:"password", //密码默认属性值
            focusIndex:0,
            errorIndex:0,
            colorChange:true, // 登录按钮默认不能点击
            localeimg:getStore('lang'),
            lang:false,
            showLoad:false, //是否显示加载中
            initDone:false,
            changeLang: [
            
            {
                value: "vn",
                label: "VN",
                img:require('../../assets/images/user/pic_language_vn.png')
            },
            {
                value: "en",
                label: "EN",
                img:require('../../assets/images/user/pic_language_en.png')
            }
            ],
            jumpTradeUrl:'',
            locales: {
                'vn': vn, 
                'en': en, 
              }
     }
     
    }
    showLang(){
        if(this.state.lang){
            this.setState({lang:false})
        }else{
            this.setState({lang:true})
        }
       
    }
    changeBorder(index){
        if(index === 1){
            this.setState({showCloseBtn:true})
        }else{
            this.setState({showCloseBtn:false})
        }
        this.setState({focusIndex:index})

    }
    changePassWordType(){

    }
    loginIn(){

    }
    checkPhoneForm(){
    //     return (/[\d]/.test(String.fromCharCode(event.keyCode)))
    }
    showCloseBtn(){
        if(this.state.showCloseBtn){
            return <section className={`icon_input clear_text`} onClick={this.clearText.bind(this)} >
                            <img src={require("../../assets/images/register/close.png")} alt="" />
                    </section>
        }else{
            return ''
        }
           
    }
    getLang(value){
        if(value == "VN"){
            setStore('lang','vn');
          }else if(value == "EN"){
            setStore('lang','en');
          } 
           this.state.localeimg = getStore('lang')
          let currentLocale = getStore('lang') 
          let locales = this.state.locales 
          intl.init({
            currentLocale,
            locales,
          }).then(() => {
            // After loading CLDR locale data, start to render
            this.setState({initDone: true});
          });
          this.setState({lang:false})
          
      
    }
    clearText(){
        this.setState({phoneNumber:""})
    }
    handlePhoneChange(event){
        const {value} = event.target
        this.setState({phoneNumber: value});
    }
    handlepassWordChange(event){
        const {value} = event.target
        this.setState({passWord: value});
    }
    showImg(){
        if(this.state.showPassword === false){
            return  <img src={require('../../assets/images/register/close-code.png')} alt="" />
        }else{
            return <img  src={require('../../assets/images/register/open-code.png')}  alt="" />
        }
    }
    render(){
        return(
            <div>
                <section className="choice_lang" id="listWrapper">
                <section className="choice_text"  
                    onClick={this.showLang.bind(this)}>{intl.get('login.language')}：
                    {
                        this.state.localeimg == 'vn'?<img  src={require("../../assets/images/user/pic_language_vn.png")} alt="" />:<img src={require("../../assets/images/user/pic_language_en.png")} alt="" />
                    }
                    </section>
                    {
                       this.state.lang ?
                             <section className="list_wrapper"  id="lang">
                                <ul className="lang_list">
                                {
                                    this.state.changeLang.map((item,index) =>{
                                        return <Item item={item} key={index} getLang={this.getLang.bind(this)}/>
                                    })
                                }
                                </ul>
                            </section> : ''
                        
                        
                    }
                    
                    
                </section>
                    <section  className="register_wrapper">
                        <section className="banner_box">
                            <img src="~assets/images/register/login-img.png" alt=""/>
                        </section>
                        <form className="registeForm">
                            <section 
                            className={['input_container','account_wrapper',this.state.focusIndex == 1?'input_focus':'',this.state.errorIndex == 1 ?'input_error':''].join(' ')}>
                                <section className="left_area">
                                    <span>{intl.get('login.account')}</span>
                                    <input 
                                    onKeyPress={this.checkPhoneForm.bind(this)} 
                                    className="phone_box"  
                                    placeholder={intl.get('login.accountPlace')}  
                                    onFocus={this.changeBorder.bind(this,1)}
                                    value={this.state.phoneNumber}
                                    onChange={this.handlePhoneChange.bind(this)}
                                    />
                                </section>
                                {
                                    this.showCloseBtn()
                                }
                               
                            </section>
                            <section className={['input_container',this.state.focusIndex == 2 ?'input_focus': '', this.state.errorIndex == 2 ?'input_error':''].join(' ')} >
                                <section className="left_area">
                                    <span>{intl.get('login.password')}</span>
                                    <input type={this.state.showPassword?'text':'password'}  
                                     
                                      placeholder={intl.get('login.passwordPlace')}  
                                      onFocus={this.changeBorder.bind(this,2)} 
                                      value={this.state.passWord}
                                      onChange={this.handlepassWordChange.bind(this)}
                                      />
                                </section>
                                <section className={`icon_input button_switch`} 
                                  onClick={this.changePassWordType.bind(this)} >
                                       {this.showImg()} 
                                </section>
                            </section>
                        </form>
                        <button disabled={this.state.colorChange} 
                        className={['sub_btn',this.state.colorChange == false ?'blue_btn': ''].join(' ')} 
                        onClick={this.loginIn.bind(this)}>
                            {intl.get('login.submit')}
                        </button>
                        <section className="forget_btn">
                            <router-link to="/register">{intl.get('login.rigister')}</router-link>
                            <router-link to="/forget" className="forget_code">{intl.get('login.forget')}</router-link>
                        </section>
                        
                    </section>
                     <load-ing v-show="showLoad"></load-ing>
            </div>
        )
    }
}
export default Login