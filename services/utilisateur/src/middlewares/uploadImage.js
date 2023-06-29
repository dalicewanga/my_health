const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null,path.join(__dirname,'../public/images'));
    },
    filename:function(req, file, cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
});

const filefilter = (req, file, cb)=>{
    if( file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/png'
    ){
        cb(null,true);
    }else{
        cb(null,false);
        return cb(new Error("Veuillez charger une image de type PNG, JPEG !"))
    }
}

const upload = multer({ 
    storage:storage ,
    fileFilter:filefilter
});

module.exports = upload;