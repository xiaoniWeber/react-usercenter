/**
 * article模块接口列表
 */

import qs from 'qs'; // 根据需求是否导入qs模块
import base from '../base'; // 导入接口域名列表
import axios from '../request'; // 导入http中创建的axios实例

const topicList = {
  // 新闻列表
  articleList() {
    return axios.get(`${base.sq}/topics`);
  },
  // 新闻详情,演示
  articleDetail(id, params) {
    return axios.get(`${base.sq}/topic/${id}`, {
      params,
    });
  },
  // post提交
  login(params) {
    return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));
  },
  topicList() {
    return axios.get(`${base.sq}/gt/register`);
   
  },
// 其他接口…………

};

export default topicList;
