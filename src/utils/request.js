import qs from 'qs';
import axios from 'axios';
import { checkHttpStatus, checkBackendCode } from './request-tips';
import { Message } from 'iview';
import { getQueryString } from './tools';

// 创建实例
const instance = axios.create({});

const { CancelToken } = axios;
let pending = [];

// 配置 baseURL
instance.defaults.baseURL = process.env.VUE_APP_API_BASEURL

// 设置请求默认属性
instance.defaults.timeout = 20000;
instance.defaults.headers['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
instance.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8';
instance.defaults.responseType = 'json';
// instance.defaults.transformRequest = [data => {return JSON.stringify(data)}];
// 数据序列化

const ignoreUrlList = ['/api/label/is-unique/label-code/'];

let cancelPending = config => {
  const isIgnoreUrl = ignoreUrlList.filter(item => config.url.indexOf(item) > -1).length > 0;
  pending.forEach((item, index) => {
    if (!isIgnoreUrl) {
      if (config) {
        if (item.UrlPath === config.url) {
          item.Cancel(); // 取消请求
          pending.splice(index, 1); // 移除当前请求记录
        }
      } else {
        item.Cancel(); // 取消请求
        pending.splice(index, 1); // 移除当前请求记录
      }
    }
  });
};

// 请求发送之前的拦截处理
instance.interceptors.request.use(
  config => {
    // 发起请求时，取消掉当前正在进行的相同请求
    // 过滤某些需要同时发多次的请求
    cancelPending(config);
    config.cancelToken = new CancelToken(res => {
      pending.push({ UrlPath: config.url, Cancel: res });
    });
    // 统一设置 token
    if (window.localStorage.getItem('backtoken')) {
      config.headers['token'] = window.localStorage.getItem('backtoken')
    }
    // 合并自定义的 header
    config.headers = Object.assign({}, config.headers, config.customHeaders);
    // 单独设置 baseURL
    if (config.customHeaders && config.customHeaders.baseUrl) {
      config.baseURL = config.customHeaders.baseUrl;
    }
    if (config.url === 'sys/login' || config.url === 'getVfcode' || config.url === 'productlabel/insert' || config.url === 'productlabel/delete') {
    } else {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    }
    // 单独设置 responseType
    if (config.customHeaders.responseType) {
      config.responseType = config.customHeaders.responseType;
    }
    // 单独设置 timeout
    if (config.customHeaders && config.customHeaders.timeout) {
      config.timeout = config.customHeaders.timeout;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 请求完成之后的拦截处理
instance.interceptors.response.use(
  response => {
    cancelPending(response.config);
    return response;
  },
  error => Promise.resolve(error.response)
);

export default {
  get(url, params, options) {
    return instance({
      method: 'get',
      url,
      params,
      customHeaders: {...options },
    })
      .then(response => checkHttpStatus(response))
      .then(res => checkBackendCode(res))
      .catch(err => {
        // 可配置需不需要要自动报错 默认会自动报错 如不需要 需在请求中明确将 hideError 设置为 false
        if (options && options.hideAutoError) {
          return Promise.reject(err);
        } else {
          Message.destroy();
          Message.error(err.message);
          return Promise.reject(err);
        }
      });
  },
  post(url, data, options) {
    return instance({
      method: 'post',
      url,
      data:url === 'sys/login'?data:(url === 'getVfcode'?data:(url === 'productlabel/insert'?data:(url === 'productlabel/delete'?data:qs.stringify(data)))), // post 请求时带的参数 叫 'data'
      customHeaders: {...options },
    })
      .then(response => checkHttpStatus(response))
      .then(res => checkBackendCode(res))
      .catch(err => {
        // 可配置需不需要要自动报错 默认会自动报错 如不需要 需在请求中明确将 hideError 设置为 false
        if (options && options.hideAutoError) {
          return Promise.reject(err);
        } else {
          Message.destroy();
          Message.error(err.msg);
          return Promise.reject(err);
        }
      });
  },
};
