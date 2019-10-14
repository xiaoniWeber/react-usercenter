/**
 * api接口的统一出口
 */
// 测试接口
import topicList from './module/topicList';
// 账户模块接口
import account from './module/account';
// 充值模块接口
import recharge from './module/recharge';
// 银行卡模块
import bankCard from './module/bankCard';
//公告模块
import message from './module/message';
//报表模块
import report from './module/report';
// 其他模块的接口……

// 导出接口
export default {
  topicList,
  account,
  recharge,
  bankCard,
  message,
  report
  // ……
};
