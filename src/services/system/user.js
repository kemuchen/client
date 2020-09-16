import request from '@/utils/request';

/**
 * 获取用户
 * @param {*} params 
 */
export async function getUsers(params) {
  return request.get('/api/system/users', {
    params: params, 
  });
}

/**
 * 获取所有角色
 * @param {*} params 
 */
export async function getAllRoles(params) {
  return request.get('/api/system/role/roles', {
    params: params,
  });
}

/**
 * 获取用户角色
 * @param {*} userId 
 */
export async function getUserRoles(userId) {
  return request.get('/api/system/role/roles/' + userId);
}

/**
 * 保存用户角色
 * @param {*} params 
 */
export async function updateUserRoles(params) {
  return request.put('/api/system/role/userRoles', { 
    data: params 
  });
}

/**
 * 更新用户
 * @param {*} params 
 */
export async function updateUser(params) {
  return request.put('/api/system/user', {
    data: params,
  });
}

/**
 * 删除用户
 * @param {*} params 
 */
export async function deleteUser(params) {
  return request.delete('/api/system/user', {
    params: params,
  });
}

/**
 * 新增用户
 * @param {*} params 
 */
export async function addUser(params) {
  return request.put('/api/system/userWithRole', {
    data: params,
  });
}

/**
 * 重置密码
 * @param {*} params 
 */
export async function setPassword(params) {
  return request.post('/api/system/user/resetPassword', {
    data: params,
  });
}
