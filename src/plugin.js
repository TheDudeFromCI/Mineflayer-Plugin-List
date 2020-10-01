function getPluginByID(id, cb)
{
    function handleResponse()
    {
        if (this.status >= 200 && this.status < 400)
        {
            const response = JSON.parse(this.response)
            parsePluginInfo(response)
        }
        else
        {
            console.error(this);
            cb(undefined, new Error("Failed to load plugin!"))
        }
    }

    function extract(body, element)
    {
        const regex = new RegExp(`#+\\s+${element}\\s+([^#]*)`, "i");
        const cap = body.match(regex)
    
        if (!cap || cap.length < 2) return null
    
        let context = cap[1]
        context = context.trim()
    
        return context
    }

    function extractScreenshots(plugin)
    {
        let text = plugin.screenshots
        plugin.screenshots = []

        if (!text) return

        while (true)
        {
            const regex = new RegExp(`!\\[.*\\]\\((.+)\\)`, "");
            const cap = text.match(regex)
        
            if (!cap || cap.length < 2) return
        
            plugin.screenshots.push(cap[1])
            text = text.replace(cap[1], "")
        }
    }

    function extractVideos(plugin)
    {
        let text = plugin.videos
        plugin.videos = []

        if (!text) return

        while (true)
        {
            const regex = new RegExp(`([^!]|^)\\[.*\\]\\(https:\\/\\/www\\.youtube\\.com\\/watch\\?v=([a-zA-Z-_0-9]+).*\\)`, "");
            const cap = text.match(regex)

            if (!cap || cap.length < 3) return
        
            plugin.videos.push(cap[2])
            text = text.replace(cap[2], "")
        }
    }
    
    function parsePluginInfo(response)
    {
        const plugin = {
            title: response.title.substring(8).trim(),
            author: response.user.login,
            description: extract(response.body, 'description'),
            videos: extract(response.body, 'videos'),
            screenshots: extract(response.body, 'Screenshots'),
            projectRepo: extract(response.body, 'project repo'),
            npmInstallation: "npm i " + extract(response.body, 'npm installation'),
            additionalInfo: extract(response.body, 'additional info'),
        }

        const anotherAuthor = extract(response.body, 'author')
        if (anotherAuthor)
            plugin.author = anotherAuthor

        extractScreenshots(plugin)
        extractVideos(plugin)

        cb(plugin)
    }

    const request = new XMLHttpRequest()
    request.open('GET', ISSUE_LIST_URL + `/${id}`, true)
    request.onload = handleResponse
    request.send()
}
