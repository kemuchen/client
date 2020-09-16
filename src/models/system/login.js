import { stringify } from 'querystring';
import router from 'umi/router';
import { fakeAccountLogin } from '@/services/system/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { Modal, message } from 'antd';
import Constans from '@/constans';
const { confirm } = Modal;

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    currentUser: JSON.parse(sessionStorage.getItem('currentUser')),
    errmessage: undefined,
  },
  effects: {
    // 登录
    *login({ payload }, { call, put }) {
      const responseData = yield call(fakeAccountLogin, payload);
      if (responseData.code === Constans.SUCCESS) {
        const response = responseData.data;
        if (response != undefined) {
          yield put({
            type: 'changeLoginStatus',
            payload: {
              status: 'ok',
              currentUser: response.user,
              errmessage: '',
            },
          });
          // Login successfully
          if (response.user) {
            if (response.user.user_type === '1') {
              setAuthority('admin');
            }
            sessionStorage.setItem('currentUser', JSON.stringify(response.user));
            sessionStorage.setItem('token', response.token);
            const urlParams = new URL(window.location.href);
            const params = getPageQuery();
            let { redirect } = params;
            if (redirect) {
              const redirectUrlParams = new URL(redirect);
              if (redirectUrlParams.origin === urlParams.origin) {
                redirect = redirect.substr(urlParams.origin.length);

                if (redirect.match(/^\/.*#/)) {
                  redirect = redirect.substr(redirect.indexOf('#') + 1);
                }
              } else {
                window.location.href = '/';
                return;
              }
            }
            router.replace(redirect || '/');
          }
        } else {
          yield put({
            type: 'changeLoginStatus',
            payload: {
              status: 'error',
              currentUser: {},
              errmessage: responseData.message,
            },
          });
        }
      } else {
        message.error(responseData.message);
      }
    },

    // 退出登录
    logout() {
      confirm({
        title: '确定退出登录?',
        content: '',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          sessionStorage.removeItem('currentUser');
          sessionStorage.removeItem('token');
          const { redirect } = getPageQuery(); // Note: There may be security issues, please note
          if (window.location.pathname !== '/user/login' && !redirect) {
            router.replace({
              pathname: '/user/login',
              search: stringify({
                redirect: window.location.href,
              }),
            });
          }
        },
        onCancel() {},
      });
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        currentUser: payload.currentUser,
        errmessage: payload.errmessage,
      };
    },
    saveCurrentUser(state, { payload }) {
      return { ...state, currentUser: payload.currentUser };
    },
  },
};
export default Model;
