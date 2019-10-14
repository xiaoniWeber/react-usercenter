import qs from 'qs'; // 根据需求是否导入qs模块
import base from '../base'; // 导入接口域名列表
import axios from '../request'; // 导入http中创建的axios实例

const bankCard = {
  // 获取银行列表
  getBankList(data) {
    return axios.get(`${base.sq}/person/getDictInfo?dictCode=${data}`);
  },
  //获取省份列表
  getProvince(){
      return axios.get(`${base.sq}/person/getProvincesByCountry?country=ISO_3166_704`)   //ISO_3166_704 越南
  },
  //获取城市列表
  getCity(data){
      return axios.get(`${base.sq}/person/getCitiesByProvince?province=${data}`)   
  },
  //新增银行卡
  bankInfoSub(data){
    return axios.post(`${base.sq}/person/addBank`,qs.stringify(data))
  },
  //查询银行卡状态
  checkBankStatus(){
    return axios.get(`${base.sq}/person/getCustomerBankList`)
  },
  //查询可提现金额
  checkAccountMoney(data){
    return axios.get(`${base.sq}/withdraw/getAdvisableCredit?gts2AccountId=${data}`)
  },
  //解绑
  unbindCard(data){
    return axios.post(`${base.sq}/person/unbindBank`,qs.stringify(data))
  },
  //提现
  withDraw(data){
    return axios.post(`${base.sq}/withdraw/addWithdraw`,qs.stringify(data))
  },
  //提现记录
  withdrawRecode(data){
    return axios.get(`${base.sq}/withdraw/getWithdrawProposalList?${qs.stringify(data)}`)
  },
   //佣金接口
  withdrawFee(data){
    return axios.get(`${base.sq}/withdraw/getWithdrawFeeList?${qs.stringify(data)}`)
  },
 
  
};

export default bankCard
