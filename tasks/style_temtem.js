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
    tmpCssFile = 'tmp/tmp_css_file.css',
    tmpScssFile = 'tmp/tmp_scss_file.scss';
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
                // cssText = "@import \"" + tmpCssCopyFile.split('tmp/').pop() + "\";",
                cssText = "@import \"" + tmpCssCopyFile + "\";",
                parts;
            
            grunt.file.write(tmpCssCopyFile, grunt.file.read(targetPath));
            filesrc.match(/\/\*[^`]+[\n.]`{3}[^`]*`{3}[^`]*\*\//g).forEach(function(src) {
                parts = src.match(/\/\*([^`]+)[\n.]`{3}([^`]*)`{3}([^`]*)\*\//);
                htmlParts.push({
                    header : md(parts[1]),
                    template : parts[2],
                    method : parts[3],
                });
                cssText += parts[3];
            });

            if (options.preprocessor === 'scss') {
                grunt.file.write(tmpScssFile, cssText);
            }else {
                grunt.file.write(tmpCssFile, cssText);
            }

            var outputSrc = ejs.render(grunt.file.read(templatePath), {
                items : htmlParts,
                style : sass.renderSync(cssText, {
                    includePaths : ['./tmp/tmp_css_copy_file.scss']
                })
            });
            grunt.file.write(resultPath, outputSrc);
        });
    });
};