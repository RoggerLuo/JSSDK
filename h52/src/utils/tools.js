
// 获取链接上的数据
export const getUrlParams = (path) => {
  let href = path || window.location.href;
  var hash = href.split('?');
  var url = hash[1];
  if (hash.length > 2) {
    url = hash[1] + '&' + hash[2];
  }
  if (!url) return {};
  let query = {},
    strs;
  if (url.indexOf("&") > -1) {
    strs = url.split("&");
    for (var i = 0; i < strs.length; i++) {
      query[strs[i].split("=")[0]] = strs[i].split("=")[1];
    }
  } else {
    var key = url.substring(0, url.indexOf("="));
    var value = url.substr(url.indexOf("=") + 1);
    query[key] = decodeURI(value);
  }
  return query;
};

export const validateDate = (date) => {
  if(!date)
    return '';
  if(typeof date === 'number')
    return date;
  // console.log(date.replace(/-/g, '/'))
  return date.replace(/-/g, '/');
};

export const formatDate = (date, noTimeFlag, format) => {
  date = validateDate(date);
  if(!date)
    return '';
  let formatStr = format ? format : noTimeFlag ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm';
  return global.moment(new Date(date)).format(formatStr);
};

export const getDateTime = (date) => {
  date = validateDate(date);
  if(!date)
    return 0;
  return new Date(date).getTime();
};

export const fetchSuccess = (res) => {
  if(!res || (!res.hasError && res.data)){
    return true;
  }
  return false;
}
