import request from '@/utils/request';

/**
 * 查询动态字典信息
 * @param {*} params
 */
export async function getDynamicDict(params) {
  return request.post('/api/common/getDynamicDicts', {
    params,
  });
}

/**
 * 查询静态字典
 * @param {*} params
 */
export async function getDict(params) {
  return request.get('/api/common/getDicts/' + params.dicttype);
}

export async function addWechatAds(data) {
  return request.post('/api/wechat/bannerAd', {
    data: data,
  });
}

export async function updateWechatAds(data) {
  return request.put('/api/wechat/bannerAd', {
    data: data,
  });
}
