import react from 'react';
import ReactMarkdown from 'react-markdown'

import './index.css'

const gfm = require('remark-gfm')

class Preview extends react.Component {

    render() {
        return (<div id="preview">
            <ReactMarkdown
                plugins={[gfm]}
                children={this.props.text} />
        </div>)
    }
}

export default Preview;