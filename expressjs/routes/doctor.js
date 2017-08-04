var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.get('/', function(req, res) {
  var mongo = req.mongo;

  mongo.collection('doctors').find().toArray(function(err, docs){
     res.json(docs);
  });
});

router.get('/:id', function(req, res){
    var mongo = req.mongo;
    var id = req.params.id;

    mongo.collection('doctors').findOne({ _id : new ObjectID(id)}, {}, function(err, doc){
        if (err) {
            res.status(500).json(new Error(err));
        }
        res.json(doc);
    });
});

router.post('/', function(req, res) {
    var mongo = req.mongo;
    var data = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        celular: req.body.celular,
        email: req.body.email
    };

    mongo.collection('doctors').insertOne(data, function(err, result){
        if (err) {
            var error = new Error(err);
            res.status(500).json(error);
        } else {
            console.log(result);
            res.json(result.ops[0]);
        }
    });
});

router.put('/:id', function(req, res){
    var id = req.params.id;
    var body = req.body;
    var mongo = req.mongo;

    if (typeof body != 'undefined' && body) {
        mongo.collection('doctors').updateOne( { _id: new ObjectID(id) }, { $set: body }, function(err, result){

            if (err) {
                var error = new Error(err);
                res.status(500).json(error);
            }

            mongo.collection('doctors').findOne({_id: new ObjectID(id)}, {}, function(err, doc) {
                  if (err) {
                        var error = new Error(err);
                        res.status(500).json(error);
                  }

                  res.json(doc);
            });;

        });
    } else {
        res.status(400).json('Bad Request');
    }
});

// const updateUser = async (req, res, body, mongo ) => {
//     var id = req.params.id;
//     var body = req.body;
//     var mongo = req.mongo;
//
//     if (typeof body != 'undefined' && body) {
//         try {
//             var collection = mongo.collection('doctors');
//             var res_update = await collection.updateOne( { _id: new ObjectID(id) }, { $set: body });
//             var doc = await collection.findOne({_id: new ObjectID(id)}, {});
//             res.json(doc);
//         } catch (e) {
//             res.status(500).json(e);
//         }
//     } else {
//          res.status(400).json(new Error("please provide data"));
//     }
// }
//
// router.put('/:id', function(req, res){
//     updateUser(req, res);
// });

router.delete('/:id', function(req, res){
    var id = req.params.id;
    var mongo = req.mongo;

    mongo.collection('doctors').findOneAndDelete({ _id: new ObjectID(id)}, {}, function(err, result){

        if (err) {
            res.status(500).json(new Error(err));
        }
        res.status(200).json('was delete succesfully');
    });
});


module.exports = router;
