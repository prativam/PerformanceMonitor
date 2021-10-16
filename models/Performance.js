var mongoose = require("mongoose");

const performanceSchema = mongoose.Schema({
  id : {type : Number},
  date: {type : Date},
  P90: {type : Number},
  P80: {type : Number},
  AVG: {type : Number},
  MAX: {type : String},
  CounterName: {type : String},
  Total: {type : String },
  createdAt: { type : Date, default: Date.now },
  updatedAt: { type : Date, default: Date.now },
  resource_name: {type: String, required: true}
});


module.exports = mongoose.model("Performance", performanceSchema)