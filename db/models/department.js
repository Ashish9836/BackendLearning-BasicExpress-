const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const DepartmentSchema = new mongoose.Schema({
  name: String,
});

const departmentModel = mongoose.model("department", DepartmentSchema);
module.exports = departmentModel;
