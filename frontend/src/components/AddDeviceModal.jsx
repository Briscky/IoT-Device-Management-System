import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, message } from 'antd';
import axios from 'axios';

const server = "http://localhost:8080";

const AddDeviceModal = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        values.username = localStorage.getItem("name");
        onCreate(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onCreate = (values) => {
    // 发送 POST 请求到后端创建新设备
    axios.post(`${server}/device/add`, values)
      .then(response => {
        if(response.data === 1) {
          message.success('设备添加成功');
        } else {
          message.error('设备添加失败');
        }
        setIsModalVisible(false);
      })
      .catch(error => {
        console.error('添加设备时发生错误:', error);
        message.error('添加设备失败');
        setIsModalVisible(false);
      });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        新增设备
      </Button>
      <Modal
        title="新增设备"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
            <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
            modifier: 'public',
            }}
        >
            <Form.Item
            name="name"
            label="设备名称"
            rules={[{ required: true, message: '请输入设备名称!' }]}
            >
            <Input />
            </Form.Item>
            <Form.Item
            name="type"
            label="设备类型"
            rules={[{ required: true, message: '请选择设备类型!' }]}
            >
            <Select>
                <Select.Option value='1'>基础设备</Select.Option>
                <Select.Option value='2'>可穿戴设备</Select.Option>
                {/* 更多类型选项 */}
            </Select>
            </Form.Item>
            <Form.Item
              name="description"
              label="设备描述"
              rules={[
                {
                  required: true,
                  message: '请输入设备描述',
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

        </Form>
      </Modal>
    </>
  );
};

export default AddDeviceModal;

