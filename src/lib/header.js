import {callsMessages} from "./callsMessages";


export const render = (state, dom) => {
    const root = dom.header;
    root.innerHTML = `
            ${callsMessages}
        <modiv id="mo4579052" class="o-h-close" style="background-image: url(&quot;data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2228%22%20height%3D%2228%22%20viewBox%3D%220%200%2028%2028%22%3E%0A%20%20%20%20%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%20transform%3D%22translate(2%202)%22%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%20fill%3D%22%23FFF%22%20opacity%3D%221%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212.75%22%20stroke%3D%22%23222D38%22%20stroke-width%3D%221.5%22%20opacity%3D%221%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cg%20fill%3D%22%23222D38%22%20opacity%3D%221%22%20transform%3D%22translate(6%206)%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20width%3D%221.611%22%20height%3D%2213.9%22%20x%3D%225.435%22%20y%3D%22-.941%22%20rx%3D%22.806%22%20transform%3D%22rotate(45%206.24%206.01)%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20width%3D%221.611%22%20height%3D%2213.9%22%20x%3D%225.435%22%20y%3D%22-.941%22%20rx%3D%22.806%22%20transform%3D%22scale(-1%201)%20rotate(45%200%20-9.058)%22%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A&quot;);"></modiv>
        <modiv class="o-h-content"></modiv>
        <modiv class="leaf">
            <modiv class="leaf-int" style="background-image: url(&quot;data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2240%22%20viewBox%3D%220%200%2032%2040%22%3E%0A%20%20%20%20%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22%238BC34A%22%20d%3D%22M0%200h9.02L32%2033.196V40H0z%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22%2318C139%22%20d%3D%22M9%200c3.581.05%2023%205.426%2023%2033.08v.03C18.922%2030.751%209%2019.311%209%205.554V0z%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A&quot;);">
                
            </modiv>
        </modiv>
         <modiv class="copyContainer_9c6">
            <modiv class="copyright_41b _bottom_440 __ru_ef4" style="background: linear-gradient(95deg, rgb(139, 195, 74) 20%, rgb(139, 195, 74) 80%);">
                <modiv class="corner_2bc" style="border-top-color: rgb(139, 195, 74);"></modiv>
            </modiv>
        </modiv>
    `
    renderContent(state, dom)
    dom.closeBtn = document.getElementById('mo4579052');
    dom.closeBtn.addEventListener('click',(e)=>{
        state.open = false;
        dom.body.classList.remove('open');
        dom.header.classList.remove('open');
        dom.doRenderHeader(state, dom)
        dom.doRenderHistory(state, dom)
        dom.doRenderInput(state, dom)
        e.stopPropagation();
    })



}
export const renderContent = (state, dom) => {
    const root = dom.header.getElementsByClassName('o-h-content')[0];
    if(state.open){
        const o = state.operator ?? {name: '', title: ''};
        root.innerHTML =
            `<modiv class="o-h-operator">
                <modiv class="h-o-avatar">
                    <modiv class="o-a-img"></modiv>
                </modiv>
                <modiv class="h-o-creds">
                    <modiv class="o-c-name">${o.name}</modiv>
                    <modiv class="o-c-title">${o.title}</modiv>
                </modiv>
            </modiv>`
    }else {
        root.innerHTML =
        `<modiv class="o-h-text">Сейчас на связи с Вами помощник руководителя</modiv>
            <modiv class="o-h-logo-expanding"  style="color: rgb(240, 241, 241);">
         </modiv>        
        `
    }
}