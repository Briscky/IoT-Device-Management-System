// import React, { useState, useEffect } from 'react';
// import { Layout as AntLayout, Row, Col, Statistic, Spin } from 'antd';
// import { PhoneTwoTone, FireTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
// import { Pie, Line } from '@ant-design/charts';
// import axios from 'axios';
// import Layout from '../components/common';
// import './Statistics.css';

// const server = 'http://localhost:8080';

// const Statistics = () => {
//   const [loading, setLoading] = useState(true);
//   const [totalDevices, setTotalDevices] = useState(0);
//   const [activeDevices, setActiveDevices] = useState(0);
//   const [totalMessages, setTotalMessages] = useState(0);
//   const [deviceDistribution, setDeviceDistribution] = useState([]);
//   const [dailyMessages, setDailyMessages] = useState([]);

//   useEffect(() => {
//     const username = localStorage.getItem("name");

//     axios.get(`${server}/device/query/all/${username}`)
//       .then(response => {
//         setTotalDevices(response.data);
//       });

//     axios.get(`${server}/device/query/list/active/${username}`)
//       .then(response => {
//         setActiveDevices(response.data);
//       });

//     axios.get(`${server}/message/user/all/${username}`)
//       .then(response => {
//         setTotalMessages(response.data);
//         setLoading(false);
//       });
    
//     // 请求设备种类分布数据
//     axios.get(`${server}/device/query/type-distribution/${username}`)
//       .then(response => {
//         setDeviceDistribution(response.data);
//       });

//     // 请求过去一周的消息数量数据
//     axios.get(`${server}/message/user/week/${username}`)
//       .then(response => {
//         setDailyMessages(response.data);
//         setLoading(false);
//       });
//   }, []);

//   const pieConfig = {
//     appendPadding: 10,
//     data: deviceDistribution,
//     angleField: 'value',
//     colorField: 'kind',
//     radius: 1,
//     innerRadius: 0.6,
//     label: {
//       type: 'inner',
//       offset: '-50%',
//       content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
//       style: {
//         textAlign: 'center',
//         fontSize: 14,
//       },
//     },
//     interactions: [{ type: 'element-active' }],
//   };

//   const lineConfig = {
//     data: dailyMessages,
//     xField: 'date',
//     yField: 'count',
//     smooth: true,
//     point: {
//       size: 5,
//       shape: 'diamond',
//     },
//   };

//   return (
//     <Layout>
//       <AntLayout.Content style={{ margin: '0 16px', marginTop: '50px' }}>
//         <div className="page-header">
//           <h1>统计信息</h1>
//           <p>查看设备的统计信息</p>
//         </div>
//         {/* 增加空行 */}
//         <div style={{ marginBottom: '20px' }}></div>


//         <Spin spinning={loading}>
//           <Row gutter={16}>
//             <Col span={8}>
//               <Statistic title="设备总数" value={totalDevices}
//                          prefix={<CheckCircleTwoTone />} />
//             </Col>
//             <Col span={8}>
//               <Statistic title="当前活跃设备数" value={activeDevices}
//                          suffix={`/ ${totalDevices}`} prefix={<FireTwoTone />} />
//             </Col>
//             <Col span={8}>
//               <Statistic title="今日发送消息总数" value={totalMessages}
//                          prefix={<PhoneTwoTone />} />
//             </Col>
//           </Row>

//           {/* 图表行 */}
//           <Row gutter={16} style={{ marginTop: '20px' }}>
//             {/* 设备种类分布饼状图 */}
//             <Col span={12}>
//               <div className="chart-container">
//                 <h2>设备种类分布</h2>
//                 <Pie {...pieConfig} />
//               </div>
//             </Col>

//             {/* 最近7天每天收到的总消息数折线图 */}
//             <Col span={12}>
//               <div className="chart-container">
//                 <h2>最近7天消息统计</h2>
//                 <Line {...lineConfig} />
//               </div>
//             </Col>
//           </Row>
//         </Spin>
        
//       </AntLayout.Content>
//     </Layout>
//   );
// };

// export default Statistics;
