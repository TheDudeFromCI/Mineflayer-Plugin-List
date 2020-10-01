function loadPluginList()
{
    getPluginList((plugins, err) => {
        if (err)
        {
            const pluginList = document.getElementById('pluginList')
            pluginList.innerHTML = ''
        
            const failedToLoad = document.createElement('p')
            failedToLoad.innerHTML = 'Failed to load the plugin list. Please try again later.'
        
            pluginList.appendChild(failedToLoad)
            return
        }

        const pluginList = document.getElementById('pluginList')
        pluginList.innerHTML = ''

        for (const plugin of plugins)
        {
            const name = document.createElement('div')
            name.classList.add('plugin-title')
            name.innerHTML = plugin.title
        
            const author = document.createElement('div')
            author.classList.add('plugin-author')
            author.innerHTML = plugin.author
        
            const desc = document.createElement('p')
            desc.classList.add('plugin-description')
            desc.innerHTML = plugin.description
            
            const plugElem = document.createElement('div')
            plugElem.classList.add('plugin')
            plugElem.classList.add('border-secondary')
            plugElem.classList.add('border')
            plugElem.classList.add('rounded')
            plugElem.classList.add('p-2')
        
            plugElem.appendChild(name)
            plugElem.appendChild(author)
            plugElem.appendChild(desc)
        
            plugElem.onclick = () => window.location.href = "./plugin.html?plugin=" + plugin.id
            pluginList.appendChild(plugElem)
        }
    })
}
