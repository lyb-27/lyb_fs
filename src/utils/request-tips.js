// 根据请求报错状态码 格式化错误信息
import store from '@/store/';
function transformErrMsg(response) {
  let message = '';
  switch (response.status) {
  case 400:
    message = '错误请求';
    break;
  case 401:
    message = '未授权，请重新登录';
    break;
  case 403:
    message = '拒绝访问';
    break;
  case 404:
    message = `请求错误,未找到该资源!<br/>${response.config.url}`;
    break;
  case 405:
    message = '请求方法未允许';
    break;
  case 408:
    message = '请求超时';
    break;
  case 500:
    message = '服务器端出错';
    break;
  case 501:
    message = '网络未实现';
    break;
  case 502:
    message = '网络错误';
    break;
  case 503:
    message = '服务不可用';
    break;
  case 504:
    message = '网络超时';
    break;
  case 505:
    message = 'http版本不支持该请求';
    break;
  default:
    message = `连接错误${response.status}`;
  }
  return {
    message,
    status: response.status
  };
}
function checkHttpStatus(response) {
  // 如果 http 状态码正常，则继续判断 后端返回的码正不正常。
  if (response && (response.status === 200 || response.status === 304)) {
    return response;
  }
  if (response && response.status === 401) {
    console.log('登录过期了', 'response');
    // store.dispatch('common/parentLogin');
  }
  if (response && response.data) {
    console.log('http Status 似乎不太正常', response);
    return Promise.reject(transformErrMsg(response.data));
  }
}

function checkBackendCode(res) {
  console.log(res)
  // 如果 后端返回的码正常 则 将 res.data 返回
  if (res && res.data) {
    // if (res.data.code === 0) {
      return res.data;
    // } else {
    //   console.log('后端给出的异常:'+Promise.reject(res));
    //   return res.data;
    // }
  }
  console.log('取消上次请求了！');
}

export { checkHttpStatus, checkBackendCode };
