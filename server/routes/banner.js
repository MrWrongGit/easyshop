var express = require('express');
var router = express.Router();

/* GET banner info */
router.get('/', function(req, res, next) {
  res.json([
        {
            img:'images/banner/0.jpg',
            ref:'images/banner/0.jpg'
        },
        {
            img:'images/banner/1.jpg',
            ref:'images/banner/1.jpg'
        },
        {
            img:'images/banner/2.jpg',
            ref:'images/banner/2.jpg'
        }
      ]
  )
});

module.exports = router;
