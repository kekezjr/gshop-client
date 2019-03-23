/**
 * Created by Administrator on 2019/3/21 0021.
 */
// 用来拦截ajax请求, 生成随机数据返回
import Mock from 'mockjs'
import shop from './shop.json' // json对象=>js对象
// 返回info接口
Mock.mock('/info', {code: 0, data: shop.info})
// 返回goods接口
Mock.mock('/goods', {code: 0, data: shop.goods})
// 返回ratings接口
Mock.mock('/ratings', {code: 0, data: shop.ratings})

// 不需要暴露任何东西，只需要执行一次
console.log('mock');
