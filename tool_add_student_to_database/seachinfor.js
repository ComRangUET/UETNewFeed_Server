const classes = require('../models/classesmodels');
const course = require('../models/coursemodels');

async function seachClass(class_name) {
    const result = await classes.findOne({
        where: {
            name: class_name
        }
    })
    if (result == null) {
        const data = await classes.create({
            name: class_name
        })
        return data.dataValues.id
    }
    else {
        return result.dataValues.id;
    }
}

async function seachCourse(course_name) {
    const result = await course.findOne({
        where: {
            name: course_name
        }
    })
    if (result == null) {
        const data = await course.create({
            name: course_name
        })
        return data.dataValues.id
    }
    else {
        return result.dataValues.id;
    }
}

module.exports = {
    seachClass,
    seachCourse
}