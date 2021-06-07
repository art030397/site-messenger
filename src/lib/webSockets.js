
export const start = (state, dom) => {
    connect(state, dom);
}

const connect = (state, dom)=>{
    const config = state.websockets;
    const ws = new WebSocket('ws://' + config.domain + ':'+config.port+'/?token='+ window.localStorage.getItem('moSiteMessengerToken'))
    ws.onopen = (e) => {
        console.log('onOpen', e)
    }
    ws.onclose = (e)=>{
        //console.log('onclose', e)
        setTimeout(()=>{
            connect(state, dom);
        }, 1000)
    }
    ws.onmessage = (event) => {
        try{
            const message = JSON.parse(event.data);
            console.log('onmessage', message)
            // eslint-disable-next-line default-case
            const d = message.data;
            // eslint-disable-next-line default-case
            switch (message.type){
                case 'msg':
                    d.timestamp = new Date(d.timestamp)
                    state.history.push(d)
                    state.message.status = 'ready'
                    state.message.value = ''
                    dom.doRenderHistory(state, dom)
                    dom.doRenderInput(state, dom)
                    break;
                case 'start':
                    window.localStorage.setItem('moSiteMessengerToken', d.token)
                    state.token = d.token;
                // eslint-disable-next-line no-fallthrough
                case 'restore':
                    state.history = d.history;
                    for(const h of state.history){
                        h.timestamp = new Date(h.timestamp);
                    }
                    state.operator = d.operator;
                    state.message = {status: 'ready', value: ''};
                    dom.doRenderHeader(state, dom)
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
    state.ws = ws;

}
