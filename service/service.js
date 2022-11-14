const employee = require("../db/models/employee");
const department = require("../db/models/department");
async function createDepartment(depart) {
    const obj = new department({ name: depart });
    const res = await obj.save();
    return res;
  }
  
  async function createEmployee(body) {
    const depart = body.department;
    let id = null;
    let resDepartment = await department
      .findOne()
      .where("name")
      .equals(department);
    if (resDepartment == null) {
      resDepartment = await createDepartment(depart);
      console.log(resDepartment, "dbdbd");
    }
    id = resDepartment._id;
  
    const emp = new employee();
    emp.firstName = body.firstName;
    emp.lastName = body.lastName;
    emp.email = body.email;
    emp.employeeId = body.employeeId;
    emp.department = id;
    let resultEmployee = await emp.save();
    resultEmployee = await employee
      .findOne()
      .where("_id")
      .equals(resultEmployee._id)
      .populate("department");
  return resultEmployee;
    
  }
  
  async function updateEmployee(employeeId, body) {
    const res = await employee.findOne({ employeeId }).populate("department");
    if (
      body["department"] != undefined &&
      body["department"] != res.department.name
    ) {
      const objDepartment = new department();
      objDepartment.name = body["department"];
      const resultDepartment = await objDepartment.save();
      return await employee.findOneAndUpdate(
        { employeeId },
        { ...body, department: resultDepartment._id },
        { new: true }
      );
    } else {
      return await employee.findOneAndUpdate(
        { employeeId },
        { ...body },
        { new: true }
      );
    }
  }

  module.exports = {updateEmployee,createEmployee};