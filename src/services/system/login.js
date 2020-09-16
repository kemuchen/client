import request from '@/utils/request';
export async function fakeAccountLogin(params) {
  return request.post('/api/system/login', {
    data: params
  });
}
