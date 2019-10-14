import React from 'react'
import '../../style/register.scss';
import Header from '../../components/header/header'
import VerifyCode from '../../components/verifyCode/verifyCode'
import intl from 'react-intl-universal'
import { Toast } from 'antd-mobile';
import api from "../../api/index"; // 导入api接口
import {setStore} from '../../assets/commonjs/storage'
class Register extends React.Component {
    constructor(){
        super()
        this.state = {
            focusIndex:0,
            showPassword:false,
            errorIndex:0,
            showCloseBtn:false,
            focusLabel:true,
            phoneNumber:'',
            passWord:'',
            phoneCode:'',
            idCard:'',
            colorChange:false,
            phoneTip:{formWrong:intl.get('register.phoneTipform'),errorInfo:intl.get('register.phoneTipErr')},
            idTip:intl.get('register.idTip'),
            passwordTip:intl.get('register.passwordTip'),
            phoneForm:false,
            writeListNumber:false,
            passwordForm:false,
            idCardForm:false,
            mobilePhonePrefix:84,
            sourcePara:''
        }       
        
    }
    // 改变border颜色
    changeBorder(index) {
        if(index === 1){
            this.setState({"showCloseBtn":true})
        }else{
            this.setState({"showCloseBtn":false})
        }
        this.setState({"focusLabel":false})
        this.setState({"focusIndex":index})
    }
    showImg(){
        if(this.state.showPassword === false){
            return  <img src={require('../../assets/images/register/close-code.png')} alt="" />
        }else{
            return <img  src={require('../../assets/images/register/open-code.png')}  alt="" />
        }
    }
    handlePhoneChange(event){
        const {value} = event.target
        const reg = /^1([0-9]*)?$/
        if((reg.test(value))){
            this.setState({phoneNumber: value});
        }
        if(value.length>9){
            this.setState({phoneNumber:value.slice(0,9)})
        }
        if(this.state.phoneNumber === "0"){
            Toast.info(intl.get('register.zeroInfo'))
            this.setState({phoneNumber:""})
        }
       
    }
    handlePasswordChange(event){
        this.setState({passWord: event.target.value});
    }
    checkPhone(index){
             const phoneRegex = /\d{9}$/;
            //手机格式验证
            if(this.state.phoneNumber === null || this.state.phoneNumber ===""){
                this.setState({phoneNumber:false})
            }
             if(!phoneRegex.test(this.state.phoneNumber) && this.state.phoneNumber != null && this.state.phoneNumber !="" ){
                this.setState({"errorIndex":index})
                this.setState({"phoneForm":false})
               Toast.info(this.state.phoneTip.formWrong);
               //手机号码白名单
            }else if(this.writeList(this.state.phoneNumber)){
                this.setState({focusIndex:0})   
             }else{
                this.setState({focusIndex:0})
            }
    }
    clearText(){
        this.setState({phoneNumber:""})
    }
    checkPassword (index){
        const wordRegex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,16}$/
        if(!wordRegex.test(this.state.passWord) && this.state.passWord != null && this.state.passWord !=""){
            this.setState({errorIndex:index})
            Toast.info(this.state.passwordTip)
        }else{
            this.setState({passwordForm:true})
            this.setState({errorIndex:''})
        }
    }
    writeList(data){
        let _this = this;
        api.account.writeList(data).then(res => {
              // console.log(res)
              if(res.data && res.data.code === 200 && res.data.code_desc === "success"){
                this.setState({writeListNumber:true})
                  return true
              }
          }).then(res => {
              if(_this.state.writeListNumber === false){
                   let phoneData = {
                      mobilePhonePrefix:_this.state.mobilePhonePrefix,
                      mobilePhone:_this.state.phoneNumber
                  }
                 _this.checkPhoneRegisted(phoneData)
              }
             
          });
      }
      checkPhoneRegisted(phoneData){
        let _this = this;
        api.account.phoneRegisted(phoneData).then(res => {
            if(res.data && res.data.code === 200){
                //没有注册过
                _this.setState({phoneForm:true})
                // console.log("没有注册过")
            }else if(res.data && res.data.code === 500){
                //注册过
                Toast.info(res.data.code_desc)
                _this.setState({phoneForm:false})
                return 
            }
        });
    }
    checkPhoneForm(event){
        // this.setState({phoneNumber:(/[\d]/.test(String.fromCharCode(event.keyCode)))}) 
    }
     //密码隐藏显示切换
     changePassWordType(){
        this.setState({"showPassword":!this.state.showPassword})
        this.showImg()
    }
    showCloseBtn(){
        if(this.state.showCloseBtn){
            return   <section className={`icon_input clear_text`} onClick={this.clearText.bind(this)}>
                        <img src={require("../../assets/images/register/close.png")} alt="" />
                    </section>
        }else{
            return ''
        }
    }
    handleIdNumber(event){
        this.setState({idCard: event.target.value});
        if(event.target.value.length>12){
            let value = event.target.value.slice(0,12)
            return value
        }
     
    }
    checkIdCard(index){
        const idRegex = /\d{12}$/;
              if(!idRegex.test(this.state.idCard) && this.state.idCard != null && this.state.idCard !=""){
                this.setState({errorIndex: index});
               Toast.info(this.state.idTip );
               //手机号码白名单
            }else{
                this.setState({idCardForm:true})
                this.setState({focusIndex: 0});
            }
    }
    getVerify(value){
        this.setState({"phoneCode":value})
    }
    goBack = () => {
        this.props.history.goBack()
    } 
    singin(){
        if(this.phoneForm === false){
            Toast.info(this.phoneTip.errorInfo );
           return
        }
        if(this.passwordForm === false){
            Toast.info(this.passwordTip );
           return
        }else if(this.idCardForm === false){
            Toast.info(this.idTip );
           return 
        }
        let pramas ={
            mobilePhonePrefix:this.state.mobilePhonePrefix,
            mobilePhone:this.state.phoneNumber,
            code:this.state.phoneCode,
            password:this.state.passWord,
            value:this.state.idCard,
            href:this.state.sourcePara
        }
          api.account.sign(pramas).then(res => {
            this.setState({colorChange:true})
            if(res.data && res.data.code === 200 && res.data.code_desc === "success"){

                    setStore('customerNumber',res.data.data.customerNumber)
                    setStore('password',res.data.data.password)
                    this.props.history.push('/registerSucc')

              }else{
                this.setState({colorChange:false})
                Toast.info(res.data.code_desc)
              }
                
          }) 
    }
    componentWillMount() {
        this.sourcePara = this.props.location.search;
    } 
    // componentDidUpdate(prevState){
        
    //     if(this.state.phoneNumber && this.state.passWord && this.state.phoneCode && this.state.idCard){
    //         console.log("密码可以了")
    //         this.setState({colorChange:false})
    //     }
    // }
  render(){
      return(
          <div className="register_wrapper">
              <Header title={intl.get('register.sign')} goBack={this.goBack}  />
              <section className="banner_box">
                <section className="banner">
                    <img src={require("../../assets/images/register/banner.png")}  alt="" />
                </section>
              </section>
              
            <form className="registeForm">
                <section className={['input_container',this.state.focusIndex === 1?'input_focus':'',this.state.errorIndex === 1 ?'input_error':''].join(' ')}>
                    <section className="phone_number left_area">
                        <span> {intl.get('register.phone')}</span>
                        +<input readOnly  className="phone_prefix" id="phonePrefix"  value="84"  name="mobilePhonePrefix" />
                        <input 
                            onBlur={this.checkPhone.bind(this,1)} 
                            onKeyPress={ this.checkPhoneForm.bind(this)}
                            className="phone_box"  
                            placeholder={intl.get('register.phonePlace')}
                             onFocus={this.changeBorder.bind(this,1)}
                             value={this.state.phoneNumber}
                             onChange={this.handlePhoneChange.bind(this)}
                            
                             /> 
                    </section>
                    {this.showCloseBtn()}
                   
                </section>
                <section  className={['input_container',this.state.focusIndex === 2?'input_focus':'',this.state.errorIndex === 2 ?'input_error':''].join(' ')}>
                     <section className={`password_number left_area`}>
                        <span> {intl.get('register.password')}</span>
                        <input 
                        type={this.state.showPassword?'text':'password'} maxLength="16"
                         onFocus={this.changeBorder.bind(this,2)}  
                         onBlur={this.checkPassword.bind(this,2)}  
                         placeholder={intl.get('register.passPlace')}  
                         value={this.state.passWord}
                         onChange={this.handlePasswordChange.bind(this)}
                         />
                    </section>
                    <section className={`icon_input button_switch`}
                     onClick={this.changePassWordType.bind(this)} >
                        {this.showImg()} 
                    </section>
                </section>
                <VerifyCode
                  phoneNumber={this.state.phoneNumber}
                  getVerify={this.getVerify.bind(this)}
                  location={this.props.location}
                >
                </VerifyCode>
                <section className={['input_container',this.state.focusIndex === 4?'input_focus':'',this.state.errorIndex === 4 ?'input_error':''].join(' ')} >
                     <section className="left_area">
                        <span>{intl.get('register.identity')}</span>
                        <input type="text"  
                        value={this.state.idCard} 
                        placeholder={intl.get('register.identityPlace')}
                        onKeyPress={this.checkPhoneForm.bind(this)}
                        onChange={this.handleIdNumber.bind(this)}
                        onBlur={this.checkIdCard.bind(this,4)}  
                        onFocus={this.changeBorder.bind(this,4)}
                        /> 
                    </section>
                </section>
            </form>
            <button type="button" 
             disabled={this.state.colorChange} 
             className={['sub_btn', this.state.colorChange === false?'blue_btn':''].join(' ')} 
             onClick={this.singin.bind(this)}>
              {intl.get('register.sign')}
            </button>
          </div>
      )
  }
}
export default Register