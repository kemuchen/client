/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Icon, Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getAuthorityFromAuthRouters } from '@/utils/utils';
import logo from '../assets/mcsj.svg';
const noMatch = (
  <Result
    status="403"
    title="403"
    subTitle="对不起,你无权操作此页面!"
    extra={
      <Button type="primary">
        <Link to="/user/login">跳转到登录界面</Link>
      </Button>
    }
  />
);

const defaultFooterDom = <DefaultFooter copyright="2016-2020 名巢未来酒店V1.3.0" links={false} />;

const footerRender = () => {
  return (
    <>
      {defaultFooterDom}
      {}
    </>
  );
};

const BasicLayout = props => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
    currentUser,
  } = props;

  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'menu/getMenuData',
        payload: currentUser.id,
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromAuthRouters(props.authRouters, location.pathname || '/');
  return (
    <ProLayout
      logo={logo}
      menuHeaderRender={(logoDom, titleDom) => (
        <Link to="/">
          {logoDom}
          {titleDom}
        </Link>
      )}
      collapsed={props.collapsed}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: '首页',
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={footerRender}
      // menuDataRender={menuDataRender}
      menuDataRender={() => props.menuData}
      rightContentRender={() => <RightContent />}
      {...props}
      {...settings}
    >
      {/* <Authorized authority={authorized.authority} noMatch={noMatch}> */}
      <Authorized authority={authorized} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings, menu, login }) => ({
  // loading: global.loading,
  collapsed: global.collapsed,
  settings,
  menuData: menu.menuData,
  authRouters: menu.authRouters,
  currentUser: login.currentUser,
}))(BasicLayout);
