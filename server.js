var express = require('express');
var jade = require('jade');
var sources = require('./sources');
var fs = require('fs');
var app = express();

var jadeUtils = require('sf-jade-utils');
jadeUtils.setLocale('es');

app.engine('jade', jade.__express);

app.use('/bower_components',express.static('bower_components'));
app.use(express.static('dev'));

app.use(function(req, res, next){
  res.locals.sources = sources;
  res.locals.u = jadeUtils;
  next();
});

app.get('*', function (req, res) {
  console.log(req.url1)
  var filename = req.path.substr(1);
  filename = filename=="" ? 'index': filename;
  fs.exists(__dirname+'/views/'+filename+'.jade', function(exists){
  	if(exists){
  		res.render(filename+'.jade')
  	}else{
  		res.status(404).send(filename + ' not found!')
  	}
  });
})

var server = app.listen(5000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Running at localhost:%s',port)
})