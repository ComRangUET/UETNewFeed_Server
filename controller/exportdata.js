
const multer = require('multer');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const bcrypt = require('bcrypt');


const accounts = require('../models/accountmodels');
const course = require('../models/coursemodels');
const classes = require('../models/classesmodels');
const register = require('../models/registermodels');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (file.originalname.split('.')[file.originalname.split('.').length - 1] != "xlsx" & file.originalname.split('.')[file.originalname.split('.').length - 1] != "xls") {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');

async function seachClass(class_name) {
    try {
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
    catch (err) {
        return null;
    }
}

async function seachCourse(course_name) {
    try {
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
    catch (err) {
        return null
    }
}


function exportStudentToDatabase(req, res) {
    let exceltojson;
    upload(req, res, function (err) {
        if (err) {
            return res.json({
                success: false,
                data: null,
                reason: err.message,
                message: "Đã có lỗi xảy ra"
            })
        }
        if (!req.file) {
            return res.json({
                success: false,
                data: null,
                message: "Không có file nào được chọn"
            })
        }
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        exceltojson({
            input: req.file.path,
            output: null,
        }, async function (err, result) {
            if (err) {
                return res.json({
                    success: false,
                    data: null,
                    reason: err.message,
                    message: "Đã có lỗi xảy ra"
                })
            }
            const { _course, _faculty, _class } = req.body;
            const id_course = await seachCourse(_course);
            const id_class = await seachClass(_class);
            if (id_class == null || id_course == null) {
                return res.json({
                    success: false,
                    data: null,
                    message: "Đã có lỗi xảy ra"
                })
            }
            let num = 0;
            for (let i=0;i<result.length;i++)
            {
                if(result[i].mssv!=""){
                    num = i;
                    break;
                }
            }
            console.log(result);
            console.log(num);
            for (let i = num; i < result.length; i++) {
                 if (result[i].mssv == "")
                   break; 
                let data = result[i].mssv;
                var salt = bcrypt.genSaltSync(5);
                var hashPassword = bcrypt.hashSync(data, salt);
                try{
                    await accounts.create({
                        user: result[i].mssv,
                        password: hashPassword,
                        mssv: result[i].mssv,
                        full_name: result[i].name,
                        id_class: id_class,
                        id_course: id_course,
                        faculty: _faculty
                    })
                }
                catch(err){
                    return res.json({
                        success: false,
                        message: "Đã có lỗi xảy ra",
                        reason: err.message
                    })
                } 
            }
            return res.json({
                success: true,
                data: null
            })
        })
    })
}

async function getId(mssv) {
    try {
        const result = await accounts.findOne({
            where: {
                mssv: mssv
            }
        })
        if (result != null) {
            return result.dataValues.id
        }
    }
    catch (err) {
        return null;
    }
}

function exportStudentRegisterEvent(req, res) {
    
    let exceltojson;
    upload(req, res, function (err) {
        
        if (err) {
            return res.json({
                success: false,
                data: null,
                reason: err.message,
                message: "Đã có lỗi xảy ra"
            })
        }

        if (!req.file) {
            return res.json({
                success: false,
                data: null,
                message: "Không có file nào được chọn"
            })
        }

        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === "xlsx") {
            exceltojson = xlsxtojson
        }
        else {
            exceltojson = xlstojson
        }

        exceltojson({
            input: req.file.path,
            output: null,
        }, async function (err, result) {
            if (err) {
                return res.json({
                    success: false,
                    data: null,
                    reason: err.message,
                    message: "Đã có lỗi cả ra"
                })
            }
            else {
                const { id_eve } = req.body;
                for (let i = 0; i < result.length; i++) {
                    if (result[i].mssv == "")
                        continue;
                    let id = await getId(result[i].mssv);
                    if (id == null || id == undefined)
                        continue;
                    await register.create({
                        id_eve: id_eve,
                        id_stu: id,
                    })
                }
                return res.json({
                    success: true,
                    data: null
                })
            }
        })
    })
}

module.exports = {
    exportStudentToDatabase,
    exportStudentRegisterEvent
}
