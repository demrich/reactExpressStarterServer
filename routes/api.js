const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/users', (req, res, next) => {
    //get list of ninjas from the db
   User.find({})
    .then(users => {
        res.send(users);
    })
    
});  

//add a new ninja to the db
router.post('/users', function(req, res, next){
    User.create(req.body)
    .then(user => {res.send(user);})
    .catch(next);
});  

// update a ninja in the db
router.put('/users/:id', function(req, res, next){
    User.findByIdAndUpdate({_id: req.params.id},req.body)
    .then(() => {
        User.findOne({_id: req.params.id})
        .then(user => res.send(user));
        });
});

// delete a ninja from the database
router.delete('/users/:id', function(req, res, next){
    User.findByIdAndRemove({_id: req.params.id})
    .then(user => res.send(user));
    res.send({type:'DELETE'});
});

module.exports = router;