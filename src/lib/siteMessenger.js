import content from "./content";
import * as History from './history.js'




export default () => {
    document.addEventListener("DOMContentLoaded", function () {
        document.body.insertAdjacentHTML('beforeend', content());
        const state = {
            open:false,
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
            closeBtn: document.getElementById('mo4579052'),
            body: document.getElementById('mo231487'),

        }
        dom.header.addEventListener('click', ()=>{
            state.open = true;
            dom.body.classList.add('open');
            dom.header.classList.add('open');
        })
        dom.closeBtn.addEventListener('click',(e)=>{
            state.open = false;
            dom.body.classList.remove('open');
            dom.header.classList.remove('open');

            e.stopPropagation();
        })
        History.render(dom.body.getElementsByClassName("o-b-history")[0], state)
    });
}
