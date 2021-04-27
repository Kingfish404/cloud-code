import { Link } from 'react-router-dom';
import Footer from '../../components/footer';

import './index.css'

function Intro(props) {

    return (<div id="intro">
        <div className="intro-block">
            <div className="main-info">
                <h1>CloudCode - 云协作互动编程平台</h1>
                <p>协作共进，效率倍增</p>
                <Link to='/index'
                    className="intro-go"
                >进入平台</Link>
            </div>
            <div className="main-img">
                <img src='/images/coop-1.jpeg' alt='' ></img>
            </div>
        </div>
        <div className="intro-block">
            <div className="about-applicate">
                <h2>应用场景</h2>
                <p>课堂协作</p>
                <p>结对编程</p>
                <p>问题解答</p>
                <p>文档协作</p>
                <p>敏捷开发</p>
            </div>
            <div className="about-coop">
                <h2>优势-理论</h2>
                <div>
                    <h3>云实验平台</h3>
                    <p>Web技术实现在线协同编码平台，它提供了全新的教学环境，学生无需配置复杂的开发环境</p>
                    <p>学生在遇到问题时能向老师或其他同学请求指导</p>
                    <p>随时分享和创建副本亦或保存当前记录</p>
                </div>
                <div>
                    <h3>结对编程</h3>
                    <p>结对编程是一种敏捷软件开发技术，两个程序员在一个工作站上一起工作。一个写代码，而另一个观察，在输入代码时检查每行代码。这两个程序员经常交换角色。</p>
                </div>
            </div>
            <div className="about-manifesto">
                <h2>敏捷宣言</h2>
                <p>个体和互动 高于 流程和工具</p>
                <p>工作的软件 高于 详尽的文档</p>
                <p>客户合作 高于 合同谈判</p>
                <p>响应变化 高于 遵循计划</p>
            </div>
        </div>
        {Footer}
    </div>)
}

export default Intro;