const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  name: String,
  type: String,
  data: Buffer,
});

module.exports = mongoose.model("file", fileSchema);
