import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';

const ChangeIntroButton = ({ setUserInfo }) => {
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
        setUserInfo(prevState => ({
            ...prevState,
            introduce: values.introduce
        }));
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={showModal}>
                修改自我介绍
            </Button>
            <Modal 
                title="修改自我介绍"
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
                    name="introduce"
                    label="自我介绍"
                >
                    <Input.TextArea placeholder="自我介绍" />
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

export default ChangeIntroButton;
