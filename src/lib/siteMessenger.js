import content from "./content";
import * as Header from './header.js'
import * as History from './history.js'
import * as Input from './input.js'
import * as Websockets from './webSockets.js'




export default () => {
    document.addEventListener("DOMContentLoaded", function () {
        document.body.insertAdjacentHTML('beforeend', content());
        const state = {
            open:false,
            websockets: {
                domain : 'localhost',
                port:   8889,
            },
            operator: {},
            message:{status: 'ready', value: ''},
            history: []
        }
        const dom = {
            header: document.getElementById('mo0473218'),
            body: document.getElementById('mo231487'),
            input: document.getElementById('mo495635'),

            doRenderHistory: History.render,
            doRenderHeader: Header.render,
            doRenderHeaderContent: Header.renderContent,

            doRenderInput: Input.render,

        }
        dom.header.addEventListener('click', ()=>{
            state.open = true;
            dom.doRenderHeader(state, dom)
            dom.doRenderHistory(state, dom)
            dom.doRenderInput(state, dom)
            dom.body.classList.add('open');
            dom.header.classList.add('open');
        })
        Websockets.start(state, dom)
        //dom.doRenderHistory(state, dom)
        dom.doRenderHeader(state, dom)
        //dom.doRenderInput(state, dom)
    });
}
