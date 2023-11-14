const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { versionKey: false }
);
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
