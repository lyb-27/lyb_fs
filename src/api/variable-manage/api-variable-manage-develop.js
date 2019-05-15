import request from '@/utils/request';
import { read } from 'fs';

/**
 * @desc 获取变量组列表
 */
// 获取验证码
export const sendCoding = (params,options) => request.post('getVfcode', params, options)
// 登录
export const login = (params,options) => request.post('sys/login', params, options)
// 获取左侧的菜单导航
export const menuNav = (params,options) => request.get('sys/menu/nav', params, options)
// 获取上边的渠道
export const getChannel = (params,options) => request.get('productsalechannel/list', params, options)
// 获取所有的产品
export const getAllInvest = (params,options) => request.get('invest/product/list',params,options)
// 获取产品的详情
export const getInvestDetails = (params,options) => request.post('invest/product/info',params,options)
// 获取所有的白名单
export const getAllWhiteList = (params,options) => request.get('whitelist/num',params,options)
// 添加标签
export const getAddInvestLabel = (params,options) => request.post('productlabel/insert',params,options)
// 获取所有的标签
export const getAllLabelLists = (params,options) => request.get(`productlabel/info/${params.id}`,{},options)
// 删除标签
export const getDeleteLabel = (params,options) => request.post('productlabel/delete',params,options)
// 获取所有的销售渠道
export const getProductsalechannel = (params,options) => request.get('productsalechannel/list', params,options)
// 获取所有的白名单
export const getWhiteLists = (params,options) => request.get('whitelist/num',params,options)
// 获取天交所的所有产品
export const gettjInvestProduct = (params,options) => request.get('invest/product/tjinfo',params,options)












