import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Input, Icon, Button} from 'antd';
import 'antd/dist/antd.css';

class Login extends Component {
    
  render() {

    return (
      <div>
        <h1>Login Page</h1>
        <Input
          placeholder="请输入手机号"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
        <Input
          placeholder="请输入手机号"
          type="password"
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
        <Button
            type="primary"
            htmlType="submit"
          >
            Log in
          </Button>
      </div>
    )
  }
}

export default Login
