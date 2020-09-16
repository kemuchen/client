import { Alert, Checkbox, Select, message, Input } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import LoginComponents from './components';
import styles from './style.less';
const { UserName, Password, Submit } = LoginComponents;
const { Option } = Select;

class Login extends Component {
  loginForm = undefined;
  state = {
    autoLogin: true,
    remeber: false,
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  changeRemeber = e => {
    this.setState({
      remeber: e.target.checked,
    });
  };

  /**
   * 提交登录
   */
  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: { ...values },
      });
    }
  };

  /**
   * 渲染提示信息
   */
  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { userLogin = {}, submitting } = this.props;
    const { status, errmessage } = userLogin;
    const { autoLogin, remeber } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          onSubmit={this.handleSubmit}
          onCreate={form => {
            this.loginForm = form;
          }}
        >
          {status === 'error' && this.renderMessage(errmessage)}
          <UserName name="loginid" />
          <Password
            name="password"
            onPressEnter={e => {
              e.preventDefault();
              if (this.loginForm) {
                this.loginForm.validateFields(this.handleSubmit);
              }
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Checkbox checked={remeber} onChange={this.changeRemeber}>
              记住我
            </Checkbox>
          </div>
          <Submit loading={submitting} type="danger">
            登录
          </Submit>
        </LoginComponents>
      </div>
    );
  }
}

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
