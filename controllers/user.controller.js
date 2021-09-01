// routes/auth.routes.js
require('dotenv').config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = require("../models/user.model");


var SampleUsersArray = require("../data/sampleusers");


// Sign-up
exports.register = async (req, res, next) => {

    await userSchema.findOne({
        userName: req.body.userName
    }).then(user => {
        if (user) {
            console.log('user: ', user);
            return res.status(401).json({
                message: "userName already in use"
            });
        } else {
            bcrypt.hash(req.body.password, 10).then((hash) => {
                const user = new userSchema({
                    userName: req.body.userName,
                    emailAddress: req.body.emailAddress,
                    password: hash
                });
                user.save().then((response) => {
                    responseUser = {
                        "_id": response._id,
                        "userName": response.userName,
                        "emailAddress": response.emailAddress
                    };
                    res.status(201).json({
                        message: "User successfully created!",
                        result: responseUser
                    });
                }).catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
            });
        }


    }).catch(err => {
        return res.status(401).json({
            message: "Registration failed"
        });
    });
};


// Sign-in
exports.signin = async (req, res, next) => {
    let getUser;
    await userSchema.findOne({
        userName: req.body.userName
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = {
            "_id": user._id,
            "userName": user.userName,
            "emailAddress": user.emailAddress
        };
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            userName: getUser.userName,
            userId: getUser._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            result: getUser
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
};


// Get Users
exports.listall = async (req, res, next) => {
    await userSchema.find((error, response) => {
        // await userSchema.find({}, 'username emailAddress', (error, response) => { // 'username emailAddress' on the find will only return these fields
        if (error) {
            return next(error);
        } else {
            const users = [];
            for (var i = 0; i < response.length; i++) {
                const tmp = {
                    _id: response[i]._id,
                    userName: response[i].userName,
                    emailAddress: response[i].emailAddress
                };
                users.push(tmp);
            }
            res.status(200).json(users);
        }
    });
};

// Get Single User
exports.profile = async (req, res, next) => {
    await userSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            const profiledata = {
                "_id": data._id,
                "userName": data.userName,
                "emailAddress": data.emailAddress
            };
            res.status(200).json({
                result: profiledata
            })
        }
    });
};

// Update User
exports.update = async (req, res, next) => {
    await userSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            const updatedUser = {
                _id: data._id,
            };
            res.status(200).json({
                result: updatedUser
            });
        }
    });
};



// Delete User
exports.delete = async (req, res, next) => {
    await userSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                result: data._id
            })
        }
    });
};


exports.loadSampleUsers = async (req, res) => {
    var start = new Date();
    try {
        var counter = 0;
        SampleUsersArray.forEach(async function (item) {

            // console.log('---------------customerId--------------------', counter, item.customerId);
            let testDoc = new userSchema(item);
            await testDoc.save().then((user) => {
                console.log("counter: " + counter, user._id);

            })
                .catch((error) => {
                    return res.status(500).json({
                        success: false,
                        count: 0,
                        data: error
                    });

                });

            counter++;
        })

        var time = new Date() - start;
        return res.status(200).json({
            success: true,
            count: counter,
            timeMilliSec: time
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            count: 0,
            data: error
        });
    }
};
