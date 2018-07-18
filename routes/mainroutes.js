var ip = require('../config/port');
var mode = require('../config/mode');
module.exports = function(app) {
    app.get('/', function(req, res){
        res.render('index', {socketIO: ip, modesz: mode.mode});
    })
}
