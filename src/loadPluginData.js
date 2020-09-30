function loadPluginData(pluginId)
{
    loadPluginBody(pluginId)
    generateMedia()
}

function loadPluginBody(pluginId)
{
    const request = new XMLHttpRequest()
    request.open('GET', ISSUE_LIST_URL + `/${pluginId}`, true)
    request.onload = issuePluginResponse
    request.send()

    document.getElementById('pluginListContainer').style.display = 'block'
}

function issuePluginResponse()
{
    document.getElementById('commentSection').style.display = 'block'

    if (this.status >= 200 && this.status < 400)
    {
        const response = JSON.parse(this.response)
        handleSingleIssueResponse(response)
    }
    else
    {
        handleFailedToLoadPlugin()
        console.error(this);
    }
}

function handleSingleIssueResponse(response)
{
    loadPluginName(response.title.substring(9))
    loadPluginDescription(extractDescription(response.body))
    loadCommentThread(response.number)
}

function handleFailedToLoadPlugin()
{
    const pluginList = document.getElementById('commentSection')
    pluginList.innerHTML = ''

    const failedToLoad = document.createElement('p')
    failedToLoad.innerHTML = 'Failed to load this plugin. Please try again later.'

    pluginList.appendChild(failedToLoad)
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

function loadPluginName(pluginName)
{
    document.getElementById('bigText').innerHTML = pluginName
}

function loadPluginDescription(pluginDescription)
{
    document.getElementById('subText').innerHTML = pluginDescription
}