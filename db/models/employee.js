const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const EmployeeSchema = new mongoose.Schema({
  employeeId:{type:Number,unique:true},
  firstName: String,
  lastName: String,
  email: String,
  department: { type: Schema.Types.ObjectId, ref: "department" },
});

const employeeModel = mongoose.model("employee", EmployeeSchema);
module.exports = employeeModel;
