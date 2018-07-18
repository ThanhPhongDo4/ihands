var ip = require('../config/port');
module.exports = function(app) {
    app.get('/', function(req, res){
        console.log('gui xuong')
        console.log(ip);
        res.render('index', {socketIO: ip});
    })
}
