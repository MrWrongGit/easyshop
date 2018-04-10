var express = require('express');
var router = express.Router();

var model = require('../models/base')
var Shop = model.Shop
var Category = model.Category

router.post('/:s_id', function(req, res, next) {
    Category.create({name: req.body.name},(err,doc)=>{
        if(err!==null){
            res.json({status:"fail",errMsg:"数据库错误!"})
        }else{
            var categoryId = doc._id
            Shop.update({_id: req.params.s_id},
                {'$push': {categoryIdList: doc._id}},
                (err, doc)=>{
                    if(err!==null){
                        Category.remove({_id: categoryId}, (err, doc)=>{})
                        res.json({status:"fail",errMsg:"数据库错误!"})
                    }else{
                        res.json({status:"ok","categoryId":categoryId})
                    }
            })
        }
    })
});

router.delete('/:c_id/:s_id', function(req, res, next) {
    Category.remove({_id: req.params.c_id},
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

router.put('/name/:c_id', function(req, res, next) {
    Category.update({_id: req.params.c_id},
        {name: req.body.name},
        (err,doc)=>{
            if(err!==null){
                res.json({status:"fail",errMsg:"数据库错误!"})
            }else{
                res.json({status:'ok',categoryId: req.params.c_id})
            }
    })
});

router.post('/goods/:g_id/:c_id', function(req, res, next) {
    Category.update({_id: req.params.c_id},
        {'$push': {goodsIdList: req.params.g_id}},
        (err,doc)=>{
            if(err!==null){
                res.json({status:"fail",errMsg:"数据库错误!"})
            }else{
                if(doc.nModified===1){
                    res.json({status:'ok',goodsId: req.params.g_id})
                }else{
                    res.json({status:"fail",errMsg:"数据库错误!"})
                }
            }
    })
});

router.delete('/goods/:g_id/:c_id', function(req, res, next) {
    Category.update({_id: req.params.c_id},
        {'$pull': {goodsIdList: req.params.g_id}},
        (err,doc)=>{
            if(err!==null){
                res.json({status:"fail",errMsg:"数据库错误!"})
            }else{
                res.json({status:'ok',goodsId: req.params.g_id})
            }
    })
});

module.exports = router;
