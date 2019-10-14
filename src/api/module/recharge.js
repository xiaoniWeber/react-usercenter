/**
 * amy.zhang
 * 充值 模块接口列表
 */

import qs from 'qs'; // 根据需求是否导入qs模块
import base from '../base'; // 导入接口域名列表
import axios from '../request'; // 导入http中创建的axios实例
import { getStore } from '../../assets/commonjs/storage';
const recharge = {
    //获取可用的支付方式列表
    paymentWay() {
        return  axios.get(`${base.sq}/fund/getPaySwitchSeqList`)
    },
    //获取汇率
    getExchangeRadio(data){
        return  axios.get(`${base.sq}/fund/getRate?${qs.stringify(data)}`)
    },
    //获取银行列表
    getbankList(data){
        return  axios.get(`${base.sq}/fund/getBankList?${qs.stringify(data)}`)
    },
    //充值
    rechargeData:function(data){
        return axios.post(`${base.sq}/fund/addDeposit`,qs.stringify(data))
    },
    //获取充值记录
    rechargeRecode:function(data){
        return axios.get(`${base.sq}/fund/getDepositProposalList?${qs.stringify(data)}`) 
    },
    //查询存款凭证记录
    rechargeBillRecode(data){
        return axios.get(`${base.sq}/fund/getCashinProposalList?${qs.stringify(data)}`) 
    },
    //根据支付code 获取银行类表
    getBankListByCode(data){
        return axios.get(`${base.sq}/fund/getBankListByPayCode?${qs.stringify(data)}`)
    },
    //提交凭证
    uploadGather(data){
        return axios.post(`${base.sq}/fund/addRechargeVoucher`,data,{ headers: {'Content-Type': 'multipart/form-data'}})
    }
};
export default recharge
