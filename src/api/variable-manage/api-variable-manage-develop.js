import request from '@/utils/request';
import { read } from 'fs';

/**
 * @desc 获取变量组列表
 */
// 登录
export const login = (params,options) => request.post('index/login', params, options)
export const agency = (params,options) => request.get('index/agency', params, options)













