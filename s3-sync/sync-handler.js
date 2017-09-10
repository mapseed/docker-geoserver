const util = require('util');
const exec = util.promisify(require('child_process').exec)

// You can call this with the command:
// curl --user 'user:pass' http://localhost:3000
const handleSync = async (req, res, next) => {
  const
    header = req.headers['authorization'] || '', // get the header
    token = header.split(/\s+/).pop() || '',  // and the encoded auth token
    auth = new Buffer(token, 'base64').toString(),  // convert from base64
    parts = auth.split(/:/),  // split on colon
    username = parts[0],
    password = parts[1]

  const geoserverDataDir = process.env.GEOSERVER_DATA_DIR
  const s3Bucket = process.env.S3_BUCKET
  if (!geoserverDataDir || !s3Bucket) {
    res.writeHead(500, { 'Content-Type':'text/plain' })
    res.end(`GEOSERVER_DATA_DIR or S3_BUCKET are not configured!`)
    return next()
  }

  if (process.env.USERNAME !== username ||
      process.env.PASSWORD !== password) {
    res.writeHead(401, { 'Content-Type':'text/plain' })
    res.end(`invalid creds!`)
    return next()
  }

  try {
    res.writeHead(200, { 'Content-Type':'text/plain' })
    res.write('stdout:\n')
    const {stdout, stderr} = await exec(`aws s3 sync ${geoserverDataDir} s3://${s3Bucket}/`,
                                        { encoding: 'buffer' })
    res.write(stdout)
    res.write('\nstderr:\n')
    res.end(stderr)
  } catch (err) {
    res.writeHead(500, { 'Content-Type':'text/plain' })
    res.end(`err: ${err}`)
  }
  return next()
}

module.exports = handleSync
