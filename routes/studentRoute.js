const express = require("express");
const router = express.Router();

const {
  getStudent,
  getStudentById,
  updateStudent,
  patchStudent,
  createStudent,
  deleteStudent,
  getStats,
} = require("../controllers/studentController.js");
const validateStudentInput = require("../middleware/validation");

router.get("/", getStudent);
router.get("/stats", getStats);
router.get("/:id", getStudentById);

router.post("/", validateStudentInput, createStudent);

router.put("/:id", validateStudentInput, updateStudent);

router.patch("/id", validateStudentInput, patchStudent);

router.delete("/:id", deleteStudent);

module.exports = router;
