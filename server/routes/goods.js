var express = require('express');
var router = express.Router();

var model = require('../models/base')
var Shop = model.Shop
var Goods = model.Goods

var path = require('path');
var multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        var filename = file.fieldname+"-"+req.params.g_id
        if(req.url.split('/')[1]==="banner"){
            filename += "-"+Date.now()
        }
        cb(null, filename+path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })

/////////////////////////////
router.post('/thumbnail/:g_id/', upload.single('thumbnail'), function(req, res, next) {
    Goods.update({_id: req.params.g_id},{thumbnail:req.file.filename},(err, doc)=>{
        if(err!==null){
            res.json({status:"fail",errMsg:"数据库错误!"})
        }else{
            res.json({status:'ok',thumbnail:"images/"+req.file.filename})
        }
    })
});

/////////////////////////////
router.post('/banner/:g_id/', upload.single('banner'), function(req, res, next) {
    Goods.update({_id: req.params.g_id},
        {'$push': {banner: req.file.filename}},
        (err,doc)=>{
            if(err!==null){
                res.json({status:"fail",errMsg:"数据库错误!"})
            }else{
                res.json({status:'ok',banner:"images/"+req.file.filename})
            }
    })
});


////////////////////////////////////
router.post('/basicinfo/:s_id', function(req, res, next) {
    Goods.create({
        basic: {...req.body.basic}
    },(err,doc)=>{
        if(err!==null){
            res.json({status:"fail",errMsg:"数据库错误!"})
        }else{
            var goodsId = doc._id
            Shop.update({_id: req.params.s_id},
                {'$push': {goodsIdList: doc._id}},
                (err, doc)=>{
                    console.log(doc)
                    if(err!==null){
                        Goods.remove({_id: goodsId}, (err, doc)=>{})
                        res.json({status:"fail",errMsg:"数据库错误!"})
                    }else{
                        res.json({status:"ok","goodsId":goodsId})
                    }
            })
        }
    })
});

module.exports = router;
