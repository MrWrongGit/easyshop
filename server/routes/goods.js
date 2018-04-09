var express = require('express');
var router = express.Router();

var model = require('../models/base')
var Ownner = model.Ownner

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
    
    Ownner.create({
        name:'zhl', 
        tel:'15072357587',
        addr:'123',
        date:'2018-01-01',
        pswd:'5811430'
    },(err,doc)=>{})

    res.json({
        status:'ok'
    }
  )
});


router.post('baseinfo/:s_id', function(req, res, next) {
    
    console.log(req.body.price);
    console.log(req.body.tag);
    res.json({
        status:'ok'
    }
  )
});

module.exports = router;
