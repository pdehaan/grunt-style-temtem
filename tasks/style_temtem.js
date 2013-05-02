/*
 * grunt-style-temtem
 * https://github.com/orangemittoo/grunt-style-temtem
 *
 * Copyright (c) 2013 orangemittoo
 * Licensed under the MIT license.
 */

'use strict';
var fs = require("fs"),
    jsdom = require('jsdom').jsdom,
    md = require("node-markdown").Markdown,
    ejs = require('ejs');
module.exports = function(grunt) {
    var req = 
    grunt.registerTask('style_temtem', 'discription', function() {
        var options = this.options({
            selector : {
                header: 'style-temtem-header',
                template: 'style-temtem-template'
            }
        });
        var config = grunt.config('style_temtem'),
            cssArr = config.files,
            cssPath, tempPath, resultPath, filesrc, parts, htmlParts;

        cssArr.forEach(function(fileObj) {
            htmlParts = [];
            cssPath = fileObj.css;
            tempPath = fileObj.temp;
            resultPath = fileObj.result;
            filesrc = grunt.file.read(cssPath);
            var req = filesrc.match();
            // console.log('0 ****************');
            // console.log(req[0]);
            // console.log('1 ****************');
            // console.log(req[1]);
            // console.log('2 ****************');
            // console.log(req[2]);
            // console.log('3 ****************');
            // console.log(req[3]);
            filesrc.match(/\/\*[^`]+[\n.]`{3}[^`]*`{3}[^`]*\*\//g).forEach(function(src) {
                parts = src.match(/\/\*([^`]+)[\n.]`{3}([^`]*)`{3}([^`]*)\*\//);
                // console.log('src ****************');
                // console.log(src);
                // console.log("0 ****************");
                // console.log(parts[0]);
                // console.log("1 ****************");
                // console.log(parts[1]);
                // console.log("2 ****************");
                // console.log(parts[2]);
                // console.log("3 ****************");
                // console.log(parts[3]);
                htmlParts.push({
                    header : md(parts[1]),
                    template : parts[2],
                    method : parts[3],
                });
            });

            // var tempSrc = jsdom(grunt.file.read(tempPath));
            // htmlParts.forEach(function(partsObj) {
            //     var headerElm = tempSrc.getElementsByClassName(options.selector.header),
            //         templateElm = tempSrc.getElementsByClassName(options.selector.template),
            //         counter = 0,
            //         prop;
                
            //     for (prop in headerElm) {
            //         headerElm[prop].innerHTML = partsObj.header;
            //     }
            //     console.log(tempSrc.innerHTML);                
            // });

            var outputSrc = ejs.render(grunt.file.read(tempPath), {
                items : htmlParts
            });
            grunt.file.write(resultPath, outputSrc);
            console.log(outputSrc);
        });
    });

    // grunt.registerMultiTask('style_temtem', 'Your task description goes here.', function() {
    //   // Merge task-specific and/or target-specific options with these defaults.
    //   var options = this.options({
    //     punctuation: '.',
    //     separator: ', '
    //   });

    //   // Iterate over all specified file groups.
    //   this.files.forEach(function(f) {
    //     // Concat specified files.
    //     var src = f.src.filter(function(filepath) {
    //       // Warn on and remove invalid source files (if nonull was set).
    //       if (!grunt.file.exists(filepath)) {
    //         grunt.log.warn('Source file "' + filepath + '" not found.');
    //         return false;
    //       } else {
    //         return true;
    //       }
    //     }).map(function(filepath) {
    //       // Read file source.
    //       return grunt.file.read(filepath);
    //     }).join(grunt.util.normalizelf(options.separator));

    //     // Handle options.
    //     src += options.punctuation;

    //     // Write the destination file.
    //     grunt.file.write(f.dest, src);

    //     // Print a success message.
    //     grunt.log.writeln('File "' + f.dest + '" created.');
    //   });
    // });

};