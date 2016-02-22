var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
 var fs = require('fs');
var multer = require ('multer');
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + file.originalname )  //+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1]
    }
});
var upload = multer ({ storage:storage, limits: {fileSize: 1000000, files:1}, }).single('file');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var Guitar       = require('../public/models/guitars');
var connection_string = 'mongodb://localhost/guitars';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect(connection_string);


// router.use(function(req, res, next) {
//     // do logging
//     console.log('Something is happening.');
//     next();
// });


router.get('/', function(req, res) {
    res.render('index');
});

router.post('/file-upload', function(req, res, next) {
  upload(req,res,function(err){
            if(err){
                 //res.json({error_code:1,err_desc:err});
                 console.log(err);
                 return next(err);
            }
            // res.json({error_code:0,err_desc:null});
             res.send(req.file.filename);
        })
});


router.route('/api/guitars')


    .post(function(req, res, next) {

        var guitar = new Guitar();
        guitar.name = req.body.name;
        guitar.id = req.body.id;
        guitar.description = req.body.description;
        guitar.type = req.body.type;
        guitar.manufacturer = req.body.manufacturer;
        guitar.model = req.body.model;
        guitar.bodymaterial = req.body.bodymaterial;
        guitar.neckmaterial = req.body.neckmaterial;
        guitar.colour = req.body.colour;
        guitar.price = req.body.price;
        guitar.images = req.body.images;
        guitar.save(function(err) {
          if (err){

              return next(err);
            //return  res.send(err);
          }
          res.send({message: 'Guitar add'});
        });
    })
    .get(function(req, res) {
        Guitar.find(function(err, guitars) {
            if (err)
                res.send(err);

            res.json(guitars);
        });
    });


    router.route('/api/guitars/:id')
    .get(function(req, res) {
        Guitar.findOne({
            id: req.params.id
        }, function(err, guitar) {
            if (err)
                res.send(err);
            res.json(guitar);
        });
    })
    .put(function(req, res, next) {
        Guitar.findOne({
            id: req.params.id
        }, function(err, guitar) {
            if (err || !guitar){
                console.log(err);
                return next(err);}//res.send(err);
            guitar.id = req.body.id;
            guitar.name = req.body.name;
            guitar.description = req.body.description;
            guitar.type = req.body.type;
            guitar.manufacturer = req.body.manufacturer;
            guitar.model = req.body.model;
            guitar.bodymaterial = req.body.bodymaterial;
            guitar.neckmaterial = req.body.neckmaterial;
            guitar.colour = req.body.colour;
            guitar.price=req.body.price;
            guitar.images = req.body.images;
            guitar.save(function(err) {
                if (err){
                  console.log(err);
                  return  next(err);
                }
                 res.send({message: 'Successfull update'});
            });
        });
    })
   .delete(function(req, res) {
       Guitar.remove({
           id: req.params.id
       }, function(err, guitar) {
           if (err)
               res.send(err);
           res.json({ message: 'Successfully deleted' });
       });
   });
   router.use(function(err, req, res, next) {
     if(!err) return next();
    //  console.log('ХУЙ');
    //  console.log(err);
     console.log(err.stack);
     res.send({status:"error", message: err.message, code: err.code});
   });

module.exports = router;
