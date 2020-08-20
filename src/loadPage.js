function loadPage()
{
    const req = parseURLParams(window.location.href)

    if (req.plugin)
        loadPluginData(req.plugin)
    else
        loadPluginList()
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