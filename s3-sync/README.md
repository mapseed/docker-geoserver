# Geoserver S3-sync

This module provides a simple UI to authenticate a user and allows them to sync their Geoserver data directory with an S3 bucket.

Authentication is done through the HTTP basic auth method (simple username and password verification).

## How do I use this to sync my directory?

To use this container within your Geoserver docker solution, simply add the following variables to a file name `.env` in the project root:

```
USERNAME=<basic-auth-username>
PASSWORD=<basic-auth-password>
AWS_ACCESS_KEY_ID=<aws-access-key-id>
AWS_SECRET_ACCESS_KEY=<aws-secret-access-key>
```

An express server is used to serve the static assets of the webpage form and to handle incoming requests that perform the S3 bucket synchronization.

Once this container is running, simple navigate to the `/` route of the service, and you should see a login page. So just enter your login creds, and push the "sync" button! Example shown below:

![login demo](./login.gif "Login Demo")

## How does this work?

The goal is to provide an `rsync`-like feature that will synchronize the resources under a Geoserver data directory with that of an external data store that can be used across multiple services. `rsync`'s usage for differential backups was the most appealing feature for synchronizing instead of naively uploading the resources to our S3 bucket.

NOTE: We are using the `aws-cli` package to perform the synchronization by running the `aws s3 sync` command. Unfortunately, the `aws-sdk` module does not provide access to the `sync` command. See the docs for the S3 under "Method Summaries" here: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html. So perhaps one day `aws-sdk` will ship this feature. Until then, we are performing our differential sync using `exec('aws s3 sync')`.
