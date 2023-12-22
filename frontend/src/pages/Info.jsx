import React, { useState, useEffect } from 'react';
import { Layout as AntLayout, Spin } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios'; 
import './Public.css';
import Layout from '../components/common';

function getBackendUrl() {
  if (window.location.hostname === 'localhost') {
      return 'http://127.0.0.1:8080';
  } else {
      // 电脑的局域网 IP 地址
      return 'http://10.181.218.164:8080';
  }
}

const server = getBackendUrl();

const Info = () => {
  const [loading, setLoading] = useState(true);
  const [deviceValues, setDeviceValues] = useState([]);
  const [deviceNames, setDeviceNames] = useState([]);
  //const [messageCounts, setMessageCounts] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("name");
    
    // 获取当天设备值变化数据
    axios.get(`${server}/message/query/values/today/${username}`)
      .then(response => {
        // console.log('Device Values:', response.data);
        // //const { data: deviceValues, deviceNames } = formatData(response.data);
        // console.log('formatData:', formatData(response.data));
        setDeviceValues(formatData(response.data).data);
        setDeviceNames(formatData(response.data).deviceNames); 
        setLoading(false);
      });
    
    // // 获取当天设备消息数目数据
    // axios.get(`${server}/device/query/messages/today/${username}`)
    //   .then(response => {
    //     setMessageCounts(response.data);
    //     setLoading(false); // 数据加载完成后取消加载状态
    //   });
  }, []);

useEffect(() => {
  console.log('Device Values:', deviceValues);
  console.log('Device Names:', deviceNames);
}, [deviceValues, deviceNames]); 

  // 格式化数据
  function formatData(data) {
    let formattedData = [];
    let timestamps = new Set();
    let deviceNames = new Set();
  
    // 收集所有不同的时间戳
    for (const device in data) {
      if (data.hasOwnProperty(device)) {
        deviceNames.add(device);
        const times = Object.keys(data[device]);
        times.forEach(timestamp => timestamps.add(timestamp));
      }
    }
  
    // 转换为数组并排序时间戳
    const sortedTimestamps = Array.from(timestamps).sort();
  
    // 为每个时间戳创建一个包含所有设备值的条目
    sortedTimestamps.forEach(timestamp => {
      let entry = { date: timestamp };
  
      for (const device of deviceNames) {
        entry[device] = (data[device] && data[device][timestamp]) || 0; // 如果设备在该时间没有值，则设为 0
      }
  
      formattedData.push(entry);
    });
  
    return { data: formattedData, deviceNames: Array.from(deviceNames) };
  }
  
  
  return (
    <Layout>
      <AntLayout.Content style={{ margin: '0 16px', marginTop: '50px' }}>
        <div className="page-header">
          <h1>设备数据查询</h1>
          <p>查询数据上报的数据</p>
        </div>
        <div style={{ marginBottom: '20px' }}></div>

        <Spin spinning={loading}>
          {/* <Row gutter={16}>
            <Col span={12}> */}
              <div>
                <h2>当天值变化折线图</h2>
                <LineChart
                  width={1200}
                  height={300}
                  data={deviceValues}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    {
                      deviceNames.map(device => (
                        <Line
                            key={device}
                            type="monotone"
                            dataKey={device}
                            stroke={'#' + Math.floor(Math.random()*16777215).toString(16)} // 随机颜色
                        />
                      ))
                    }
                  
                </LineChart>
              </div>
            {/* </Col> */}
            {/* <Col span={12}>
              <div>
                <h2>当天消息数目柱状图</h2>
                <BarChart width={600} height={300} data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="messageCount" fill="#82ca9d" />
                </BarChart>
              </div>
            </Col> */}
          {/* </Row> */}
        </Spin>
      </AntLayout.Content>
    </Layout>
  );
};

export default Info;
