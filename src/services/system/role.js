import request from '@/utils/request';

/**
 * 获取所有角色
 * @param {*} params
 */
export async function getRoles(params) {
  return request.get('/api/system/role/rolePage', {
    params: params,
  });
}

/**
 * 保存角色：包括修改和新增
 * @param {*} params
 */
export async function saveRole(params) {
  return request.post('/api/system/role/role', {
    params: params,
  });
}

/**
 * 删除角色
 * @param {*} params
 */
export async function deleteRole(params) {
  return request.delete('/api/system/role/role', {
    params: params,
  });
}

/**
 * 获取角色权限
 * @param {*} roleId 
 */
export async function getRoleRights(roleId) {
  return request.get('/api/system/role/roleRights/' + roleId);
}

/**
 * 更新角色权限
 * @param {*} params 
 */
export async function updateRoleRights(params) {
  return request.put('/api/system/role/roleRights', { 
    data: params 
  });
}
