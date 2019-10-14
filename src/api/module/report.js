/**
 * 报表模块接口列表
 */

import qs from 'qs'; // 根据需求是否导入qs模块
import base from '../base'; // 导入接口域名列表
import axios from '../request'; // 导入http中创建的axios实例

const report = {

  // 买卖方向
  direction() {
    return axios.get(`${base.sq}/person/getDictInfo?dictCode=Direction`);
  },
  // 开平仓
  tradeReportType() {
    return axios.get(`${base.sq}/person/getDictInfo?dictCode=TradeReportType`);
  },
  // 订单类型
  tradeOrderType() {
    return axios.get(`${base.sq}/person/getDictInfo?dictCode=TradeOrderType`);
  },
  // 委托单状态
  entrustRecordOrderStatus() {
    return axios.get(`${base.sq}/person/getDictInfo?dictCode=EntrustRecordOrderStatus`);
  },
  // 盈亏单状态
  profitAndLossOrderType() {
    return axios.get(`${base.sq}/person/getDictInfo?dictCode=ProfitAndLossOrderType`);
  },
  // 额度记录类型
  foReportType() {
    return axios.get(`${base.sq}/person/getDictInfo?dictCode=FoReportType`);
  },
  // 获取产品
  getProduct() {
    return axios.get(`${base.sq}/tradereport/getSymbolList`);
  },
  // 交易记录
  getTradeRecode(data){
    return axios.post(`${base.sq}/tradereport/tradeRecord`,qs.stringify(data)); 
  },
  // 委托记录
  getOrderRecode(data){
    return axios.post(`${base.sq}/tradereport/entrustRecord`,qs.stringify(data)); 
  },
  // 盈亏记录
  getProfitRecode(data){
    return axios.post(`${base.sq}/tradereport/profitAndLossRecord`,qs.stringify(data)); 
  },
  // 额度记录
  getbalanceRecode(data){
    return axios.post(`${base.sq}/tradereport/creditRecord`,qs.stringify(data)); 
  },
 
 
  

};

export default report;
