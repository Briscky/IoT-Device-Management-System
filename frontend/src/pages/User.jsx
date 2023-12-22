import React, { useState, useEffect } from 'react';
//import { theme } from 'antd';
import { Layout as AntLayout} from 'antd';
import Layout from '../components/common';
import { Descriptions } from 'antd';
import axios from "axios";
import ChangeEmailButton from '../components/ChangeEmailButton';
//import ChangeIntroButton from '../components/ChangeIntroButton';
import ChangePasswordButton from '../components/ChangePasswordButton';
import './Public.css';
const { Content } = AntLayout;

// const contentStyle = {
//   height: '560px',
//   color: '#000',
//   lineHeight: '155px',
//   textAlign: 'center',
//   background: '#d0d0d0',
// };

function getBackendUrl() {
  if (window.location.hostname === 'localhost') {
      return 'http://127.0.0.1:8080';
  } else {
      // 电脑的局域网 IP 地址
      return 'http://10.181.218.164:8080';
  }
}

const server = getBackendUrl();


const User = () => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  const [userInfo, setUserInfo] = useState({
    username: "chen0731",
    email: "chennuo731@zju.edu.cn",
    introduce: "Let's wait for an impossible possibility."
  });

  useEffect(() => {
    const address = server + "/user/" + localStorage.getItem("name");
    axios.get(address).then(response => {
      setUserInfo(prevState => ({
        ...prevState,
        username: response.data.name,
        email: response.data.email
      }));
    });
  }, []); // 空依赖数组表示此effect仅在组件加载时运行一次
  
  return (
      <Layout>
        
        <Content
          style={{
          margin: '0 16px',
          marginTop: '50px', // 顶部外边距
          }}
      > 
          <div className="page-header">
            <h1>用户信息</h1>
            <p>您可以修改您的个人信息</p>
          </div>

          <div>
                <Descriptions
                    bordered
                    size={'default'}
                    column={1}
                >
                    <Descriptions.Item label="用户名">{userInfo.username}</Descriptions.Item>
                    <Descriptions.Item label="电子邮箱">{userInfo.email}</Descriptions.Item>
                    <Descriptions.Item label="自我介绍">
                        {userInfo.introduce}
                    </Descriptions.Item>
                </Descriptions>
                <br />
                <br />
                <br />
                <div className="buttons-container">
                  <ChangeEmailButton setUserInfo={setUserInfo} />
                  {/* <ChangeIntroButton setUserInfo={setUserInfo} /> //自我介绍修改还有问题，有空来修改 */}
                  <ChangePasswordButton />
                </div>
        
            </div>
      </Content>

      </Layout>
    );
};
export default User;