/**
 * amy.zhang
 * 开户 account 用户模块接口列表
 */

import qs from 'qs'; // 根据需求是否导入qs模块
import base from '../base'; // 导入接口域名列表
import axios from '../request'; // 导入http中创建的axios实例
import { getStore } from '../../assets/commonjs/storage';
import '../../assets/static-js/gt'
const account = {
  // 初始化获取visitorId
  getGeetest() {
    return axios.get(`${base.sq}/gt/register`);
  },
  //获取验证码
  sendVerifyCode(newDatas){
    return axios.post(`${base.sq}/sms/send`, qs.stringify(newDatas),{headers: {'visitorId': getStore("visitorId") }});
  },
  //注册成功
  sign(data){
    return axios.post(`${base.sq}/account/create`,qs.stringify(data))
  },
  //登录成功
  login(data){
    return axios.post(`${base.sq}/account/login`,qs.stringify(data))
  },
  //用户信息接口
  userInfo(data){
    return axios.get(`${base.sq}/person/getCustomerInfo`)
  },
  //单点登录获取gts2CustomerId
  getGtsCustomerId(data){
    return axios.get(`${base.sq}/person/getGtsCustomerId`)
  },
  //手机号码是否注册过
  phoneRegisted(data){
    return axios.post(`${base.sq}/account/checkCustomerByMobileNo`,qs.stringify(data))
  },
  //手机号码白名单
  writeList(data){
    return axios.get(`${base.sq}/mis/whitelist/validate?mobilePhone=${data}`)
  },
  //找回密码
  retrievePassword(data){
    return axios.post(`${base.sq}/account/setPassword`,qs.stringify(data))
  },
  //完善资料
  perfectInfo(data){
    return axios.post(`${base.sq}/person/updatePersionData`,qs.stringify(data))
  },
  //上传身份证
  uploadidCard(data){
    return axios.post(`${base.sq}/upload/uploadFile`,data,{ headers: {'Content-Type': 'multipart/form-data'}
     })
  },
  // 查看文件上传状态
  checkStatus(data){
    return axios.get(`${base.sq}/upload/getFileStatus?customerNumber=${data}`)
  },
  //重设密码
  resetPassword(data){
    return axios.post(`${base.sq}/account/modifyPassword`,qs.stringify(data))
  }
  

};

export default account;
