const accounts = require('../models/accountmodels');
const register = require('../models/registermodels');
const xlsxj = require('xlsx-to-json');


const seach = require('./seach');

let id_eve = "6";
function tool(){
    xlsxj({
        input: "xyz.xlsx",
        output: "xyz.json"
    }, async function (err, result) {
        if (err) {
            console.log(err);
        }
        else{
            for(let i=0;i<result.length;i++){
                if(result[i].mssv=="")
                    continue;
                let id = await seach.getId(result[i].mssv);
                if(id==null || id==undefined)
                    continue;
                await register.create({
                    id_eve: id_eve,
                    id_stu: id,
                })
            }
        }
    })
}

tool();