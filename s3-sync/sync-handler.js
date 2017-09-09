const util = require('util');
const exec = util.promisify(require('child_process').exec)

// You can call this with the command:
// curl --user 'user:pass' http://localhost:3000
const handleSync = async (req, res, next) => {
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
    // sync the ~/geoserver_data/[^data] to our geoserver-config bucket,
    // and the ~/geoserver_data/data to our public gis bucket, eg:

    // TODO: pass in {encoding: 'buffer'} to make stdout a buffer!
    //     const {err, stdout, stderr} = await exec('aws s3 sync ./geoserver-test/ s3:geoserver-data.mapseed.org/' )
    const {err, stdout, stderr} = {
      err: null,
      stdout: 'this is stdout',
      stderr: 'this is stderr',
    }
    if (err) {
      res.writeHead(500, { 'Content-Type':'text/plain' })
      res.end(`err: ${err}`)
    } else {
      res.writeHead(200, { 'Content-Type':'text/plain' })
      // TODO: make these buffers!
      res.end(`stdout: ${stdout}, stderr: ${stderr}`)
    }
  } else {
    res.writeHead(401, { 'Content-Type':'text/plain' })
    res.end(`invalid username:"${username}" and password: "${password}"`)
  }
  next()
}

module.exports = handleSync


