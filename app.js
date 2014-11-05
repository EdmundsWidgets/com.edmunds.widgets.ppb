/**
 * Created by Ivan_Kauryshchanka on 10/23/2014.
 */
var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    url = require('url'),
    masheryApi = require('./routes/api/mashery'),

    http = require('http'),
    path = require('path'),

    fs = require('fs'),
    ejs = require('ejs');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/libs', express.static(path.join(__dirname, 'bower_components')));
    app.use(require('less-middleware')({
        src: __dirname + '/src/ppb/less',
        dest: __dirname + '/public/css',
        prefix: '/css',
        compress: true
    }));
});

//app.use('/ppb', express.static(path.join(__dirname, 'public/ppb')));
app.use('/ppb', express.static(path.join(__dirname, 'src/ppb')));
app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/ppb/configure', routes.ppb.configurator);
app.get('/ppb/configure/about', routes.ppb.about);


app.get('/api/keyvalidate', masheryApi.keyValidate);

app.get('/dealer/sendlead', masheryApi.sendLead);

app.get('/loader-ppb.js', function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.render('loader-ppb', {
        baseUrl: req.protocol + '://' + req.headers.host
    });
});
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
