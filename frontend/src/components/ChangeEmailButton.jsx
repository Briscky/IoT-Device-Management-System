import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import axios from 'axios';

function getBackendUrl() {
    if (window.location.hostname === 'localhost') {
        return 'http://127.0.0.1:8080';
    } else {
        // 电脑的局域网 IP 地址
        return 'http://10.181.213.96:8080';
    }
}

const server = getBackendUrl();

const ChangeEmailButton = ({ setUserInfo }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        setLoading(true);
        // 准备要发送到后端的数据（只包括邮箱）
        const updateData = {
            name: localStorage.getItem("name"),
            email: values.email
        };
        
        let address = server + "/user/config/email";
        axios.post(address, updateData)
            .then(response => {
                if (response.data === 1) {
                    alert("修改成功!");
                    // 更新前端的自我介绍显示
                    if (setUserInfo) {
                        setUserInfo(prevState => ({
                            ...prevState,
                            email: values.email
                        }));
                    }
                } else if (response.data === -1) {
                    alert("该邮箱已经被注册!");
                } else {
                    alert("修改失败，请重试!");
                }
            })
            .catch(error => {
                console.error("修改信息时出错：", error);
                alert("修改失败，请检查网络并重试。");
            })
            .finally(() => {
                setLoading(false);
                setIsModalOpen(false);
            });
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={showModal}>
                修改邮箱
            </Button>
            <Modal 
                title="修改邮箱"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    name="normal_login"
                    initialValues={{ remember: true, prefix: '86' }}
                    onFinish={onFinish}
                >

                <Form.Item
                    name="email"
                    label="电子邮箱"
                    rules={[
                    {
                        type: 'email',
                        message: '无效的E-mail!',
                    },
                    {
                        required: true,
                        message: '请输入邮箱!'
                    }
                    ]}
                >
                    <Input
                    prefix={<MailOutlined />}
                    placeholder="电子邮箱"
                    />
                </Form.Item>

                <Form.Item>
                    <div style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                        确定
                    </Button>
                    <Button className="login-form-button" onClick={handleCancel}>
                        取消
                    </Button>
                    </div>
                </Form.Item>
                </Form>

            </Modal>
        </div>
    );
};

export default ChangeEmailButton;
