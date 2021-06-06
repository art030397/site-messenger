

const WebSocketServer = require('ws');

const server = new WebSocketServer.Server({
    port: 8889,
    host: 'localhost',
});

server.on('connection', function(conn) {
    //console.log(ws)
    conn.on('message', (raw)=>{
        try{
            const message = JSON.parse(raw)
            console.log('reseived message', message)
            switch(message.type){
                case 'msg':
                    setTimeout(()=>{
                        conn.send(JSON.stringify({type: 'msg', data: {
                                id: 1, type: 'o', content:message.content, timestamp: new Date().toISOString()}}))
                        setTimeout(()=>{
                            conn.send(JSON.stringify({type: 'msg',
                                data: {
                                    id: 1,
                                    type: 'i',
                                    content:'Ответ на сообщение\n' +message.content,
                                    timestamp: new Date().toISOString()
                                }
                            }))
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
        }catch(e){
            console.error(e)
        }
     })
})

