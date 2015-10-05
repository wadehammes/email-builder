# Email Builder
Use the email builder directory to build your emails, using the below.

##Base Ink
Grunt-driven email templating using Zurb Ink responsive email framework. Based largely off of Lee Munroe's grunt-email-design task, found here: https://github.com/leemunroe/grunt-email-design, with added features including HTML minification, S3 support, and <a href="http://zurb.com/ink">Zurb Ink</a> framework.

####Use
Make sure you have node.js installed.

Then run the following in the terminal/shell:
```
git clone git@github.com:wadehammes/base-ink.git
cd base-ink
npm install
grunt
```

####Placing images into an S3 Bucket
To use S3 for image management, first provide your credentials in the credentials.json file:

```
{
  "accessKeyId"      : "PUBLIC ACCESS KEY HERE",
  "secretAccessKey"  : "SECRET ACCESS KEY HERE",
  "bucket"           : "...",
  "mailgunAPIkey"    : "...",
  "myEmailAddress"   : "...",
  "staticTestAddress": "..."
}
```

and then also create a bucket in your S3 <b>with a src/ directory, and inside that an img/ directory</b>, and provide that bucket name in the credentials.json like so:

```
{
  "accessKeyId"      : "...",
  "secretAccessKey"  : "...",
  "bucket"           : "BUCKET NAME HERE",
  "mailgunAPIkey"    : "...",
  "myEmailAddress"   : "...",
  "staticTestAddress": "..."
}
```

Then, in order to CDNify your templates, run:
```
grunt cdnify
```

####Testing with Mailgun
To send with Mailgun, create an account at http://mailgun.com and get your API Key:
```
key-XXXXXXXXXXXXXXXXXX
```

If you want to send and auto-create a Litmus email test (http://litmus.com), create an account and in your account settings copy your <b>Static Test Address</b> and add it to the credentials.json, along with your email (sent from):

```
//- Send email through Mailgun
{
  "accessKeyId"      : "...",
  "secretAccessKey"  : "...",
  "bucket"           : "...",
  "mailgunAPIkey"    : "API KEY HERE",
  "myEmailAddress"   : "MY EMAIL HERE",
  "staticTestAddress": "LITMUS (OR OTHER) TEST EMAIL ADDRESS HERE"
}
```

Then to send a test email, run:
```
grunt send
```

<b>Note: if you plan to fork and use this in a repo, I suggest adding credentials.json to your .gitignore file in order to protect your access keys/privacy</b>

####Copyright
* Ink v1.0.5 - Copyright 2013 ZURB Inc
* Based heavily off of https://github.com/leemunroe/grunt-email-design

