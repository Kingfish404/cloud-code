import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReconnectingWebSocket from 'reconnecting-websocket';

import Footer from '../../components/footer';

import './index.css'

const sharedb = require('sharedb/lib/client');

function Index(props) {
    let languages = [
        'markdown',
        'javascript',
        'cpp',
        'java',
        'python',
    ]
    // TODO:fix this
    // eslint-disable-next-line no-unused-vars
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
    let history = useHistory();

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
        let target_url = 'ws://' + host + ':3210/ws';
        if (window.location.protocol === 'https:') {
            target_url = 'wss://' + host + '/ws';
        }
        const socket = new ReconnectingWebSocket(target_url);
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
                    <div className='docs_list_item_content'>
                        <Link to={{
                            pathname: '/workplace',
                            state: {
                                username: username,
                                language: item.language,
                                id: item.id,
                            }
                        }}>
                            <p>{item.language}</p>
                            <p>{String(item.id).substring(String(item.id).indexOf('-') + 1)}</p>
                        </Link>
                        <button onClick={(event) => {
                            const obj = { id: item.id, language: item.language };
                            const op = { p: ['lists', index], ld: obj };
                            mydocs.submitOp(op);
                        }}>删除</button>
                    </div>
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
        <nav className="index_nav">
            <div className="logo"
                onClick={() => {
                    history.push('/');
                }}
            >
                <img
                    src="/logo192.png"
                    alt=""
                >
                </img>
                <p>Cloud Code</p>
            </div>
            <p>开始 - {username}</p>
        </nav>
        <div className="index-workplace">
            <div className="doc-create">
                <Link
                    className="doc_start"
                    to={{
                        pathname: '/workplace',
                        state: {
                            username: username,
                            language: language,
                            id: id,
                        }
                    }} >快速创建或打开
                    <p>{language}-{id}</p>
                </Link>
                <div className="doc-meta">
                    <div className="doc-input">
                        <label>语言</label>
                        <select
                            className="doc-input-sel"
                            onChange={(event) => {
                                // console.log('select:', event.target.value);
                                setLanguage(event.target.value);
                            }}>
                            {option_languages}
                        </select>
                    </div>
                    <div className="doc-input">
                        <label>文档ID</label>
                        <input
                            className="doc-input-elm"
                            onChange={(event) => {
                                // console.log('input:', event.target.value);
                                setid(event.target.value);
                            }}
                            defaultValue={id}>
                        </input>
                    </div>
                </div>
            </div>
            <div className='docs_main'>
                <h3 className='docs_title'>文档列表</h3>
                <div className="docs_list">
                    {list}
                </div>
            </div>

        </div>

        {/* {isLogin ? <button onClick={() => { setIsLogin(false) }}>登出</button> : <Redirect to='/login' />} */}
        {Footer}
    </div>)
}

export default Index;