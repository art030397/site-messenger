import content from "./content";




export default () => {
    document.addEventListener("DOMContentLoaded", function () {
        document.body.insertAdjacentHTML('beforeend', content());
        window.MoMessengerState = {
            open:false,
        }
        const dom = {
            header: document.getElementById('mo0473218'),
            closeBtn: document.getElementById('mo4579052'),
            body: document.getElementById('mo231487'),

        }
        dom.header.addEventListener('click', ()=>{
            window.MoMessengerState.open = true;
            dom.body.classList.add('open');
            dom.header.classList.add('open');
        })
        dom.closeBtn.addEventListener('click',(e)=>{
            window.MoMessengerState.open = false;
            dom.body.classList.remove('open');
            dom.header.classList.remove('open');

            e.stopPropagation();
        })

    });
}
