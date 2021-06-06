

const WebSocketServer = require('ws');

const server = new WebSocketServer.Server({
    port: 8889,
    host: 'localhost',
});

server.on('connection', function(conn) {
    //console.log(ws)
    conn.on('message', (message)=>{
        console.log('reseived message', message)
        setTimeout(()=>{
            conn.send(JSON.stringify({type: 'msg', data: {id: 1, type: 'o', content:message}}))
            setTimeout(()=>{
                conn.send(JSON.stringify({type: 'msg', data: {id: 1, type: 'i', content:'Ответ на сообщение\n' +message}}))
            }, 5000)
        }, 1000)
    })
})

