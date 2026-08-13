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

const getAllStudents = (req, res, next) => {
  if (!students) {
    const error = new Error("There are no students in the database");
    error.status = 404;
    return next(error);
  } else {
    res.status(200).json(students);
  }
};

const getStudentByID = (req, res, next) => {
  const student = students.find((s) => s.id === Number(req.params.id));
  if (!student) {
    const error = new Error("student not found");
    error.status = 404;
    return next(error);
  } else {
    res.status(200).json(student);
  }
};

const getStudentByName = (req, res, next) => {
  const student = students.filter((s) =>
    s.name.toLowerCase().includes(req.query.name.toLowerCase()),
  );
  if (!student) {
    const error = new Error("student not found");
    error.status = 404;
    return next(error);
  } else {
    res.status(200).json(student);
  }
};

const getStudentByEmail = (req, res, next) => {
  const student = students.filter((s) =>
    s.email.toLowerCase().includes(req.query.email.toLowerCase()),
  );
  if (!student) {
    const error = new Error("Student not found");
    error.status = 404;
    return next(error);
  } else {
    res.status(200).json(student);
  }
};

const deleteStudent = (req, res, next) => {
  const index = students.findIndex((s) => s.id === Number(req.params.id));
  if (index === Number(-1)) {
    const error = new Error("Student not found");
    error.status = 404;
    return next(error);
  } else {
    const deleted = students.splice(index, 1);
    res.status(200).json({
      deleted,
      message: "Student deleted succesfully",
    });
  }
};

const filterByCourse = (req, res, next) => {
  const student = students.filter((s) =>
    s.course.toLowerCase().includes(req.query.course.toLowerCase()),
  );
  if (!student) {
    const error = new Error("Students not found");
    error.status = 404;
    return next(error);
  } else {
    res.status(200).json({
      student,
      message: "filtered by course succesfully",
    });
  }
};
