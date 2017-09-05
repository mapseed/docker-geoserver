// You can call this with the command:
// curl --user 'user:pass' http://localhost:3000
const handleSync = (req, res, next) => {
  const
    header = req.headers['authorization'] || '',        // get the header
    token = header.split(/\s+/).pop() || '',            // and the encoded auth token
    auth = new Buffer(token, 'base64').toString(),    // convert from base64
    parts = auth.split(/:/),                          // split on colon
    username = parts[0],
    password = parts[1]

  if (process.env.USERNAME === username &&
      process.env.PASSWORD === password) {
    console.log('success!!!')
    res.writeHead(200, { 'Content-Type':'text/plain' })
    // TODO: sync the ~/geoserver_data/[^data] to our geoserver-config bucket,
    // and the ~/geoserver_data/data to our public gis bucket, eg:
    // exec(`aws s3 sync --acl public-read ~/geoserver_data/data/ s3://geoserver-data.mapseed.org`, () => {
    //   console.log("done syncing!")
    // });
    // TODO: send the output in our response! Possibly streaming it as well...
  } else {
    res.writeHead(401, { 'Content-Type':'text/plain' })
  }
  res.end(`invalid username:"${username}" and password: "${password}"`)
  next()
}

module.exports = handleSync


