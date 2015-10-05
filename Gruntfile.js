module.exports = function(grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    creds: grunt.file.readJSON("credentials.json"),

    //- Compile Sass
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'src/css/main.css': 'src/scss/main.scss'
        }
      }
    },

    //- Assemble Layouts
    assemble: {
      options: {
        layoutdir: 'src/layouts',
        flatten: true
      },
      pages: {
        src: ['src/emails/*.hbs'],
        dest: 'test/'
      }
    },

    //- Inline CSS
    premailer: {
      simple: {
        options: {
          removeComments: true,
          verbose: true
        },
        files: [{
            expand: true,
            src: ['test/*.html'],
            dest: ''
        }]
      }
    },

    //- Minify the HTML
    htmlmin: {
      dist: {
        options: {
          removeComments: false,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'test/',
          src: '**/*.html',
          dest: 'dist/'
        }]
      }
    },

    //- Listen for changes on save
    watch: {
      files: ['src/scss/**/*','src/emails/*','src/layouts/*'],
      tasks: ['default']
    },

    //- Send email through Mailgun
    mailgun: {
      mailer: {
        options: {
          key: '<%= creds.mailgunAPIkey %>',
          sender: '<%= creds.myEmailAddress %>',
          recipient: '<%= creds.staticTestAddress %>',
          subject: 'TEST - ' + displayTime()
        },
        src: ['dist/*']
      }
    },

    //- Put Images into an S3 Bucket
    aws: grunt.file.readJSON("credentials.json"),
    s3: {
      options: {
        accessKeyId: "<%= creds.accessKeyId %>",
        secretAccessKey: "<%= creds.secretAccessKey %>",
        bucket: "<%= creds.bucket %>"
      },
      build: {
        cwd: "",
        src: "src/img/*"
      }
    },

    // CDN will replace local paths with your Cloud CDN path
    cdn: {
      options: {
        cdn: 'https://s3.amazonaws.com/<%= s3.options.bucket %>/',
        flatten: true,
        supportedTypes: 'html'
      },
      dist: {
        /** @required  - gets sources here, may be same as dest  */
        cwd: './dist/',
        /** @required  - puts results here with respect to relative paths  */
        dest: './dist/',
        /** @required  - files to process */
        src: ['./dist/*.html']
      }
    }
  });
  grunt.loadNpmTasks('assemble');
  grunt.registerTask('default', ['sass','assemble','premailer','htmlmin','watch']);

  // Upload files to CDN and update paths
  grunt.registerTask('cdn', ['sass','assemble','premailer','htmlmin','s3','cdn']);

  // Create task that skips watch for CDN
  grunt.registerTask('build', ['sass','assemble','premailer','htmlmin']);

  // Use grunt send if you want to actually send the email to your inbox
  grunt.registerTask('send', ['mailgun']);

};

function displayTime() {
  var str = "";

  var currentTime = new Date()
  var hours = currentTime.getHours()
  var minutes = currentTime.getMinutes()
  var seconds = currentTime.getSeconds()

  if (minutes < 10) {
      minutes = "0" + minutes
  }
  if (seconds < 10) {
      seconds = "0" + seconds
  }
  str += hours + ":" + minutes + ":" + seconds;
  if(hours > 11){
      str += "PM"
  } else {
      str += "AM"
  }
  return str;
}
