const express = require("express");
const path = require('path');
const router = express.Router();
const authorize = require("../middlewares/auth");

router.get('/api-docs', function(req,res){
    res.sendFile(path.join(__dirname+'/public/index.html'));
  });

module.exports = router;
