const util = require('util');
// require('dotenv').config()
const exec = util.promisify(require('child_process').exec)

const test = async (cmd) => {
  console.log("running command: ", cmd)
  const {err, stdout, stderr} = await exec(cmd)

  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  // If successfull, we should output the stdout in a helpful way.
  console.log(`stdout: ${stdout}`);
  if (stderr) {
    console.log(`stderr: ${stderr}`);
  }
}

const run = async () => {
  await test("echo 'hi'")
  await test('which aws')

  console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID)
  console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY)
  try {
    await test('aws s3 sync ./geoserver-test/ s3:geoserver-data.mapseed.org/' )
    //     await test('aws s3 ls s3://geoserver-data.mapseed.org/' )
  } catch (err) {
    console.log("err caught:", err)
    debugger
  }
}
run()
