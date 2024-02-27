import React from 'react';
import { theme  } from 'antd';
import { Layout as AntLayout} from 'antd';
import img1 from '../img/8.jpg';
import Layout from '../components/common';
import { Navigate } from "react-router-dom";
const { Content } = AntLayout;


const contentStyle = {
    height: '560px',
    color: '#000',
    lineHeight: '155px',
    textAlign: 'center',
    background: '#d0d0d0',
  };


const HomePage = () => {
    if (!localStorage.getItem("token")) {
      return (
          <Navigate to={{
              pathname: "/login",
          }} />
      )
    }
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
          
          <Content
            style={{
            margin: '0 16px',
            }}
        > 
            <div
            style={{
                padding: 24,
                minHeight: 600,
                background: colorBgContainer,
            }}
            >
            <img src={img1} alt="image1" style={contentStyle} />
            </div>
        </Content>

        </Layout>
      );
};

export default HomePage;
