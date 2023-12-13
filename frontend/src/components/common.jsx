import React, { useState } from 'react';
import { Layout as AntLayout ,theme} from 'antd';
import SideMenu from './SideMenu';
const { Header, Footer, Sider } = AntLayout;

const Layout = ({ children }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div>
            <AntLayout
                style={{
                    minHeight: '100vh',
                }}
            >
                
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <SideMenu />
                </Sider>
            
                <AntLayout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <div>
                            <text style={{ color: "black", fontSize: "25px" }}>IoT-Device-Management-System</text>
                        </div>
                    </Header>

                    {/* <Content
                        style={{
                        margin: '0 16px',
                        }}
                    >  */}
                    {children}
                    {/* </Content> */}

                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        B/S-Software-Design Project ©2023 Created by CHEN NUO
                    </Footer>
                </AntLayout>
            </AntLayout>
        </div>
    );
};

export default Layout;
