const { students, nextId } = require("../data/students.js");
// okay so since the error logic is kind f becaoming dreading to tye over and over again
// im going to found a not found function to handel the error thing

const notFound = (next) => {
  const error = new Error("student not found");
  error.status = 404;
  return next(error);
};
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
    return notFound(next);
  } else {
    const { name, email, course, age, gpa, status } = req.body;
    student.name = name;
    student.email = email;
    student.age = age;
    student.course = course;
    student.gpa = gpa;
    student.status = status;
    //
    res.status(200).json({
      updatedStudent: student,
      message: "Student succesfully updated",
    });
  }
};

const getStudentById = (req, res, next) => {
  const student = students.find((s) => s.id === Number(req.params.id));
  if (!student) {
    return notFound(next);
  } else {
    res.status(200).json(student);
  }
};

const deleteStudent = (req, res, next) => {
  const index = students.findIndex((s) => s.id === Number(req.params.id));
  if (index === -1) {
    return notFound(next);
  } else {
    const [deleted] = students.splice(index, 1);
    res.status(200).json({
      deleted,
      message: "Student deleted succesfully",
    });
  }
};

const getStudent = (req, res, next) => {
  let result = [...students]; // copy the array

  if (req.query.name) {
    result = result.filter((s) =>
      s.name.toLowerCase().includes(req.query.name.toLowerCase()),
    );
  }
  if (req.query.email) {
    result = result.filter((s) =>
      s.email.toLowerCase().includes(req.query.email.toLowerCase()),
    );
  }
  if (req.query.status) {
    result = result.filter(
      (s) => s.status.toLowerCase() === req.query.status.toLowerCase(),
    );
  }
  if (req.query.course) {
    result = result.filter((s) =>
      s.course.toLowerCase().includes(req.query.course.toLowerCase()),
    );
  }
  if (req.query.minGpa) {
    result = result.filter((s) => s.gpa >= Number(req.query.minGpa));
  }

  res.status(200).json(result);
};

const patchStudent = (req, res, next) => {
  const student = students.find((s) => s.id === Number(req.params.id));

  if (!student) {
    return notFound(next);
  } else {
    const { name, email, age, course, gpa, status } = req.body;
    if (req.body.name !== undefined) student.name = req.body.name;
    if (req.body.email !== undefined) student.email = req.body.email;
    if (req.body.age !== undefined) student.age = req.body.age;
    if (req.body.course !== undefined) student.course = req.body.course;
    if (req.body.gpa !== undefined) student.gpa = req.body.gpa;
    if (req.body.status !== undefined) student.status = req.body.status;

    res.status(200).json({
      student,
      message: "Student patched succesfully",
    });
  }
};

const getStats = (req, res, next) => {
  const totalStudents = students.length;
  const totalGpa = students.reduce((sum, s) => sum + s.gpa, 0);
  const averageGpa =
    totalStudents > 0 ? Math.round((totalGpa / totalStudents) * 100) / 100 : 0;
  const studentsByCourse = students.reduce((acc, s) => {
    acc[s.course] = (acc[s.course] || 0) + 1;
    return acc;
  }, {});

  res.status(200).json({
    totalStudents: totalStudents,
    averageGpa: averageGpa,
    studentsByCourse: studentsByCourse,
  });
};

module.exports = {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
  patchStudent,
  getStats,
};
