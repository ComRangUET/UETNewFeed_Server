const xlsxj = require('xlsx-to-json');
const bcrypt = require('bcrypt');


const accounts = require('../models/accountmodels');
const seach = require('./seachinfor');


const _faculty = "CNTT";
const _class = "QH-2017-I/CQ-I-CQ-C-A-CLC2";
const _course = "62";
let id_class;
let id_course;

async function autoAdd() {
    id_course = await seach.seachCourse(_course);
    id_class = await seach.seachClass(_class);
    xlsxj({
        input: "abc.xlsx",
        output: "abcd.json"
    }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            for (let i = 0; i < result.length; i++) {
                if (result[i].name == "")
                    break;
                let data = result[i].mssv;
                var salt = bcrypt.genSaltSync(5);
                var hashPassword = bcrypt.hashSync(data, salt);
                accounts.create({
                    user: result[i].mssv,
                    password: hashPassword,
                    mssv: result[i].mssv,
                    full_name: result[i].name,
                    id_class: id_class,
                    id_course: id_course,
                    faculty: _faculty
                })
            }
        }
    })
}

autoAdd();


