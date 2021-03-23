import { useState } from 'react'

import './index.css'

function Login() {
    const [mode, setMode] = useState(0);

    return (<div id="login">
        {   mode === 0 ?
            <div>
                <h1>登陆</h1>
                <div className="login menu">
                    <form action="/api/login" method="post">
                        <label>用户名</label><br></br>
                        <input type='text'>
                        </input><br></br>
                        <label>密码</label><br></br>
                        <input type='current-password'>
                        </input><br></br>
                        <button type='submit'>提交</button>
                    </form>
                    <button onClick={() => { setMode(1) }}>注册</button>
                </div>
            </div> :
            <div>
                <h1>注册</h1>
                <div className="login menu">
                    <form action="/api/signup" method="post">
                        <label>用户名</label><br></br>
                        <input type='text'>
                        </input><br></br>
                        <label>密码</label><br></br>
                        <input type='new-password'>
                        </input><br></br>
                        <button type='submit'>注册</button>
                    </form>
                    <button onClick={() => { setMode(0) }}>登陆</button>
                </div>
            </div>
        }
    </div>)
}

export default Login