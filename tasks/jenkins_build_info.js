/*
 * grunt-jenkins-build-info
 * https://github.com/linuxbozo/grunt-jenkins-build-info
 *
 * Copyright (c) 2014 M. Adam Kendall
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('jenkins_build_info', 'Adds Jenkins build information, including source control info,  to defined json (package, bower, etc)', function () {

    var svnRevision = process.env.SVN_REVISION || null;
    var gitRevision = process.env.GIT_COMMIT || null;
    var gitBranch = process.env.GIT_BRANCH || null;
    var jenkinsBuildNumber = process.env.BUILD_NUMBER || null;
    var jenkinsJobUrl = process.env.JOB_URL || null;
    var jenkinsBuildTag = process.env.BUILD_TAG || null;


    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      files: [],
      buildField: "build"
    });
    var buildField = options.buildField;

    // Iterate over all specified file groups.
    options.files.forEach(function (file, idx) {
      if (!grunt.file.exists(file)) {
        grunt.log.warn('Source file "' + file + '" not found.');
        return false;
      }
      var src = grunt.file.readJSON(file);

      src[buildField] = {};
      if (jenkinsBuildNumber) {
        console.log("Setting build number...");
        src[buildField].number = jenkinsBuildNumber;
      }
      if (jenkinsBuildTag) {
        console.log("Setting build tag...");
        src[buildField].tag = jenkinsBuildTag;
      }
      if (jenkinsJobUrl) {
        console.log("Setting job url...");
        src[buildField].url = jenkinsJobUrl;
      }
      if (svnRevision !== null) {
        console.log("Setting svn revision...");
        src[buildField].svnRevision = svnRevision;
      }
      if (gitRevision !== null) {
        console.log("Setting git revision...");
        src[buildField].gitRevision = gitRevision;
      }
      if (gitBranch !== null) {
        console.log("Setting git branch...");
        src[buildField].gitBranch = gitBranch;
      }

      grunt.file.write(file, JSON.stringify(src, null, 2));

    });


    // Print a success message.
    grunt.log.writeln('Build information updated.');
  });

};
