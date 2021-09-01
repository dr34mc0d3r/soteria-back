import process from 'dotenv';
import { NextFunction, Request, Response } from "express";
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// https://github.com/hay-bams/med-ts-node/blob/master/src/routes/todo.ts

import schema_User from "../models/user.model";

export class User {

    constructor() {

    }

    async register(req: Request, res: Response, next: NextFunction) {
        await bcrypt.hash(req.body.password, 10).then((hash: any) => {
            const user = new schema_User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save().then((response: { _id: string; name: string; email: string; }) => {
                let responseUser = {
                    "_id": response._id,
                    "name": response.name,
                    "email": response.email
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
    async signin(req: Request, res: Response, next: NextFunction) {
        let getUser;
        await schema_User.findOne({
            email: req.body.email
        }).then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Authentication failed"
                });
            }
            getUser = {
                "_id": user._id,
                "name": user.name,
                "email": user.email
            };
            return bcrypt.compare(req.body.password, user.password);
        }).then(response => {
            if (!response) {
                return res.status(401).json({
                    message: "Authentication failed"
                });
            }
            let jwtToken = jsonwebtoken.sign({
                email: getUser.email,
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
    }

    async listall(req: Request, res: Response, next: NextFunction) {
        await schema_User.find((error, response) => {
            // await userSchema.find({}, 'name email', (error, response) => { // 'name email' on the find will only return these fields
            if (error) {
                return next(error);
            } else {
                let users = [];
                for (var i = 0; i < response.length; i++) {
                    let tmp = {
                        _id: response[i]._id,
                        name: response[i].name,
                        email: response[i].email
                    };
                    users.push(tmp);
                }
                res.status(200).json(users);
            }
        });
    }

    async profile(req: Request, res: Response, next: NextFunction) {
        await schema_User.findById(req.params.id, (error: any, data: { _id: string; name: string; email: string; }) => {
            if (error) {
                return next(error);
            } else {
                const profiledata = {
                    "_id": data._id,
                    "name": data.name,
                    "email": data.email
                };
                res.status(200).json({
                    result: profiledata
                })
            }
        });
    }

    async update(req: Request, res: Response, next: NextFunction) {
        await schema_User.findByIdAndUpdate(req.params.id, {
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
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        await schema_User.findByIdAndRemove(req.params.id, {}, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.status(200).json({
                    result: data._id
                })
            }
        });
    }
}
