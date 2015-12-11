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
  var url = apiRoot+'/feeds/load?'+qs
  if(window.XDomainRequest){
    var script = document.createElement('script')
    var callbackName = 'jsonp_callback_' 
    + new Date().getTime() + '_'
    + Math.round(1000000 * Math.random());
    url += '&jsonp_callback='+callbackName
    window[callbackName] = function(data) {
      callback(data);
      document.body.removeChild(script);
      window[callbackName] = null
      try{
        delete window[callbackName];
      }
      catch(e){
        
      }
    };
    script.src = url
    document.body.appendChild(script)
  }
  else{
    var req = new XMLHttpRequest()
    req.onreadystatechange = function(){
      if(req.readyState == 4){
        callback(JSON.parse(req.responseText))
      }
    }
    req.open('GET',url)
    req.send()
  }
}
feednami.loadGoogleFormat = function(feedUrl,callback){
  return feednami.load({
    url: feedUrl,
    format: 'google',
    includeXml: true
  },callback)
}