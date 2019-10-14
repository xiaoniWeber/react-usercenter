/**
 * message模块接口列表
 */

import qs from 'qs'; // 根据需求是否导入qs模块
import base from '../base'; // 导入接口域名列表
import axios from '../request'; // 导入http中创建的axios实例

const message = {

  // 公告列表数据
  messageData(index) {
    return axios.get(`${base.sq}/notice/getNoticeList?index=${index}&pageSize=10`);
  },
  //公告类型数据
  messageList(type,size) {
    return axios.get(`${base.sq}/notice/getNoticeList?noticeType=${type}&index=1&pageSize=${size}`);
  },
  // 公告详情
  messageDetail(id) {
    return axios.get(`${base.sq}/notice/getNoticeDetail/${id}`);
  }

};

export default message;
