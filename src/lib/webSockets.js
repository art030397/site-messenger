
let ws;
export const start = (state, dom) => {
    return connect(state, dom);
}

const connect = (state, dom)=>{
    const config = state.websockets;
    ws = new WebSocket('ws://' + config.domain + ':'+config.port)
    ws.onopen = (e) => {
        console.log('onOpen', e)
    }
    ws.onclose = (e)=>{
        console.log('onclose', e)
    }
    ws.onmessage = (event) => {
        try{
            const message = JSON.parse(event.data);
            console.log('onmessage', message)
            // eslint-disable-next-line default-case
            switch (message.type){
                case 'msg':
                    state.history.push(message.data)
                    state.message.status = 'ready'
                    state.message.value = ''
                    dom.doRenderHistory(state, dom)
                    dom.doRenderInput(state, dom)
                    break;
                case 'printscreen':
                    break;
            }
        }catch (e){
            console.error(e)
        }
    }
    ws.onerror = (e) => {
        console.log('onerror', e)
    }
    return ws;

}

export const send = (state, dom, msg) => {
    ws.send({token: state.token, content: msg})
}