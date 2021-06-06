

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
         <modiv class="b-h-more">
            <modiv class="h-m-btn" style="background-image: url(&quot;data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cdefs%3E%3Cpath%20id%3D%22a%22%20d%3D%22M0%200h24v24H0z%22%2F%3E%3C%2Fdefs%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%20transform%3D%22rotate(-90%2012%2012)%22%3E%3Cmask%20id%3D%22b%22%20fill%3D%22%23fff%22%3E%3Cuse%20xlink%3Ahref%3D%22%23a%22%2F%3E%3C%2Fmask%3E%3Cg%20stroke%3D%22%23cccccc%22%20stroke-linecap%3D%22round%22%20stroke-width%3D%221.5%22%20mask%3D%22url(%23b)%22%3E%3Cpath%20d%3D%22M13.343%2016.814l-4.657-4.657L13.343%207.5%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E&quot;);"></modiv>
                <modiv class="h-m-badge"></modiv>
         </modiv>`
    dom.historyContainer = root.getElementsByClassName('b-h-container')[0]
    dom.historyMoreBtn = root.getElementsByClassName('h-m-btn')[0]
    dom.historyMoreBtn.addEventListener('click', ()=>{
        dom.historyContainer.scrollTop = dom.historyContainer.scrollHeight;
    })
    dom.historyContainer.scrollTop = dom.historyContainer.scrollHeight;
}