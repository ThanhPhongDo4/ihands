var config = {
    port: "5000", 
    ip: "127.0.0.1",
    add: function(iport, iip) {
        this.port = iport;
        this.ip = iip;
    }
}
module.exports = config;