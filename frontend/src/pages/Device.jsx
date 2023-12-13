import React, { useState, useEffect } from 'react';
import { Layout as AntLayout, Table } from 'antd';
import Layout from '../components/common';
import AddDeviceModel from '../components/AddDeviceModal';
import EditDeviceModal from '../components/EditDeviceModal';
import axios from "axios";
import './Public.css';
const { Content } = AntLayout;

const server = "http://localhost:8080";

const Device = () => {
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("name");
    axios.get(server + "/device/query/list/" + username).then(response => {
      const modifiedData = response.data.map(device => {
        let typeText = '';
        switch (device.type) {
          case 1:
            typeText = '基础设备';
            break;
          case 2:
            typeText = '车载设备';
            break;
          case 3:
            typeText = '健康和医疗设备';
            break;
          case 4:
            typeText = '家庭设备';
            break;
          default:
            typeText = '未知类型';
        }
        return { ...device, key: device.id, typeText };
      });
      setDeviceData(modifiedData);
    });
    
  }, []);


  const columns = [
    {
      title: '设备ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '设备类型',
      dataIndex: 'typeText', // 修改为 typeText
      key: 'typeText',
    },
    {
      title: '设备描述',
      dataIndex: 'description',
      key: 'description',
    }
    // 可以添加更多列
  ];

  return (
    <Layout>
      <Content style={{ margin: '0 16px', marginTop: '50px' }}>
        <div className="page-header">
          <h1>设备信息</h1>
          <p>查看和修改您的设备信息</p>
        </div>

        <Table columns={columns} dataSource={deviceData} pagination={false} />
        <br />
        <div className="buttons-container">
          <AddDeviceModel />
          {/* <ChangeIntroButton setUserInfo={setUserInfo} /> //自我介绍修改还有问题，有空来修改 */}
          <EditDeviceModal />
        </div>
        
      </Content>
    </Layout>
  );
};

export default Device;
