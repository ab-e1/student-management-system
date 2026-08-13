const students = [
  {
    id: 1,
    name: "Amina Hassen",
    email: "amina@gmail.com",
    course: "computer science",
    age: 21,
    gpa: 3.7,
    status: "active",
  },
];

const nextId = () => {
  return Math.max(...students.map((students) => students.id)) + 1;
};

module.exports = { students, nextId };
