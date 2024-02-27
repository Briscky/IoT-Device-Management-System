import React from 'react';
import { Form, Input, Button, Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// function getBackendUrl() {
//     if (window.location.hostname === 'localhost') {
//         return 'http://127.0.0.1:8080';
//     } else {
//         // 电脑的局域网 IP 地址
//         return 'http://10.181.218.164:8080';
//     }
// }

// const server = getBackendUrl();
const server = "http://localhost:8080";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    onFinish = (values) => {
        console.log('Received values of form: ', values);
        let address = `${server}/user/login`; // Update with your actual login endpoint

        // Here you would need to decide whether to send the username or the email based on the filled fields.
        const loginPayload = {
            name: values.usernameOrEmail.includes('@') ? '' : values.usernameOrEmail, 
            email: values.usernameOrEmail.includes('@') ? values.usernameOrEmail : '', 
            password: values.password,
        };

        axios.post(address, loginPayload).then(response => {
            if (response.data.code === "1") {
                alert("登录成功！");
                // Perform actions on success (e.g., save the token, redirect, etc.)
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('name', response.data.name);
                this.props.navigate('/home');
            
            } else if (response.data.code === "-1") {
                // Handle failure
                alert("用户名或邮箱不存在！" );
            } else {
                // Handle failure
                alert("密码错误！" );
            }
        });
    }

    goToRegister = () => {
        this.props.navigate('/register');
    };

    render() {
        return (
        <div className="login-container">
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            >
            <Form.Item name={"title"}>
                <h1>登录</h1>
            </Form.Item>
            <Form.Item
                name="usernameOrEmail"
                rules={[
                    { required: true, message: '请输入您的用户名或邮箱!' },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username or Email"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                { required: true, message: '请输入您的密码!' },
                ]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住密码</Checkbox>
                </Form.Item>
            </Form.Item>    

            <Form.Item>
                <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={this.state.loading}
                >
                登录
                </Button>
                或者 <a onClick={this.goToRegister}>注册新账户!</a>
            </Form.Item>
            </Form>
        </div>
        );
    }
}

// 使用 useNavigate 钩子的函数组件包装器
function LoginWithNavigate(props) {
  let navigate = useNavigate();

  return <Login {...props} navigate={navigate} />;
}

export default LoginWithNavigate;
