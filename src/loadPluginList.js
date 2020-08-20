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
            body: '# MY AWESOME PLUGIN\r\nOh yeah, it\'s awesome.\r\n## description\r\nThis is my plugin which is really cool and does stuff.\r\nIt does a lot of stuff!\r\nSo, so, so much!\r\n* Like this\r\n* And this\r\n* And even this!\r\nWow!\r\n## usage\r\nEh, you just kinda install it.\r\n## more\r\n... meh?',
            user: {
                login: 'LoggerTheCabin'
            }
        },
        {
            title: '[Plugin] Fisherman',
            state: 'open',
            body: '# STUFF\r\n\r\nI\'m really not following the format, am I? NOPE! # description \r\nit fishes',
            user: {
                login: 'Luck of the Sea'
            }
        },
        {
            title: '[Plugin] Miner',
            state: 'open',
            body: 'Just body. No headers.',
            user: {
                login: 'Steve'
            }
        },
        {
            title: '[Plugin] Kill Aura',
            state: 'open',
            body: '',
            user: {
                login: 'ILovePVP'
            }
        },
        {
            title: '[Plugin] Creeper Hugger',
            state: 'closed',
            body: '',
            user: {
                login: 'Love_The_Creepers'
            }
        },
        {
            title: "I'm a regular question.",
            state: 'open',
            body: '',
            user: {
                login: 'TheCurious1'
            }
        },
        {
            title: "[Plugin] Boat Maker",
            state: 'open',
            body: "# Description\r\nI make bosts and it's as simple as that. I do nothing more. Litterally nothing. Just make boats. I just take some wooden planks, take a crafting table, and just... put them together! Specifically in the shape of a boat! So you can travel over the water with your boat. Maybe visit a new island. Is this description too long? Nah, not at all. It's the perfect length. Tells you anything and everything you need to know in order to make some boats using this plugin. I  haven't said enough yet, so I'm just gonna repeat myself from the beginning. I make bosts and it's as simple as that. I do nothing more. Litterally nothing. Just make boats. I just take some wooden planks, take a crafting table, and just... put them together! Specifically in the shape of a boat! So you can travel over the water with your boat. Maybe visit a new island. Is this description too long? Nah, not at all. It's the perfect length. Tells you anything and everything you need to know in order to make some boats using this plugin.",
            user: {
                login: 'BoatMaker_Dev'
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

    plugin.onclick = () => loadPluginPage(response)
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

function loadPluginPage(pluginData)
{
    const data = JSON.stringify(pluginData)
    sessionStorage.setItem('plugin-data', data)
    window.location.href = "./pluginPage.html"
}