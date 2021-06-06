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
            token: "sample-token",
            websockets: {
                domain : 'localhost',
                port:   8889,
            },
            message:{status: 'ready', value: ''},
            history: [
                {id: 1, type: "i", content: "Привет!"},
                {id: 1, type: "i",
                    content:
                        "Duis aute irure dolor in reprehenderit in voluptate " +
                        "velit esse cillum dolore eu fugiat nulla pariatur. " +
                        "Excepteur sint occaecat cupidatat non proident, sunt in " +
                        "culpa qui officia deserunt mollit anim id est laborum."
                },
                {id: 1, type: "o", content: "Здравствуйте!"},
                {id: 1, type: "o", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
                        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
                        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
                        "nisi ut aliquip ex ea commodo consequat. " +
                        "Duis aute irure dolor in reprehenderit in voluptate " +
                        "velit esse cillum dolore eu fugiat nulla pariatur. " +
                        "Excepteur sint occaecat cupidatat non proident, sunt in " +
                        "culpa qui officia deserunt mollit anim id est laborum."
                },
            ]
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
        state.ws = Websockets.start(state, dom)
        //dom.doRenderHistory(state, dom)
        dom.doRenderHeader(state, dom)
        //dom.doRenderInput(state, dom)
    });
}
