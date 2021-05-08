import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Redirect } from 'react-router-dom';
import { WrappedFormUtils } from 'antd/lib/form/Form'
import axios from 'axios';
import './login.css'; 

interface FormFields {
  password: string;
}
interface Props {
  form: WrappedFormUtils<FormFields>;
}

class NormalLoginForm extends React.Component<Props> {
  state = {
    isLogin: false
  }
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/api/login',{password:values.password}).then(res => {
          if(res.data?.data){
            this.setState({
              isLogin: true
            })
          }else{
            message.warning(`登录失败，请重试`);
          }
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLogin } = this.state;
    return (
      isLogin ? <Redirect to="/" /> :
      <div className="login-page">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default LoginForm;
