var express = require('express');
var app = express();

var expressHbs = require('express-handlebars');
var hbs = expressHbs.create({
	extname			: 'hbs',
	defaultLayout	: 'layout_main', 
	layoutsDir		: __dirname + '/views/layouts/',
	partialsDir		: __dirname + '/views/partials/'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
// Body Parser Middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit:'50mb' }));

var session = require('express-session');
app.use(session({ secret: 'dtphong' })); // session secret

require('./routes/mainroutes')(app);

// start
app.set('port', (process.env.PORT || 5000));
// save port
var Ip = require('./config/port');
//

var server = app.listen(app.get('port'), function(){
	console.log('Server is listening at port ' + app.get('port'));
});

var io = require('socket.io').listen(server);
var ip = require('ip');
Ip.add(app.get('port').toString(), ip.address());
require('./routes/socketio')(io);
