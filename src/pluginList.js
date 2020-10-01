function getPluginList(cb)
{
    function handleResponse()
    {
        if (this.status >= 200 && this.status < 400)
        {
            const response = JSON.parse(this.response)
    
            if (response.length > 0)
            {
                parsePluginListInfo(response)
            }
            else
            {
                console.error(this);
                cb(undefined, new Error("Failed to load plugin list!"))
            }
        }
        else
        {
            console.error(this);
            cb(undefined, new Error("Failed to load plugin list!"))
        }
    }

    function truncate(str, n)
    {
        if (str.length <= n) return str
    
        let sub = str.substr(0, n - 1);
        sub = sub.substr(0, sub.lastIndexOf(" "))
    
        return sub + "..."
    }

    function extract(body, element)
    {
        const regex = new RegExp(`#+\\s+${element}\\s+([^#]*)`, "i");
        const cap = body.match(regex)
    
        if (!cap || cap.length < 2) return null
    
        let context = cap[1]
        context = context.trim()
        context = truncate(context, 256)
    
        return context
    }
    
    function parsePluginListInfo(response)
    {
        const plugins = []

        for (let i = 0; i < response.length; i++)
        {
            console.log(response[i].title)
            if (!/^\[Plugin\].+$/.test(response[i].title)) continue
            if (response[i].state !== 'open') continue

            const plugin = {}
            plugins.push(plugin)

            plugin.title = response[i].title.substring(8).trim()
            plugin.author = response[i].user.login
            plugin.description = extract(response[i].body, 'description')
            plugin.id = response[i].number
        }

        cb(plugins)
    }

    const request = new XMLHttpRequest()
    request.open('GET', ISSUE_LIST_URL, true)
    request.onload = handleResponse
    request.send()
}