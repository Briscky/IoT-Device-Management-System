import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from "../components/Login";
import cover from "../img/4.jpg"

let back = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${cover})`,
    backgroundSize: 'cover', // 确保背景图片覆盖整个区域
    display: "flex",
}
// 新的函数组件用于封装 LoginPage
function LoginPageWrapper(props) {
    const navigate = useNavigate();

    return <LoginPage navigate={navigate} {...props} />;
}

class LoginPage extends React.Component {
    render() {
        return (
            <div style={back}>
                <Login navigate={this.props.navigate}/>
            </div>
        )
    }
}

export default LoginPageWrapper;