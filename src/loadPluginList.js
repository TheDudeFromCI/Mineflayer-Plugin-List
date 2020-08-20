const ISSUE_LIST_URL = 'https://api.github.com/repos/TheDudeFromCI/Mineflayer-Plugin-List/issues'
const debugMode = false

function loadPluginList()
{
    if (debugMode)
    {
        handleIssueResponse(fakePluginList())
        return
    }

    const request = new XMLHttpRequest()
    request.open('GET', ISSUE_LIST_URL, true)
    request.onload = issueListResponse
    request.send()
}

function fakePluginList()
{
    return [
        {
            title: '[Plugin] Lumberjack',
            state: 'open',
            user: {
                login: 'LoggerTheCabin'
            }
        },
        {
            title: '[Plugin] Fisherman',
            state: 'open',
            user: {
                login: 'Luck of the Sea'
            }
        },
        {
            title: '[Plugin] Miner',
            state: 'open',
            user: {
                login: 'Steve'
            }
        },
        {
            title: '[Plugin] Kill Aura',
            state: 'open',
            user: {
                login: 'ILovePVP'
            }
        },
        {
            title: '[Plugin] Creeper Hugger',
            state: 'closed',
            user: {
                login: 'Love_The_Creepers'
            }
        },
        {
            title: "I'm a regular question.",
            state: 'open',
            user: {
                login: 'TheCurious1'
            }
        }
    ]
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
    
    const plugin = document.createElement('div')
    plugin.classList.add('plugin')

    plugin.appendChild(name)
    plugin.appendChild(author)

    return plugin
}
