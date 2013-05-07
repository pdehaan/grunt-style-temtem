/*
 * grunt-style-temtem
 * https://github.com/orangemittoo/grunt-style-temtem
 *
 * Copyright (c) 2013 orangemittoo
 * Licensed under the MIT license.
 */

'use strict';
var 
    md = require("node-markdown").Markdown,
    ejs = require('ejs'),
    sass = require('node-sass');

var tmpCssCopyFile = 'tmp/tmp_css_copy_file.scss',
    errorMsg = 'There is no template in the target file';
module.exports = function(grunt) {
    grunt.registerMultiTask('style_temtem', 'discription', function() {
        var options = this.options({
            preprocessor : 'scss'
        });
        var config = grunt.config('style_temtem'),
            cssArr = this.data.files;
        cssArr.forEach(function(fileObj) {
            var htmlParts = [],
                targetPath = fileObj.targetFile,
                templatePath = fileObj.template,
                resultPath = fileObj.result,
                filesrc = grunt.file.read(targetPath),
                regResult = filesrc.match(/\/\*[^`]+[\n.]`{3}[^`]*`{3}[^`]*\*\//g),
                // cssText = "@import \"" + tmpCssCopyFile.split('tmp/').pop() + "\";",
                cssText = "@import \"" + tmpCssCopyFile + "\";",
                parts;
            
            if (regResult) {
                grunt.file.write(tmpCssCopyFile, grunt.file.read(targetPath));
                regResult.forEach(function(src) {
                    parts = src.match(/\/\*([^`]+)[\n.]`{3}([^`]*)`{3}([^`]*)\*\//);
                    htmlParts.push({
                        header : md(parts[1]),
                        template : parts[2],
                        method : parts[3],
                    });
                    cssText += parts[3];
                });

                var outputSrc = ejs.render(grunt.file.read(templatePath), {
                    items : htmlParts,
                    style : sass.renderSync(cssText, {
                        includePaths : [tmpCssCopyFile]
                    })
                });
                grunt.file.write(resultPath, outputSrc);
                grunt.file.delete('./tmp/');
                console.log('\u001b[32m' + "Success \u001b[0m: " + resultPath);
            }else {
                grunt.file.write(resultPath, errorMsg);
                console.log('\u001b[33m' + 'Warning \u001b[0m: ' + errorMsg);
            }
        });
    });
};