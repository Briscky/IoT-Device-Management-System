import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import axios from 'axios';

// function getBackendUrl() {
//   if (window.location.hostname === 'localhost') {
//       return 'http://127.0.0.1:8080';
//   } else {
//       // 电脑的局域网 IP 地址
//       return 'http://10.181.218.164:8080';
//   }
// }

// const server = getBackendUrl();
const server = "http://localhost:8080";

const EditDeviceModal = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = () => {
      const username = localStorage.getItem("name");
      axios.get(`${server}/device/query/list/${username}`)
        .then(response => {
          setDevices(response.data);
        })
        .catch(error => console.error('获取设备列表失败:', error));
    };

    if(isModalVisible) {
      fetchDevices();
    }
  }, [isModalVisible]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        values.username = localStorage.getItem("name");
        onEdit(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const onEdit = (values) => {
    if (!values.description) {
      delete values.description;
    }

    axios.post(`${server}/device/edit`, values)
      .then(response => {
        if(response.data === 1) {
          message.success('设备修改成功');
        } else {
          message.error('设备修改失败');
        }
        setIsModalVisible(false);
      })
      .catch(error => {
        console.error('修改设备时发生错误:', error);
        message.error('修改设备失败');
        setIsModalVisible(false);
      });
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        修改设备
      </Button>
      <Modal
        title="修改设备"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="选择设备"
            rules={[{ required: true, message: '请选择设备' }]}
          >
            <Select placeholder="请选择设备">
              {devices.map(device => (
                <Select.Option key={device.id} value={device.name}>
                  {device.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
          name="type"
          label="设备类型"
          rules={[{ required: true, message: '请选择修改后的设备类型!' }]}
          >
          <Select>
              <Select.Option value='1'>基础设备</Select.Option>
              <Select.Option value='2'>车载设备</Select.Option>
              <Select.Option value='3'>健康和医疗设备</Select.Option>
              <Select.Option value='4'>家庭设备</Select.Option>
          </Select>
          </Form.Item>
          <Form.Item name="description" label="设备描述">
          <Input.TextArea />
          </Form.Item>
          
        </Form>
      </Modal>
    </>
  );
};

export default EditDeviceModal;
