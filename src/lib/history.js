

export const render = (root, state) => {
    let previous = {}
    const renderItem = (item) => {
        const typeClass = previous.type === item.type?' same':'';
        previous = item;
        if(item.type === 'i'){
            return `
                <modiv class="b-h-item incoming${typeClass}">
                    <modiv class="h-i-agent">${'Оператор'}</modiv>
                    <modiv class="h-i-body">
                        <modiv class="i-b-avatar"><modiv></modiv></modiv>
                        <modiv class="i-b-content">${item.content}</modiv>
                    </modiv>
                </modiv>
            `
        }else{
            return `
                <modiv class="b-h-item outgoing${typeClass}">
                    <modiv class="h-i-body">
                        <modiv class="i-b-content">${item.content}</modiv>
                    </modiv>
                </modiv>
            `
        }
    }
    root.innerHTML = `${state.history.map(renderItem).join('')}`
}