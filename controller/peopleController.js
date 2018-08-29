const fs = require('fs');

function download(req, res){
    let link = './uploads/' + req.params.file_name;
    var file = fs.readFileSync('./uploads/' + req.params.file_name, 'binary');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', "attachment; filename=" + "data.xlsx")
    fs.unlink(link, function(err){
        if(err) res.json({
            success: false,
            message: "file không tồn tại"
        })
        return res.end(file, 'binary');
    })  
}

module.exports = {
    download
}