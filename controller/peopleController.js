function download(req, res){
    console.log(req.body.data);
    res.json({
        success: true
    })
}
module.exports = {
    download
}