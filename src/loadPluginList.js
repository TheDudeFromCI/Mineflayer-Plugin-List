const ISSUE_LIST_URL = 'https://api.github.com/repos/TheDudeFromCI/Mineflayer-Plugin-List/issues'

function loadPluginList()
{
    const request = new XMLHttpRequest()
    request.open('GET', ISSUE_LIST_URL, true)
    request.onload = issueListResponse
    request.send()

    document.getElementById('pluginListContainer').style.display = 'block'
}

function issueListResponse()
{
    if (this.status >= 200 && this.status < 400)
    {
        const response = JSON.parse(this.response)

        if (response.length > 0)
            handleIssueResponse(response)
        else
            handleFailedToLoadPlugins()
    }
    else
    {
        handleFailedToLoadPlugins()
        console.error(this);
    }
}

function handleIssueResponse(response)
{
    const pluginList = document.getElementById('pluginList')
    pluginList.innerHTML = ''

    for (var i = 0; i < response.length; i++)
        handlePluginThread(response[i], pluginList)
}

function handleFailedToLoadPlugins()
{
    const pluginList = document.getElementById('pluginList')
    pluginList.innerHTML = ''

    const failedToLoad = document.createElement('p')
    failedToLoad.innerHTML = 'Failed to load the plugin list. Please try again later.'

    pluginList.appendChild(failedToLoad)
}

function handlePluginThread(response, pluginList) {
    if (!/^\[Plugin\] .+$/.test(response.title)) return
    if (response.state !== 'open') return

    const plugin = createPluginEntry(response)
    pluginList.appendChild(plugin)
}

function createPluginEntry(response)
{
    const name = document.createElement('div')
    name.classList.add('plugin-title')
    name.innerHTML = response.title.substring(9)

    const author = document.createElement('div')
    author.classList.add('plugin-author')
    author.innerHTML = response.user.login

    const desc = document.createElement('p')
    desc.classList.add('plugin-description')
    desc.innerHTML = extractDescription(response.body)
    
    const plugin = document.createElement('div')
    plugin.classList.add('plugin')
    plugin.classList.add('border-secondary')
    plugin.classList.add('border')
    plugin.classList.add('rounded')
    plugin.classList.add('p-2')

    plugin.appendChild(name)
    plugin.appendChild(author)
    plugin.appendChild(desc)

    plugin.onclick = () => loadPluginPage(response.number)
    return plugin
}

function extractDescription(body)
{
    const regex = /#+\s+Description\s+([^#]*)/i
    const cap = body.match(regex)

    if (!cap || cap.length < 2) return 'No description available.'

    let desc = cap[1]
    desc = truncate(desc, 256)
    desc = desc.trim()

    return desc
}

function truncate(str, n)
{
    if (str.length <= n) return str

    let sub = str.substr(0, n - 1);
    sub = sub.substr(0, sub.lastIndexOf(" "))

    return sub + "..."
}

function loadPluginPage(pluginId)
{
    window.location.href = "./index.html?plugin=" + pluginId
}