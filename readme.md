# email-builder
Build emails using Zurb Ink with Grunt, with optional AWS S3 and Litmus testing

To use, you will need to copy these files to your project directory and run:
`npm install`

You will then need to create `credentials.json` in the root director, and add:

```
{
  "accessKeyId"      : "YOUR S3 ACCESS KEY",
  "secretAccessKey"  : "YOUR S3 SECRET ACCESS KEY",
  "bucket"           : "YOUR S3 BUCKET",
  "mailgunAPIkey"    : "YOUR MAILGUN API KEY",
  "myEmailAddress"   : "YOUR EMAIL ADDRESS",
  "staticTestAddress": "YOUR LITMUS STATIC TEST ADDRESS"
}
```
This file is necessary for uploading files to your S3 CDN and for sending off emails for testing.

Sign up for a Mailgun API key [here](http://www.mailgun.com/)

## Building with Email Builder
Email Builder uses Assemble files for building templates. You will need to do all dev in the `src` directory.

`layouts/` will be your default layouts, and `emails/` will be your various body templates.

All CSS can be written in `SCSS/` using typical Sass/SCSS tools.
