import React, { useState, useEffect } from 'react';
import { Form, Select, Button, message } from 'antd';
//import { Map } from 'react-bmapgl';
import { Map, Marker, Polyline } from 'react-amap';
import axios from 'axios';
import Layout from '../components/common';
import red from '../img/alert.png';
import startIcon from '../img/startIcon.png';
import endIcon from '../img/endIcon.jpg';

function getBackendUrl() {
  if (window.location.hostname === 'localhost') {
      return 'http://127.0.0.1:8080';
  } else {
      // 电脑的局域网 IP 地址
      return 'http://10.181.213.96:8080';
  }
}

const server = getBackendUrl();

const DeviceMap = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [path, setPath] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
      const username = localStorage.getItem("name");
      axios.get(server + "/device/query/list/" + username)
          .then(response => setDevices(response.data));
    }, []);

    const handleDeviceChange = value => {
      setSelectedDevice(value);
    };

    const handleSearch = () => {
      if (!selectedDevice) {
        message.warning("请选择一个设备");
        return;
      }
      axios.get(`${server}/message/query/path/${selectedDevice}`)
        .then(response => { 
          setPath(response.data);
      });
    
      axios.get(`${server}/message/query/alert/${selectedDevice}`)
        .then(response => {
          console.log('Values:', response.data);
          setAlerts(response.data);
      });
    };

    return (
      <Layout>
        {/* <PageHeader title="查看设备历史轨迹" /> */}
        <Form layout="inline">
          <Form.Item>
            <Select onChange={handleDeviceChange} placeholder="请选择设备">
              {devices.map(device => (
                <Select.Option key={device.name} value={device.name}>
                  {device.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSearch}>查询</Button>
          </Form.Item>
        </Form>

        <Map amapkey="03fd423e4a02860179d035dcd66f3ea9" center={{lng: 120.1, lat: 30.3}} zoom="12">
          {path.map((item, index) => {
            if (index === path.length - 1) {
              // 起点
              return <Marker key={index} position={{ lng: item.lng, lat: item.lat }} icon={startIcon} offset={[-40, -20]} />;
            } else if (index === 0) {
              // 终点
              return <Marker key={index} position={{ lng: item.lng, lat: item.lat }} icon={endIcon} offset={[-40, -20]} />;
            } else {
              // 路径上的其他点
              return <Marker key={index} position={{lng: item.lng, lat: item.lat}} />;
            }
          })}

          {alerts.map((item, index) => (
             <Marker key={index} position={{ lng: item.lng, lat: item.lat }} icon={red}
             offset={[5,5]}/>
          ))} 
          <Polyline path={path} strokeColor="#0000ff" />
          {/* <Marker position={{lng: 120.1, lat: 30.3}} /> */}
       </Map>
      </Layout>
    );
  };
  
export default DeviceMap;
