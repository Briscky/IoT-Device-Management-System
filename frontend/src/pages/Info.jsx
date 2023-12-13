// import React, { useState, useEffect } from 'react';
// import { Layout as AntLayout, Row, Col, Statistic, Spin } from 'antd';
// import { PhoneTwoTone, FireTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
// import { Pie, Line } from '@ant-design/charts';
// import axios from 'axios';
// import Layout from '../components/common';

// const server = 'http://localhost:8080';

// const Info = () => {
//   const [loading, setLoading] = useState(true);
  

//   useEffect(() => {
//     const username = localStorage.getItem("name");

//     axios.get(`${server}/device/query/all/${username}`)
//       .then(response => {
//         setTotalDevices(response.data);
//       });

//   }, []);

//   return (
//     <Layout>
//       <AntLayout.Content style={{ margin: '0 16px', marginTop: '50px' }}>
//         <div className="page-header">
//           <h1>设备数据查询</h1>
//           <p>查询数据上报的数据</p>
//         </div>
//         {/* 增加空行 */}
//         <div style={{ marginBottom: '20px' }}></div>

        
//       </AntLayout.Content>
//     </Layout>
//   );
// };

// export default Info;
