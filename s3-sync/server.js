const http = require('http')

// You can call this with the command:
// curl --user 'user:pass' http://localhost:3000
http.createServer(function(req,res) {
  const
    header=req.headers['authorization']||'',        // get the header
    token=header.split(/\s+/).pop()||'',            // and the encoded auth token
    auth=new Buffer(token, 'base64').toString(),    // convert from base64
    parts=auth.split(/:/),                          // split on colon
    username=parts[0],
    password=parts[1];

  console.log('username is "'+username+'" and password is "'+password+'"');
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('username is "'+username+'" and password is "'+password+'"');

}).listen(3000,'localhost');
