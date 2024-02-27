import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterWithNavigate from "../components/Register";
import cover from "../img/3.jpg"

let back = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${cover})`,
    backgroundSize: 'cover', // 确保背景图片覆盖整个区域
    display: "flex",
}

// 新的函数组件用于封装 RegisterPage
function RegisterPageWrapper(props) {
    const navigate = useNavigate();

    return <RegisterPage navigate={navigate} {...props} />;
}

class RegisterPage extends React.Component {
    render() {
        return (
            <div style={back}>
                <RegisterWithNavigate navigate={this.props.navigate}/>
            </div>
        )
    }
}

export default RegisterPageWrapper;