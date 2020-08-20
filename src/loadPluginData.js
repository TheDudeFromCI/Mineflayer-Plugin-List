function loadPluginData(pluginId)
{
    document.getElementById('commentSection').style.display = 'block'

    loadPluginName("Plugin Name")
    loadCommentThread(pluginId)
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
    document.getElementById('bigText').innerHTML = pluginName
}