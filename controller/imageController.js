const multer = require('multer');
const height = 256;
const gm = require('gm').subClass({ imageMagick: true });
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + req.tokenData.idaccounts + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/gif' ||
        file.mimetype === 'image/svg')
        cb(null, true);
    else cb(new Error('Tập tin không đúng định dạng'), false);
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1024 * 10
    },
    fileFilter: fileFilter
}).single('fileName');

function uploadFile(req, res, next) {
    upload(req, res, (err) => {
        if (req.file == undefined) {
            res.json({
                success: false,
                message: "Chưa có tập tin nào được chọn"
            })
        }

        if (err) {
            res.json({
                success: false,
                message: err.message
            })
        } else {
            const fullUrl = req.protocol + '://' +
                req.get('host') + '/' +
                req.file.filename;
            const filePathUploads = `./uploads/${req.file.filename}`;
            gm(`./uploads/${req.file.filename}`)
                .resize(null, height)
                .write(`./upload-resize/${req.file.filename}`, err => {
                    if (err) {
                        res.json({
                            success: false,
                            result: err.message
                        })
                    } else {
                        fs.unlink(filePathUploads, err => {
                            if (err) {
                                res.json({
                                    success: false,
                                    result: err.message
                                })
                            }
                        })
                        res.json({
                            success: true,
                            url: fullUrl
                        })
                    }
                })
        }
    })
}


module.exports = {
    uploadFile
}