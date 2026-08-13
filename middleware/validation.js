// validation it  needs to check , name to be non empty , correct eamil egex, gpa range to be correct , and then age to be non negative

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateStudentInput = (req, res, next) => {
  const { name, email, age, course, gpa, status } = req.body;
  if (!name || !email || !course || !age || !gpa || !status) {
    res.status(400).json({
      valid: false,
      message: " required fileds are missing",
    });
  } else if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof course !== "string" ||
    typeof age !== "number" ||
    typeof gpa !== "number" ||
    (status !== "Active" && status !== "Inactive")
  ) {
    res.status(400).json({
      valid: false,
      message:
        "name , email , and course should be strings, age and gpa should be numbers, and status shold be either active or inactive ",
    });
  } else if (age <= 0 || gpa < 0 || gpa > 4.0) {
    res.status(400).json({
      valid: false,
      message: "age should be greater than 0 and gpa should be b/n 0 and 4.0 ",
    });
  } else if (
    name.trim() === "" ||
    email.trim() === "" ||
    course.trim() === ""
  ) {
    res.status(400).json({
      valid: false,
      message: "name, email, and course can not be empty",
    });
  } else if (!emailRegex.test(email)) {
    res.status(400).json({
      valid: false,
      message: "email not valid, put a valid email",
    });
  } else {
    next();
  }
};

module.exports = validateStudentInput;
