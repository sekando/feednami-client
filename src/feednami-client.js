window.feednami = {}
feednami.load = function(options,callback){
  var apiRoot = 'https://api.feednami.com/api/v1'
  var feedUrl = options
  if(typeof options == 'object'){
    feedUrl = options.url
  }
  var qs = 'url='+feedUrl
  if(options.format){
    qs += '&include_xml_document&format='+options.format
  }
  if(options.includeXml){
    qs += '&include_xml_document'
  }
  var req = new XMLHttpRequest()
  req.open('GET',apiRoot+'/feeds/load?'+qs)
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      callback(JSON.parse(req.responseText))
    }
  }
  req.send()
}
feednami.loadGoogleFormat = function(feedUrl,callback){
  return feednami.load({
    url: feedUrl,
    format: 'google',
    includeXml: true
  },callback)
}