var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var TestSchema = mongoose.Schema({ any: {}, },
{
  strict: false
});

module.exports = mongoose.model('test', TestSchema, 'test');