

export const render = (state, dom) => {
    const msg = state.message;
    let btnClass = 'o-b-send';
    let inputDisabled = '';
    switch (msg.status){
        case 'sending':
            btnClass += ' s-progress';
            inputDisabled = 'disabled';

            break;
    }
    dom.input.innerHTML =
        `
        <textarea maxlength="1000" class="b-i-textarea" ${inputDisabled} placeholder="Введите сообщение">${msg.value}</textarea>
        <modiv class="${btnClass}"></modiv>`
    dom.inputValue = dom.input.getElementsByClassName("b-i-textarea")[0]
    dom.inputSendBtn = dom.input.getElementsByClassName("o-b-send")[0];
    dom.inputSendBtn.addEventListener('click', () => {
        const value = dom.inputValue.value.trim()
        if(!dom.inputSendBtn.disabled && value.length > 0){
            msg.status = 'sending';
            msg.value = value;
            const sendData = JSON.stringify({type: 'msg', content: value})
            state.ws.send(sendData)
            render(state, dom)
        }
    })
}