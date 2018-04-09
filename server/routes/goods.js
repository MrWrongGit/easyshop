var express = require('express');
var router = express.Router();

var model = require('../models/base')
var Owner = model.Owner
var Shop = model.Shop
var Goods = model.Goods

var path = require('path');
var multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/'+req.params.s_id +'/'+req.params.g_id+'/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })

router.post('/thumbnail/:g_id/:s_id', upload.single('thumbnail'), function(req, res, next) {
    
    console.log(req.file);
    res.json({
        status:'ok'
    }
  )
});

router.post('/banner/:g_id/:s_id', upload.single('banner'), function(req, res, next) {
    
    console.log(req.file);
    res.json({
        status:'ok'
    }
  )
});

router.get('/test1', function(req, res, next) {
    
    Owner.create({
        name:'zhl', 
        tel:'15072357587',
        addr:'123',
        date:'2018-01-01',
        pswd:'5811430'
    },(err,doc)=>{
        console.log(doc)
    })

    res.json({
        status:'ok'
    }
  )
});

////////////////////////////////////
router.post('/basicinfo/:s_id', function(req, res, next) {
    
    Goods.create({
        basic: {...req.body.basic}
    },(err,doc)=>{
        console.log(err)
        console.log(doc)

        Shop.update({_id: req.params.s_id},
            {'$push': {goodsIdList: doc._id}},
            (err, doc)=>{
                res.json({
                    status:'ok'
                }
        )
    })
})});


module.exports = router;
