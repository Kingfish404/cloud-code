import react from 'react';
import { Link } from 'react-router-dom';
import Editor from '../../components/editor';
import Preview from '../../components/preview';
import ReconnectingWebSocket from 'reconnecting-websocket';

import './index.css'

const sharedb = require('sharedb/lib/client');

class Workspace extends react.Component {

    constructor(props) {
        super(props);
        const location = props.location;
        console.log(location);
        this.state = {
            text: "",
            online: false,
            username: location.state !== undefined ? location.state.username : 'default',
            id: location.state !== undefined ? location.state.id : '0000000000',
            language: location.state !== undefined ? location.state.language : 'markdown',
        };
        this.handleMdTextChange = this.handleMdTextChange.bind(this);
        this.handleConnectToServer = this.handleConnectToServer.bind(this);
        this.handleCloseServer = this.handleCloseServer.bind(this);
    }

    componentDidMount() {
        // 组件装载时，尝试连接服务器
        const host = window.location.hostname;
        this.socket = new ReconnectingWebSocket('ws://' + host + ':3210/ws');
        this.socket.onopen = this.handleConnectToServer;
        this.socket.onclose = this.handleCloseServer;
    }

    handleConnectToServer() {
        this.connection = new sharedb.Connection(this.socket);
        if (this.state.id.indexOf('-') === -1) {
            this.setState({
                id: this.state.language + '-' + this.state.id
            })
        }
        this.doc = this.connection.get('examples', this.state.id);
        this.mydocs = this.connection.get('lists', this.state.username);
        this.mydocs.subscribe(function (err) {
            if (err) throw err;

            // 被创建的新文档对象
            const doc_obj = { id: this.state.id, language: this.state.language };

            if (this.mydocs.type == null) {
                // 如果不存在则创建
                this.mydocs.create({
                    lists: [
                        doc_obj,
                    ]
                });
            } else {
                let find_cur_doc = false;
                this.mydocs.data.lists.forEach(element => {
                    if (element.id === this.state.id) {
                        find_cur_doc = true;
                    }
                });
                if (!find_cur_doc) {
                    const op = { p: ['lists', 0], li: doc_obj };
                    this.mydocs.submitOp(op);
                }
                // console.log('workplace:', this.mydocs.data.lists);
            }
        }.bind(this));

        this.doc.subscribe(function (err) {
            if (err) throw err;
            if (this.doc.type === null) {
                // 如果不存在，则创建
                this.doc.create({ content: '' });
            } else {
                // 已经存在
            }
            this.setState({
                text: this.doc.data.content
            });
        }.bind(this));
        this.doc.on('op', (op, source) => {
            // console.log(op, source);
            if (source) {
                return;
            }
            // 收到的是来自非自身的更新
            const data = this.doc.data;
            this.setState({
                text: data.content,
            });
        });
        this.setState({
            online: true,
        })
    }

    handleCloseServer() {
        this.setState({
            online: false,
        })
    }

    handleMdTextChange(changeText, ev) {
        if (this.state.online) {
            // 在线模式
            const change = ev.changes[0];
            // console.log(ev);
            let op = null;
            if (change.text === '') {
                const data = this.doc.data;
                // console.log(change);
                // console.log(data.content);
                const strDel = data.content.substring(change.rangeOffset, change.rangeOffset + change.rangeLength);
                // console.log(strDel);
                op = { p: ['content', change.rangeOffset], sd: strDel };
            } else {
                op = { p: ['content', change.rangeOffset], si: change.text };
            }
            if (op) {
                this.doc.submitOp(op);
            }
        }
        this.setState({
            text: this.doc.data.content,
        })
        // console.log(this.doc.data.content.length, changeText.length);
    }

    render() {
        let leftPage;
        let hasPreview = {
            markdown: null,
        }
        if (this.state.language === undefined || this.state.language in hasPreview) {
            leftPage = (<div className="rightPage">
                <div className="meta">
                    {this.state.id ?
                        "文档ID:" + this.state.id :
                        <div>
                            <p>目前处于公共文档,点此<Link to='/'>返回主页</Link></p>
                        </div>
                    }
                </div>
                <Preview
                    language={this.state.language}
                    id={this.state.id}
                    text={this.state.text}
                />
            </div>);
        }
        return (<div id="workspace">
            <div className="leftPage">
                <div className="meta">
                    {this.state.language ?
                        this.state.language :
                        'markdown'}
                </div>
                <Editor
                    language={this.state.language}
                    id={this.state.id}
                    text={this.state.text}
                    onMdTextChange={this.handleMdTextChange}
                />
            </div>
            {leftPage}
        </div>)
    }
}

export default Workspace;