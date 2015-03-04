var express = require('express');
var jade = require('jade');
var sources = require('./sources');

var app = express();

app.engine('jade', jade.__express);

app.use(express.static('bower_components'));
app.use(express.static('public'));

app.use(function(req, res, next){
  res.locals.sources = sources;
  next();
});

app.get('*', function (req, res) {
  var filename = req.url.substr(1);
  filename = filename==""? 'index': filename;
  res.render(filename + '.jade', function(err,html){
  	if(err) return res.status(404).send('\'' + filename + '\' not found');
  	res.send(html);
  });
})

var server = app.listen(5000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Running at localhost:%s',port)
})