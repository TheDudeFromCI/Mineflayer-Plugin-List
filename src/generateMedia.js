function generateMedia()
{
    getPluginByID(2, (plugin, err) => {
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
    })
}
