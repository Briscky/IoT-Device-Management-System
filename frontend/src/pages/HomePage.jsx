import React from 'react';
import { theme  } from 'antd';
import { Layout as AntLayout} from 'antd';
//import SideMenu from '../components/SideMenu';
import img1 from '../img/8.jpg';
//const { Header, Content, Footer, Sider } = Layout;
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
    // const {
    //     token: { colorBgContainer },
    // } = theme.useToken();
    
    // const [collapsed, setCollapsed] = useState(false);
    // return (
    //     <div>
    //         <Layout
    //             style={{
    //                 minHeight: '100vh',
    //             }}
    //         >
                
    //             <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
    //                 <SideMenu />
    //             </Sider>
            
    //             <Layout>
    //                 <Header
    //                     style={{
    //                         padding: 0,
    //                         background: colorBgContainer,
    //                     }}
    //                 >
    //                     <div>
    //                         <text style={{ color: "black", fontSize: "25px" }}>IoT-Device-Management-System</text>
    //                     </div>
    //                 </Header>

    //                 <Content
    //                     style={{
    //                     margin: '0 16px',
    //                     }}
    //                 > 
    //                     <div
    //                     style={{
    //                         padding: 24,
    //                         minHeight: 600,
    //                         background: colorBgContainer,
    //                     }}
    //                     >
    //                     <img src={img1} style={contentStyle}/>
    //                     </div>
    //                 </Content>

    //                 <Footer
    //                     style={{
    //                         textAlign: 'center',
    //                     }}
    //                 >
    //                     B/S-Software-Design Project ©2023 Created by CHEN NUO
    //                 </Footer>
    //             </Layout>
    //         </Layout>
    //     </div>
    // )
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
            <img src={img1} style={contentStyle}/>
            </div>
        </Content>

        </Layout>
      );
};

export default HomePage;
