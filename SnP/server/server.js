var Hyper = require('hyper.io');

// load config and routes
var hyper = new Hyper( {
    port: process.env.PORT || 8000,
    appName: "server"
} );

// Start web server
hyper.load([
    'stats',
    'frontend'
])
    .then(function(){
        hyper.httpFramework()
            .app()
            .use(function(req, res, next) {
                // enable CORS
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
                res.setHeader('Access-Control-Allow-Credentials', true);
                next();
            });
        hyper.start();
    });
