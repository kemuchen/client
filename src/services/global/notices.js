import request from '@/utils/request';
export async function queryNotices() {
  let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  if (currentUser) {
    return request.get('/api/system/un_read_mssages/' + currentUser.id);
  }
}

export async function readNotice(id) {
  return request.post('/api/system/read_message', {
    data: {
      id: id
    }
  });
}
