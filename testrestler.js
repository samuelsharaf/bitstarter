#!/usr/bin/env node
var rest = require('restler');

var getResp = function(url){
    rest.get(url).on('complete', function(response){
      console.log(response);
    });
};

getResp('http://google.com/');
