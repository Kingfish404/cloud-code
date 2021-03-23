// 导入WebSocket模块:
const WebSocket = require('ws');
const ShareDB = require('sharedb');
const WebSocketJSONStream = require('websocket-json-stream');

let backend = new ShareDB();

createDoc(startServer);

function createDoc(callback) {
    let connection = backend.connect();
    let doc = connection.get('examples', 'text');
    doc.fetch(function (err) {
        if (err) {
            throw err;
        }
        // if (doc.type == null) {
        //     doc.create({ content: '' }, callback);
        //     return;
        // }
        callback();
    });
}

function startServer() {
    // 引用Server类:
    const WebSocketServer = WebSocket.Server;

    const port = 3210;

    // 实例化:
    const wss = new WebSocketServer({
        port: port
    });

    wss.on('connection', function (ws) {
        var stream = new WebSocketJSONStream(ws);
        console.log('connect to client!');
        backend.listen(stream);
        ws.on('message',function(data){
            // console.log(data);
        })
    });

    console.log('wss on at prot:' + port);
}