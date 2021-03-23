import react from 'react';
import Editor from "@monaco-editor/react";

import './index.css'

class CloudEditor extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: this.props.language || 'markdown',
            syncOn: true,
        };
        this.monacoEditorRef = react.createRef();
        this.lastPos = null;
        this.opStack = [];
        this.handleMdTextChange = this.handleMdTextChange.bind(this);
        this.handleOnValidate = this.handleOnValidate.bind(this);
        this.handleBeforeMount = this.handleBeforeMount.bind(this);
        this.handleOnMount = this.handleOnMount.bind(this);
    }

    handleBeforeMount(monaco) {
        // console.log(monaco);
    }

    handleOnMount(editor, monaco) {
        this.monacoEditorRef.current = editor;

        editor.onDidChangeCursorPosition(e => {
            // 防止其他用户修改导致当前光标变化
            // console.log('change pos:', e.position, e);
            if (e.source === 'modelChange') {
                if (this.lastPos) {
                    this.monacoEditorRef.current.setPosition(this.lastPos);
                }
            } else {
                this.lastPos = e.position;
            }
        })

        // 中文等输入的问题修复
        editor.onDidCompositionStart(() => {
            // 开始键入中文
            this.setState({
                syncOn: false
            });
        });
        editor.onDidCompositionEnd(() => {
            // 结束键入中文
            this.setState({
                syncOn: true
            });
            if (this.opStack.length > 0) {
                // 取队列尾部元素执行
                while (this.opStack.length > 1) {
                    this.opStack.shift();
                }
                const { value, ev } = this.opStack[0];
                this.props.onMdTextChange(value, ev);
            }
        });
        // console.log(editor, monaco);
    }

    handleMdTextChange(value, ev) {
        if (this.state.syncOn) {
            this.props.onMdTextChange(value, ev);
        } else {
            // 操作进入队列
            this.opStack.push({ value, ev });
        }
    }

    handleOnValidate(makers) {
        console.log("onValidate:", makers.message);
    }


    render() {
        const options = {
            'wordWrap': 'on',   // 自动换行
            // 'wordBasedSuggestions': false,   // 智能abc提示
        }
        return (<div id="editor">
            <Editor
                value={this.props.text}
                defaultValue={this.props.text}
                defaultLanguage={this.state.language}
                language={this.state.language}
                options={options}
                width="100%"
                height="100%"
                beforeMount={this.handleBeforeMount}
                onMount={this.handleOnMount}
                onChange={this.handleMdTextChange}
                onValidate={this.handleOnValidate}
            />
        </div>)
    }
}

export default CloudEditor;