export const Utils = {

  // 格式化日期工具
  formatDate(data, fmt) {
    const o = {
      // 'y+': data.getFullYear() + 1,                 // 月份
      'M+': data.getMonth() + 1, // 月份
      'd+': data.getDate(), // 日
      'h+': data.getHours(), // 小时
      'm+': data.getMinutes(), // 分
      's+': data.getSeconds(), // 秒
      'q+': Math.floor((data.getMonth() + 3) / 3), // 季度
      S: data.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (`${data.getFullYear()}`).substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
      }
    }
    return fmt;
  },
  listToObjArr(list) {
    var obj = {};
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      if (!obj[item]) {
        obj[item] = [item];
      } else {
        obj[item].push(item);
      }
    }
  },
  isEmpty(str){
      return str==null||str==="";
  },
  //获取上一周时间 上一个月时间 三个月时间
   lastTime(label) {
     let systemdate = this.formatDate(new Date(), 'yyyy-MM-dd')
    let date = new Date(systemdate);
    let myyear = date.getFullYear();
    let mymonth = date.getMonth() + 1;
    let myweekday = date.getDate();
    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }
    let ymd = (myyear + "-" + mymonth + "-" + myweekday);
    let ymdEnd = ymd;
    let ymdBegin;
    ymdBegin = this.dateAdd(new Date(systemdate), -label);
    let time ={
      start:ymdBegin,
      end:ymdEnd,
    }
    return time
  },
   dateAdd(date, num) {
     if(num == -6){
       date = date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() + num);
     }else{
       date = date.setFullYear(date.getFullYear(), date.getMonth() + num, date.getDate());
     }
    date = new Date(date);
    var month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    return date.getFullYear() + "-" + month + "-" + day;
  },
  //保留两位小数
   toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x*100)/100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
},
//时区时间转换
getLocalTime(i,val){
  if(typeof i !== 'number') return 
  let d = new Date(val.replace(/-/g, "/"));
  let len = d.getTime();
  let offset = d.getTimezoneOffset() * 60000;
  let utcTime = len + offset;
        return new Date(utcTime + 3600000 * i);
}

};
export default Utils

export const getQueryString =(name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = decodeURI(window.location.search.substr(1)).match(reg);
  if (r != null)return unescape(r[2]);
  return null;
}
