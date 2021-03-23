import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ReconnectingWebSocket from 'reconnecting-websocket';

import './index.css'

const sharedb = require('sharedb/lib/client');

function Index(props) {
    let languages = [
        'markdown',
        'javascript',
        'c++',
        'java',
        'python',
    ]
    const [isLogin, setIsLogin] = useState(true);
    const [id, setid] = useState('0000000000');
    const [language, setLanguage] = useState(languages[0]);
    const [ws, setWs] = useState(null);
    const [connection, setConnection] = useState(null);
    const [mydocs, setMydocs] = useState(null);
    const [docs, setDocs] = useState(null);
    const [list, setList] = useState(null);
    let option_languages = [];
    let username = 'default';

    function handleConnectToServer(event) {
        // console.log('connect successful', event.target);
        setWs(event.target);
    }

    useEffect(() => {
        if (ws) {
            setConnection(new sharedb.Connection(ws));
        }
        return () => {
            if (ws) {
                ws.close();
            }
        }
    }, [ws]);

    useEffect(() => {
        if (connection) {
            // 创建当前用户的文档列表
            setMydocs(connection.get('lists', username));
        }
        return () => {
            // cleanup
            if (connection) {
                connection.close();
            }
        }
    }, [connection, username]);

    useEffect(() => {
        if (mydocs) {
            // 订阅/初始化文档储存
            mydocs.subscribe(function (err) {
                if (err) {
                    throw err;
                }
                if (mydocs.type == null) {
                    // 如果不存在则创建
                    mydocs.create({
                        lists: []
                    });
                } else {

                }
                let arr = [];
                mydocs.data.lists.forEach(item => {
                    arr.push(item);
                })
                setDocs(arr);
            })
            // 设定更新
            mydocs.on('op', (op, source) => {
                // console.log(op, mydocs.data.lists);
                let arr = [];
                mydocs.data.lists.forEach(item => {
                    arr.push(item);
                })
                setDocs(arr);
            });
        }
        return () => {
            // cleanup
        }
    }, [mydocs]);

    useEffect(() => {
        const host = window.location.hostname;
        const socket = new ReconnectingWebSocket('ws://' + host + ':3210/ws');
        socket.onopen = handleConnectToServer;
        return () => {
            socket.close();
        }
    }, [isLogin]);

    useEffect(() => {
        if (docs !== null) {
            // console.log('render', docs);
            const list_mydocs = [];
            docs.forEach((item, index) => {
                list_mydocs.push(<div className="docs_list_item"
                    key={index}
                >
                    <Link to={{
                        pathname: '/workplace',
                        state: {
                            username: username,
                            language: item.language,
                            id: item.id,
                        }
                    }}>
                        <p>{item.id}</p>
                        <p>{item.language}</p>
                    </Link>
                    <button onClick={(event) => {
                        const obj = { id: item.id, language: item.language };
                        const op = { p: ['lists', index], ld: obj };
                        mydocs.submitOp(op);
                    }}>删除</button>
                </div >)
            })
            setList(list_mydocs);
        }
        return () => {
        }
    }, [docs, mydocs, username]);

    languages.forEach((item, index) => {
        option_languages.push(<option key={index} value={item}>{item}</option>)
    })

    return (<div id="index">
        <h1>Index - User:{username}</h1>
        <hr />
        <div className="doc_create">
            <div className="doc_meta">
                <label>类型</label>
                <select onChange={(event) => {
                    // console.log('select:', event.target.value);
                    setLanguage(event.target.value);
                }}>
                    {option_languages}
                </select>
                <label>
                    id:
            </label>
                <input
                    onChange={(event) => {
                        // console.log('input:', event.target.value);
                        setid(event.target.value);
                    }}
                    defaultValue={id}></input>
            </div>
            <Link to={{
                pathname: '/workplace',
                state: {
                    username: username,
                    language: language,
                    id: id,
                }
            }} >创建或进入文档:
        {language}-
        {id}</Link>
        </div>
        <hr />
        <div className="docs_list">
            {list}
        </div>
        {isLogin ? <button onClick={() => { setIsLogin(false) }}>登出</button> : <Redirect to='/login' />}
    </div>)
}

export default Index;