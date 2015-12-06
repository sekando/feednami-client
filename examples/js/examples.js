function formatDate(date){
  var year = date.getYear()
  if(year < 1900){
    year += 1900
  }
  var month = date.getMonth()+1
  var day = date.getDate()
  var hour = date.getHours()
  var minutes = date.getMinutes()
  if(minutes < 10){
    minutes = '0' + minutes
  }
  return year + '/' + month + '/' + day + ' ' + hour + ':' +minutes
}

function loadEntries(url,id){
  var blogDiv = document.getElementById(id)
  feednami.load(url,function(res){
    blogDiv.removeChild(blogDiv.querySelector('.loading'))
    var entries = res.feed.entries
    var added = 0;
    for(var i = 0; i < entries.length && added < 5; i++){
      var entry = entries[i]
      if(entry.title.indexOf('PR:') == -1){
        added++
        var div = document.createElement('div')
        div.setAttribute('class','entry')
        div.innerHTML = '<p class="title"><a href="'+entry.link+'" target="_blank">'+entry.title+'</a></p><p class="date">'+
        formatDate(new Date(entry.pubdate_ms))+'</p>'
        blogDiv.appendChild(div)
      }
    }
  })
}

function loadEpisodes(url,id){
  var podDiv = document.getElementById(id)
  feednami.load(url,function(res){
    podDiv.removeChild(podDiv.querySelector('.loading'))
    var entries = res.feed.entries
    for(var i = 0; i < entries.length && i < 3; i++){
      var entry = entries[i]
      var div = document.createElement('div')
      div.setAttribute('class','entry')
      div.innerHTML = 
        '<p class="title"><a href="'
          + entry.link
          + '" target="_blank">'
          + entry.title
          + '</a></p><p class="date">'
          + formatDate(new Date(entry.pubdate_ms))
          + '</p><p class="audio-container"><audio preload="none" controls><source src="'
          + entry.enclosures[0].url
          + '"></audio></p>'
      podDiv.appendChild(div)
    }
  })
}

window.onload = function(){
  loadEntries('http://feedblog.ameba.jp/rss/ameblo/sasaki-sd','sasaki')
  loadEntries('http://daringfireball.net/feeds/articles','daringfireball')
  loadEntries('http://www.aljazeera.com/xml/rss/all.xml','aljazeera')
  loadEpisodes('http://feeds.feedburner.com/todayinthepast','jjho')
  loadEpisodes('http://feeds.rebuild.fm/rebuildfm','rebuildfm')
}