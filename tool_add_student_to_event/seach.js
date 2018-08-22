const accounts = require('../models/accountmodels');

async function getId(mssv){
    const result = await accounts.findOne({
        where:{
            mssv: mssv
        }
    })
    if(result!=null){
        return result.dataValues.id
    }
}

module.exports = {
    getId
}