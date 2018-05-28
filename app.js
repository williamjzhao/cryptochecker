var static = require('node-static');
const express = require('express');
const path = require('path');

var file = new static.Server();

require('http').createServer(function(request, response) {
  request.addListener('end', function() {
    file.serve(request, response);
  }).resume();
}).listen(process.env.PORT || 3000);

