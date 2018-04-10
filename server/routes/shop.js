var express = require('express');
var router = express.Router();

var model = require('../models/base')
var Shop = model.Shop
var Owner = model.Owner

//creat a shop
router.post('/', function(req, res, next) {
    var result={}
    var ownerId=0
    var shopName= req.body.name
    //creat owner item in owner-collection
    Owner.create({...req.body.owner,date:Date.now()},(err,doc)=>{
        if(err!==null){
            res.json({status:"fail",errMsg:"数据库错误!"})
        }else{
            ownerId = doc._id
            Shop.create({
                name: req.body.name,
                ownerInfoId: ownerId
            },(err,doc)=>{
                if(err!==null){
                    //delete owner item
                    Owner.remove({_id: ownerId}, (err, doc)=>{})
                    res.json({status:"fail",errMsg:"数据库错误!"})
                }else{
                    res.json({status:"ok",shopId:doc._id})
                }
            })
        }
    })
});

module.exports = router;
