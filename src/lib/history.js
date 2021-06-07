

export const render = (state, dom) => {
    const root = dom.body.getElementsByClassName("o-b-history")[0]
    let previous = {}
    const renderItem = (item) => {
        let sameType  = previous.type === item.type;
        let content = '';
        if(!item.timestamp || !previous.timestamp ||
            item.timestamp.getFullYear() !== previous.timestamp.getFullYear() ||
            item.timestamp.getMonth() !== previous.timestamp.getMonth() ||
            item.timestamp.getDate() !== previous.timestamp.getDate()
        ){
            sameType = true;
            content +=
                `<modiv class="h-c-date">${item.timestamp.toLocaleDateString()}</modiv>`
        }
        const typeClass = sameType?' same':'';
        previous = item;
        if(item.type === 'i'){
            content +=
                `<modiv class="h-c-item incoming${typeClass}">
                    <modiv class="c-i-agent">${'Оператор'}</modiv>
                    <modiv class="c-i-body">
                        <modiv class="i-b-avatar"><modiv></modiv></modiv>
                        <modiv class="i-b-content" title="${item.timestamp.toLocaleString()}">${item.content}</modiv>
                    </modiv>
                </modiv>`
        }else{
            content +=
               `<modiv class="h-c-item outgoing${typeClass}">
                    <modiv class="c-i-body">
                        <modiv class="i-b-content" title="${item.timestamp.toLocaleString()}">${item.content}</modiv>
                    </modiv>
                </modiv>
            `
        }
        return content;
    }
    root.innerHTML =
        `<modiv class="b-h-container">
            ${state.history.map(renderItem).join('')}
         </modiv>
         <modiv class="b-h-more b-hidden">
            <modiv class="h-m-btn"></modiv>
            <modiv class="h-m-badge"></modiv>
         </modiv>`
    dom.historyContainer = root.getElementsByClassName('b-h-container')[0]
    dom.historyMoreBtn = root.getElementsByClassName('b-h-more')[0]
    dom.historyMoreBtn.addEventListener('click', ()=>{
        dom.historyContainer.scrollTop = dom.historyContainer.scrollHeight;
        dom.historyMoreBtn.classList.add('b-hidden')
    })
    dom.historyContainer.scrollTop = dom.historyContainer.scrollHeight;
    let lastKnownScrollPos;
    let ticking = false;
    let btnStatus = false;
    // Управляем кнопкой перемотки только если в истории есть сообщения
    if(state.history.length > 0) {
        dom.historyContainer.addEventListener('scroll', (e) => {
            const target = e.currentTarget;
            lastKnownScrollPos = target.scrollHeight - target.clientHeight - target.scrollTop;
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    let newBtnStatus = lastKnownScrollPos < 18;
                    if (btnStatus !== newBtnStatus) {
                        if (btnStatus) {
                            dom.historyMoreBtn.classList.remove('b-hidden')
                        } else {
                            dom.historyMoreBtn.classList.add('b-hidden')
                        }
                        btnStatus = newBtnStatus;
                    }
                    ticking = false;
                })
            }
            ticking = true;
        })
    }
}