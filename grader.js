#!/usr/bin/env node
/*
Automatically grade files for the prensence of specified html tags/attributes
Uses commander.js and cheerio
*/

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var rest = require('restler');
var HTMLFILE_DEFAULT = "index.html";
var URL_DEFAULT = "http://intense-beach-7851.herokuapp.com/";
var CHECKSFILE_DEFAULT = "checks.json";

/* Asserts if the file exists */
var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1);
    }
    return instr;
}

/* Asserts if the url is valid */
var checkUrlSite = function(url, checksfile) {
    rest.get(url).on('complete', function(data){
        $ = cheerio.load(data);
        var checks = loadChecks(checksfile).sort();
        var out = {};
        for(var ii in checks) {
            var present = $(checks[ii]).length > 0;
            out[checks[ii]] = present;
        }
        return out;
    });
};

/* using cheerio library, loads htmls file */
var cheerioHtmlFile = function(htmlfile) {
    return cheerio.load(fs.readFileSync(htmlfile));
}

/* read and parses the file */
var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

/* checks html file */
var checkHtmlFile = function(htmlfile, checksfile) {
    $ = cheerioHtmlFile(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
        var present = $(checks[ii]).length > 0;
        out[checks[ii]] = present;
    }
    return out;
};

/* work around for commander.js issue */
var clone = function(fn) {
    return fn.bind({});
};

if(require.main == module) {
    program
            .option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
            .option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
            .option('-u, --url <url>', 'URL Path to the site', URL_DEFAULT)
            .parse(process.argv);
    
        if(program.file) {
        var checkJson = checkHtmlFile(program.file, program.checks);
        var outJson = JSON.stringify(checkJson, null, 4);
        console.log(outJson);
        } else {
        console.log(program.url);
        var checkUrlJson = checkUrlSite(program.url, program.checks);
        console.log(checkUrlJson);
        var outUrlJson = JSON.stringify(checkUrlJson, null, 4);
        console.log(outUrlJson);

        }

    
} else {
        exports.checkHtmlFile = checkHtmlFile;  
}



