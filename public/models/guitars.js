var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GuitarSchema   = new Schema({
    id:{type: String, unique : true, required : true},
    name: {type: String, unique : true, required : true},
    type: {type: String,  required : true},
    manufacturer: String,
    model: String,
    bodymaterial: String,
    neckmaterial: String,
    colour: String,
    price:String,
    description: String,
    images: [{type: String}]

});

module.exports = mongoose.model('Guitar', GuitarSchema);
