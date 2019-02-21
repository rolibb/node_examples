var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
    var mongo = req.mongo;
    console.log(mongo.collection('doctors'));
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


module.exports = router;
