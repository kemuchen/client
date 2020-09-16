const loginRet = {
  code: '1',
  data: {
    status: 'ok',
    currentUser: {
      createTime: 1583494562000,
      createUser: 0,
      email: 'minnest@169.com',
      id: 1,
      last_login_time: 1583452800000,
      login_fail_count: 1,
      loginid: 'admin',
      memo: '手动添加',
      modifyTime: 1583750850000,
      modifyUser: 0,
      password: '0cc175b9c0f1b6a831c399e269772661',
      phone: '0278886066',
      status: '1',
      user_type: '1',
      username: 'admin',
      valid: '1',
    },
    type: '',
    currentAuthority: 'admin',
  },
};

const menuRet = {
  code: '1',
  data: {
    menu: [
      {
        path: '/system',
        name: '系统管理',
        icon: 'user',
        children: [
          {
            path: '/user',
            name: '用户管理',
            icon: 'user',
          },{
            path: '/role',
            name: '角色管理',
            icon: 'user',
          }
        ],
      },
    ],
  },
};

const getUsersRet = {
  code: '1',
  data: [
    {
      key: '1',
      id: 1,
      userName: 'linlele',
      name: '林乐乐',
      department: '管理',
      post: '前台经理',
      telphone: '15271448899',
      phone: '15271448899',
      email: '1123190641@qq.com',
    },
    {
      key: '2',
      id: 2,
      userName: 'linlele',
      name: '林乐乐',
      post: '前台经理',
      telphone: '15271448899',
      phone: '15271448899',
      email: '1123190641@qq.com',
    },
  ],
};

const updateUserRet = {
  code: '1',
  data: {},
};

const getbasecofigall= {
  code: '1',
  data: [
    {
      key: '1',
      id: 1,
      name: '林乐乐',
      valid: 1,
      description: '15271448899',
      code: '15271448899',
      is_cache: 0,
    },
    {
      key: '2',
      id: 2,
      name: '林乐乐',
      valid: 1,
      description: '15271448899',
      code: '15271448899',
      is_cache: 1,
    },
    {
      key: '3',
      id: 3,
      name: '林乐乐',
      valid: 1,
      description: '15271448899',
      code: '15271448899',
      is_cache: 1,
    },
  ],
};

export default {
  'GET /api/getUsers': getUsersRet,
  'POST /api/updateUser': updateUserRet,
  'GET /api/getbase' : getbasecofigall
};
