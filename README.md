# grunt-jenkins-build-info

> Adds Jenkins build information, including source control info, to defined json files (package, bower, etc)

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jenkins-build-info --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jenkins-build-info');
```

## The "jenkins_build_info" task

### Overview
In your project's Gruntfile, add a section named `jenkins_build_info` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jenkins_build_info: {
    main: {
        options: {
          files: ['package.json'] // list of files to add build info
        },
    }
  },
})
```

By default, the build information will be added under a 'build' field in the JSON.  However, 'build' is a future reserved field for npm package.json.  For backward compatibility, it is retained as the default, however you can specified your own field name with the buildField options:

```js
grunt.initConfig({
  jenkins_build_info: {
    main: {
        options: {
          files: ['package.json'] // list of files to add build info,
          buildField: 'buildInfo' // add a 'buildInfo' element to the package.json containing the build info
        },
    }
  },
})
```

### Output
When using outside of Jenkins, this plugin doesn't do much. Where this plugin shines, is when used during a Jenkins build, and using either the Jenkins SVN or GIT plugins.

```json
{
  ...

  "build": {
    "number": "Local Build",
  },

  ...
}
```

This shows example output when Jenkins, and git for version control
```json
{
  ...

  "build": {
    "number": "123",
    "gitRevision": "60b7d67250a8005fcca6d71a18697c9bdc6613bd",
    "gitBranch": "develop"
  },

  ...
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_0.1.0_ - Made multitask, and added option of specifying the field the build information is added to.
_0.0.3_ - Add the job url and build tag
_0.0.2_ - Clean up some of the process.env parsing
_0.0.1_ - Initial release

## License
Copyright (c) 2014 M. Adam Kendall. Licensed under the MIT license.
