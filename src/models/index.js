const Course = require("./Course");
const Student = require("./Student");

//table pivot
Course.belongsToMany(Student, { through: "CoursesStudents" })
Student.belongsToMany(Course, { through: "CoursesStudents" })