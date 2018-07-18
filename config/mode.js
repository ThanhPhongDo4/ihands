var model = {};
model.mode = 1;
model.change = function() {
    this.mode = 1 - this.mode;
}
model.update = function(i) {
    this.mode = i;
}
module.exports = model;