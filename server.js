var express = require('express');
var jade = require('jade');
var sources = require('./sources');
var jadeUtils = require('sf-jade-utils');

var app = express();

app.engine('jade', jade.__express);

app.use('/bower_components',express.static('bower_components'));
app.use(express.static('dev'));

app.use(function(req, res, next){
  res.locals.sources = sources;
  res.locals.u = jadeUtils;
  next();
});

app.get('*', function (req, res) {
  var filename = req.url.substr(1);
  filename = filename=="" ? 'index': filename;
  res.render('index.jade')
})

var server = app.listen(5000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Running at localhost:%s',port)
})