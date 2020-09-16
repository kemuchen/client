import request from '@/utils/request';

/**
 * 根据用户id获取拥有的权限列表
 * @param {*} userid 
 */
export async function getMenuData(userid) {
  return request.get('/api/system/rights/'+ userid);
}

