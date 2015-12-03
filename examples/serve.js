var http = require('http')
var fs = require('fs')

var paths = {
  '/': __dirname + '/index.html',
  '/js/feednami-client.js': __dirname + '/../src/feednami-client.js',
  '/js/examples.js': __dirname + '/js/examples.js',
  '/css/style.css': __dirname + '/css/style.css'
}

var server = http.createServer(function(req,res){
  var file = paths[req.url.split('?')[0]]
  if(file){
    fs.createReadStream(file).pipe(res)
  }
  else{
    res.statusCode = 404
    res.write('Not found.')
    res.end()
  }
})

server.listen(8201)