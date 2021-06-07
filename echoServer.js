

const WebSocketServer = require('ws');

const url = require('url')

const connections = []

const server = new WebSocketServer.Server({
    port: 8889,
    host: 'localhost',
});

server.on('connection', function(conn, req) {

    try {
        const token = url.parse(req.url, true).query.token;
        // Ищем токен в сохраненных соединениях
        let connFound = false;
        let c;
        for(c of connections){
            if(c.token === token){
                // Если нашли, присылаем историю сообщений
                c.conn = conn;
                conn.send(JSON.stringify({type: 'restore', data:{
                        history: c.history,
                        operator: c.operator,
                    }
                }))
                connFound = true;
                break;
            }
        }
        if(!connFound){
            c = {
                conn: conn,
                token: 'example-token',
                history: [],
                operator: {name: 'Алла', title: 'оператор'}
            }
            connections.push(c)
            conn.send(JSON.stringify({type: 'start', data: {
                    token: c.token,
                    history: c.history,
                    operator: c.operator,
                }
            }))
        }
        conn.on('message', (raw) => {
            try {
                const message = JSON.parse(raw)
                console.log('received message', message)
                switch (message.type) {
                    case 'msg':
                        setTimeout(() => {
                            const incomingMsg = {
                                type: 'o',
                                content: message.content,
                                timestamp: new Date().toISOString()
                            }
                            c.history.push(incomingMsg)
                            conn.send(JSON.stringify({type: 'msg', data: incomingMsg}))
                            setTimeout(() => {
                                const replyMsg = {
                                    type: 'i',
                                    content: 'Ответ на сообщение\n' + message.content,
                                    timestamp: new Date().toISOString()
                                }
                                c.history.push(replyMsg)
                                conn.send(JSON.stringify({type: 'msg', data: replyMsg,}))
                            }, 5000)
                        }, 1000)
                        break;
                    case 'signup':
                        break;
                    case 'signin':
                        break;
                    default:
                        console.error('Unknown type', message.type)
                }
            } catch (e) {
                console.error(e)
            }
        })
    }catch (e){
        conn.close();
    }
})

