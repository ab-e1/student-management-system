const { students, nextId } = require("../data/students.js");

const createStudent = (req, res, next) => {
  const { name, email, course, age, gpa, status } = req.body;

  const newStudent = {
    id: nextId(),
    name: name,
    email: email,
    age: age,
    course: course,
    gpa: gpa,
    status: status.trim().toLowerCase(),
  };
  students.push(newStudent);
  res
    .status(201)
    .json({ newStudent, message: "new student succesfully created" });
};

const updateStudent = (req, res, next) => {
  const student = students.find((s) => s.id === Number(req.params.id));

  if (!student) {
    const error = new Error("student not found");
    error.status = 404;
    return next(error);
  }

  const { name, email, course, age, gpa, status } = req.body;
  student.id = student.id;
  student.name = name;
  student.email = email;
  student.age = age;
  student.course = course;
  student.gpa = gpa;
  student.status = status;
  //
  res.status(200).json({
    updatedStident: student,
    message: "Student succesfully updated",
  });
};
