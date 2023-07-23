const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, ('./uploads/'))
    },
    filename: (req, file, cb) =>{
        let date = new Date().toISOString().replace(/:/g, '-');
        cb(null, date + '-' + file.originalname.replace(/\s/g, ''))
    },
})
const upload = multer({ storage: storage })

const multipleImages = upload.fields([{ name: 'imagem', maxCount: 5 }])
// { name: 'imagem2', maxCount: 8 }

module.exports = multipleImages