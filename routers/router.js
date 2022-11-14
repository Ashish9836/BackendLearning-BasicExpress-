const express = require("express");
const router = new express.Router();
const connectionMongo = require("../db/connection");
const { success, error } = require("../responseUtil/response");
const { updateEmployee, createEmployee } = require("../service/service");
const employee = require("../db/models/employee");
connectionMongo()
  .then(() => {
    console.log("mongo connected!");
  })
  .catch((err) => console.log(err));

router.get("/employee", async (req, res) => {
  try {
    const result = await employee.find().populate("department");
    return res.send(success("FETCHING SUCCESSFUL", result));
  } catch (err) {
    console.log(err);
    return res.send(error("INTERNAL ERROR DURING FETCHING EMPLOYEE"));
  }
});
router.post("/employee", async (req, res) => {
  const body = req.body;
  try {
    const result = await createEmployee(body);
    return res.send(success("CREATE EMPLOYEE SUCCESSFUL", result));
  } catch (err) {
    return res.send(error("INTERNAL ERROR CREATION FAILED"));
  }
});
router.put("/employee/:id", async (req, res) => {
  const body = req.body;
  const employeeId = req.params.id;
  try {
    const result = await updateEmployee(employeeId, body);
    return res.send(success("UPDATION SUCCESSFUL", result));
  } catch (err) {
    return res.send(error("INTERNAL ERROR DURING UPDATION"));
  }
});
router.delete("/employee/:id", async (req, res) => {
  try {
    const result = await employee
      .deleteOne({ employeeId: req.params.id })
      .populate("department");
    return res.send(success("DELETION SUCCESSFUL", result));
  } catch (err) {
    return res.send(error("INTERNAL ERROR DURING DELETION"));
  }
});

module.exports = router;
