function loadPlugin()
{
    function loadPluginData(pluginId)
    {
        getPluginByID(pluginId, (plugin, err) => {
            if (err)
            {
                loadErrorPage()
                return
            }

            document.getElementById('bigText').innerHTML = plugin.title
            document.getElementById('author').innerHTML = plugin.author

            if (plugin.description)
                document.getElementById('subText').innerHTML = plugin.description

            if (plugin.npmInstallation)
                document.getElementById('npmInstall').innerHTML = plugin.npmInstallation

            if (plugin.projectRepo)
                document.getElementById('projectRepo').innerHTML = `<a href="${plugin.projectRepo}">Github</a>`

            marked.setOptions({ breaks: true})
            if (plugin.additionalInfo)
                document.getElementById('additionalInfo').innerHTML = marked(plugin.additionalInfo)
            else
                document.getElementById('additionalInfo').style.display = 'none'

            loadMedia(plugin)
            loadCommentThread(pluginId)
        })
    }

    function loadMedia(plugin)
    {
        if (plugin.videos.length + plugin.screenshots.length === 0) return

        let indicator = ''
        let inner = ''
        let index = 0

        for (const m of plugin.videos)
        {
            indicator += `<li data-target="#plugin-media-images" data-slide-to="${index}"${index == 0 ? ' class="active"' : ''}></li>`
            inner += `<div class="carousel-item${index == 0 ? ' active' : ''}">
                        <div class="video-container">
                          <iframe class="video" frameborder="0" allowfullscreen src="https://www.youtube.com/embed/${m}"></iframe>
                        </div>
                      </div>`
            index++
        }
    
        for (const m of plugin.screenshots)
        {
            indicator += `<li data-target="#plugin-media-images" data-slide-to="${index}"${index == 0 ? ' class="active"' : ''}></li>`
            inner += `<div class="carousel-item${index == 0 ? ' active' : ''}">
                      <img class="carousel-retain-aspect" src="${m}">
                      </div>`
            index++
        }
    
        document.getElementById('carousel-indicators-container').innerHTML = indicator
        document.getElementById('carousel-inner-container').innerHTML = inner
    }

    function loadCommentThread(issueId)
    {
        const commentSection = document.getElementById('commentSection')
        commentSection.innerHTML = ''

        const tempElem = document.createElement('div')
        commentSection.appendChild(tempElem)

        tempElem.setAttribute("repo", 'TheDudeFromCI/Mineflayer-Plugin-List')
        tempElem.setAttribute("issue-number", issueId)
        tempElem.setAttribute("theme", 'github-light')
        tempElem.setAttribute("crossorigin", 'anonymous')
        tempElem.setAttribute("async", '')

        loadUtterances(tempElem)
    }

    function loadErrorPage()
    {
        const commentSection = document.getElementById('commentSection')
        commentSection.innerHTML = ''
    
        const failedToLoad = document.createElement('p')
        failedToLoad.innerHTML = 'Failed to load this plugin. Please try again later.'
    
        commentSection.appendChild(failedToLoad)
    }

    function parseURLParams(url)
    {
        const queryStart = url.indexOf("?") + 1
        const queryEnd = url.indexOf("#") + 1 || url.length + 1
        const query = url.slice(queryStart, queryEnd - 1)
        const pairs = query.replace(/\+/g, " ").split("&")
        const params = {}
    
        if (query === url || query === "") return params
    
        for (let i = 0; i < pairs.length; i++)
        {
            const nv = pairs[i].split("=", 2);
            const n = decodeURIComponent(nv[0]);
            const v = decodeURIComponent(nv[1]);
    
            if (nv.length === 2)
                params[n] = v
        }
        return params;
    }
    
    const req = parseURLParams(window.location.href)
    if (req.plugin) loadPluginData(req.plugin)
    else loadErrorPage()
}
