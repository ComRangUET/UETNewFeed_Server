const account = require('./models/accountmodels');
function create(){
    let user = 17021000;
    for(let i =1;i<=10;i++)
    {
        account.create({
            role_id: 1,
            user: user+i,
            password: 1,
            fullname: "asfjasdfjasd",
            major: "KHMT",
            course: 62,
            class_name: "IE4",
            MSSV: user+i
        })
    }
}

create();