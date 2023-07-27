const catchError = require('../utils/catchError');
const Student = require('../models/Student');
const Course = require('../models/Course');

const getAll = catchError(async (req, res) => {
    const results = await Student.findAll({ include: [Course] });
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const result = await Student.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Student.findByPk(id);
    if (!result) return res.sendStatus(400);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Student.destroy({ where: { id } });
    if (!result) return res.sendStatus(400);
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Student.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (result[0] === 0) return res.sendStatus(400);
    return res.json(result[1][0]);
});

const setCourses = catchError(async (req, res) => {
    //1-bsucar al estudiante
    const { id } = req.params
    const student = await Student.findByPk(id)
    if (!student) return res.sendStatus(400);
    //2-setear los valores del curso
    await student.setCourses(req.body)
    //3-leer los cursos seteados
    const courses = await student.getCourses()
    // 4-retorno
    console.log(res);
    return res.json(courses)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setCourses
}