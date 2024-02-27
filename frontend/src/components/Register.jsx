import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import './Register.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function getBackendUrl() {
    if (window.location.hostname === 'localhost') {
        return 'http://127.0.0.1:8080';
    } else {
        // 电脑的局域网 IP 地址
        return 'http://10.181.213.96:8080';
    }
}

const server = getBackendUrl(); 

class Register extends React.Component {
    /*constructor(props) {
        // 调用父类（React.Component）的构造函数，允许你在构造函数中可以使用 this.props
        super(props);
    }*/

    // 这将确保调用 onFinish 方法时，方法内的 this关键字指向当前组件实例
    onFinish = (values) => {
        console.log('Received values of form: ', values);
        let address = server + "/user/register"; // Update with your actual register endpoint
        axios.post(address, values).then(response => {
            if (response.data === 1) {
                // You should implement authentication and redirect logic based on your backend response
                alert("注册成功！请登录！");
                // Redirect to home page
                this.props.navigate('/login');
            } else if (response.data === -1) {
                // Handle login failure
                alert("该用户名已被注册！" );
            } else if (response.data === -2) {
                // Handle login failure
                alert("该邮箱已被注册！" );
            }
        });
    }

    goToLogin = () => {
        console.log("Go to login page");
        // Redirect to login page
        this.props.navigate('/login');
    }

    render() {
        return (
            <div className="container">
                <Form
                    name="normal_register"
                    className="register-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                >
                    <Form.Item name={"title"}>
                        <h1>注册</h1>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[
                            { required: true, message: '请输入您的用户名!' },
                            { min: 6, message: '用户名至少为6个字符' }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                        />
                    </Form.Item>
                    
                    <Form.Item
                        name="email"
                        rules={[
                            { type: 'email', message: '请输入合法的邮箱地址!' },
                            { required: true, message: '请输入您的邮箱!' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: '请输入您的密码!' },
                            { min: 6, message: '密码至少为6个字符' }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            注册
                        </Button>
                        或者
                        <a onClick={this.goToLogin}>已有帐户？点此登录!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

// 这是一个新的函数组件，它将使用 useNavigate 钩子
function RegisterWithNavigate(props) {
    let navigate = useNavigate();
  
    return <Register {...props} navigate={navigate} />;
  }

export default RegisterWithNavigate;
