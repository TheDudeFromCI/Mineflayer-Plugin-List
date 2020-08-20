function loadPluginData()
{
    const pluginData = sessionStorage.getItem('plugin-data')
    if (pluginData === undefined)
    {
        failToLoadPlugin()
        return
    }

    const data = parseData(pluginData)

    loadPluginName(data.name)
    loadCommentThread(data.id)
}

function failToLoadPlugin()
{
    const warning = document.createElement('p')
    warning.innerHTML = 'Failed to load plugin page!'
    document.appendChild(warning)
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

function parseData(data)
{
    data = JSON.parse(data)

    return {
        name: data.title.substring(9),
        id: data.number
    }
}

function loadPluginName(pluginName)
{
    document.getElementById('pluginName').innerHTML = pluginName
}