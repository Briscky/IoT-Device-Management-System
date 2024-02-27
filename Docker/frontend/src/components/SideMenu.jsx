import React from 'react';
import {Menu, Button, Layout} from 'antd';
import { Link } from "react-router-dom";
import {
    DesktopOutlined,
    PieChartOutlined,
    HomeOutlined,
    UserOutlined,
    LineChartOutlined,
    AreaChartOutlined
} from '@ant-design/icons';
import { Avatar } from 'antd';

class SideMenu extends React.Component {
    logOut = () => {
        alert("退出登录");
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        window.location.reload();
    };

    render() {
        let name = localStorage.getItem("name");
        //console.log(name);

        return (
            <Layout>
                <Menu theme= "dark" defaultSelectedKeys={['0']} mode="inline">
                    <Menu.Item>
                        <Avatar size={32} icon={<UserOutlined />} />
                        &nbsp;&nbsp;{name} 
                    </Menu.Item>
                    <Menu.Item>
                        <Button ghost={"true"} onClick={this.logOut}>退出</Button>
                    </Menu.Item>

                    <Menu.Item key="0" icon={<HomeOutlined />}>
                        <Link to={"/home"} >首页</Link>
                    </Menu.Item>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to={"/home/user"} >个人信息</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        <Link to={"/home/config"} >设备配置</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<LineChartOutlined />}>
                        <Link to={"/home/message"} >设备数据</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<AreaChartOutlined />}>
                        <Link to={"/home/map"} >设备信息</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<PieChartOutlined />}>
                        <Link to={"/home/chart"} >统计信息</Link>
                    </Menu.Item>
                </Menu>
            </Layout>
        );
    }
}
export default SideMenu;