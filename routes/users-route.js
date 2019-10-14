const express = require('express');
const usersRouter = express.Router();
const User = require('../models/User')
const passport = require('passport')


//REGISTER USER
usersRouter.post('/users/register', (req, res) => {
    const newUser = new User({
       username: req.body.username,
       firstname: req.body.firstname,
       lastname: req.body.lastname,
       country: req.body.country,
       email: req.body.email,
       password: req.body.password
    });

    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            return res.json({
                success: false,
                err: err
            })
        }else {
            passport.authenticate('local')(req, res, () => {
                return res.status(200).json({
                    success: true,
                    user: user
                })
            })
        }
    }) 
})


//FETCH ALL USERS
usersRouter.get('/users', (req,res) => {
    User.find({}, (err, users) => {
        if(err){
            return res.json({success: false, err})
        }else {
            return res.status(200).json(users)
        }
    })
})


module.exports = usersRouter;