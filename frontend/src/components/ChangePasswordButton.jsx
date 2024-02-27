import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { LockOutlined } from '@ant-design/icons';
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

const ChangePasswordButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const verifyOldPassword = (oldPassword) => {
        return axios.post(server + "/user/verify-password", { name: localStorage.getItem("name"), password: oldPassword });
    };
      

    const onFinish = (values) => {
        setLoading(true);

        verifyOldPassword(values.oldPassword).then(response => {
            if (response.data === 1) {
              // 旧密码正确，继续处理新密码的更新
              const updateData = {
                name: localStorage.getItem("name"),
                newPassword: values.newPassword
              };
        
              axios.post(server + "/user/config/password", updateData)
                .then(response => {
                  if (response.data === 1) {
                    alert("密码修改成功!");
                    // 更新密码相关逻辑
                  } else if (response.data === -1) {
                    alert("新密码和旧密码相同!");
                  }
                })
                .catch(error => {
                  console.error("修改密码时出错：", error);
                  alert("修改失败，请检查网络并重试。");
                })
                .finally(() => {
                  setLoading(false);
                  setIsModalOpen(false);
                });
            } else {
                alert("旧密码不正确!");
                setLoading(false);
                setIsModalOpen(false);
            }
          }).catch(error => {
            console.error("验证旧密码时出错：", error);
            alert("验证失败，请检查网络并重试。");
            setLoading(false);
          });
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={showModal}>
                修改密码
            </Button>
            <Modal 
                title="修改密码"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    name="change_password"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="oldPassword"
                        label="旧密码"
                        rules={[{ required: true, message: '请输入旧密码!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="旧密码" />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        label="新密码"
                        rules={[
                            { required: true, message: '请输入新密码!' },
                            { min: 6, message: '密码长度不能少于6个字符!' }
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="新密码" />
                    </Form.Item>

                    <Form.Item>
                        <div style={{ textAlign: 'center' }}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                确定
                            </Button>
                            <Button onClick={handleCancel}>
                                取消
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ChangePasswordButton;
