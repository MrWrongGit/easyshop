var express = require('express');
var router = express.Router();

var model = require('../models/base')
var Shop = model.Shop
var Goods = model.Goods

var fs = require('fs');
var path = require('path');

var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        var filename = file.fieldname+"-"+req.params.g_id
        var resource = req.url.split('/')[1]
        if((resource==="banner")||(resource==="details")){
            filename += "-"+Date.now()
        }
        cb(null, filename+path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })


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

router.post('/thumbnail/:g_id/', upload.single('thumbnail'), function(req, res, next) {
    Goods.update({_id: req.params.g_id},{thumbnail:req.file.filename},(err, doc)=>{
        if(err!==null){
            res.json({status:"fail",errMsg:"数据库错误!"})
        }else{
            if(doc.nModified===1){
                res.json({status:'ok',thumbnail:"images/"+req.file.filename})
            }else{
                res.json({status:"fail",errMsg:"数据库错误!"})
            }
        }
    })
});

router.put('/thumbnail/:g_id/', upload.single('thumbnail'), function(req, res, next) {
    Goods.update({_id: req.params.g_id},{thumbnail:req.file.filename},(err, doc)=>{
        if(err!==null){
            res.json({status:"fail",errMsg:"数据库错误!"})
        }else{
            if(doc.n===1){
                res.json({status:'ok',thumbnail:"images/"+req.file.filename})
            }else{
                res.json({status:"fail",errMsg:"数据库错误!"})
            }
        }
    })
});

router.post('/banner/:g_id/', upload.single('banner'), function(req, res, next) {
    Goods.update({_id: req.params.g_id},
        {'$push': {banner: req.file.filename}},
        (err,doc)=>{
            if(err!==null){
                res.json({status:"fail",errMsg:"数据库错误!"})
            }else{
                if(doc.nModified===1){
                    res.json({status:'ok',banner:"images/"+req.file.filename})
                }else{
                    var filePath = "public/images/"+req.file.filename
                    if(fs.existsSync(filePath))
                        fs.unlink(filePath)
                    res.json({status:"fail",errMsg:"数据库错误!"})
                }
            }
    })
});

router.delete('/banner/:g_id/:b_id', function(req, res, next) {
    Goods.update({_id: req.params.g_id},
        {'$pull': {banner: req.params.b_id}},
        (err,doc)=>{
            if(err!==null){
                res.json({status:"fail",errMsg:"数据库错误!"})
            }else{
                var filePath = "public/images/"+req.params.b_id
                if(fs.existsSync(filePath))
                    fs.unlink(filePath)
                res.json({status:'ok'})
            }
    })
});

router.post('/details/:g_id/', upload.single('details'), function(req, res, next) {
    Goods.update({_id: req.params.g_id},
        {'$push': {details: req.file.filename}},
        (err,doc)=>{
            if(err!==null){
                res.json({status:"fail",errMsg:"数据库错误!"})
            }else{
                if(doc.nModified===1){
                    res.json({status:'ok',details:"images/"+req.file.filename})
                }else{
                    var filePath = "public/images/"+req.file.filename
                    if(fs.existsSync(filePath))
                        fs.unlink(filePath)
                    res.json({status:"fail",errMsg:"数据库错误!"})
                }
            }
    })
});

router.delete('/details/:g_id/:d_id', function(req, res, next) {
    Goods.update({_id: req.params.g_id},
        {'$pull': {banner: req.params.b_id}},
        (err,doc)=>{
            if(err!==null){
                res.json({status:"fail",errMsg:"数据库错误!"})
            }else{
                var filePath = "public/images/"+req.params.d_id
                if(fs.existsSync(filePath))
                    fs.unlink(filePath)
                res.json({status:'ok'})
            }
    })
});

router.get('/:g_id', function(req, res, next) {
    Goods.findById(req.params.g_id,(err,doc)=>{
        if(err!==null){
            res.json({status:"fail",errMsg:"数据库错误!"})
        }else{
            res.json({status:"ok","goodsInfo":doc})
        }
    })
});

router.get('/brief/:g_id', function(req, res, next) {
    Goods.findById(req.params.g_id,(err,doc)=>{
        if(err!==null){
            res.json({status:"fail",errMsg:"数据库错误!"})
        }else{
            res.json({status:"ok","briefInfo":{"basic":doc.basic,"thumbnail":doc.thumbnail}})
        }
    })
});
/*相互引用的问题
router.delete('/:g_id/:s_id', function(req, res, next) {
    Goods.remove({_id: req.params.g_id},
        (err,doc)=>{
            if(err!==null){
                res.json({status:"fail",errMsg:"数据库错误!"})
            }else{
                Shop.update({_id: req.params.s_id},
                    {'$pull': {categoryIdList: req.params.s_id}},
                    (err, doc)=>{
                })
                res.json({status:'ok',categoryId: req.params.c_id})
            }
    })
});
*/
module.exports = router;
