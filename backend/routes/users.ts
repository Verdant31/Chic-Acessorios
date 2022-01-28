import express from 'express';

import User from '../models/User';
import nodemailer from 'nodemailer';

const router = express.Router();



router.post("/register", async (req,res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        cpf: req.body.cpf,
        phone: req.body.phone,
        cupom: {
            name: null,
            generationDate: null,
            expirationDate: null
        }
    })
    try {
        const registeredUser = await user.save();
        res.status(201).json(registeredUser);
    }catch(err) {
        res.status(500).json(err);
    }
})

router.delete("/deleteuser/:id", async (req,res) => {
    const id = req.params.id;
    try {
        User.findByIdAndRemove({"_id": id}, (error : string) => {
            res.status(201).send({message: "Usuário deletado." })
        })
    }catch(err) {
        console.log(err);
        res.status(500).send({message: err  || "Error Occurred while retriving user information" })
    }
})

router.put("/updateuser", async (req,res) => {
    try {
        User.findByIdAndUpdate(req.body.id, {
            username: req.body.username,
            email: req.body.email,
            cpf: req.body.cpf,
            phone: req.body.phone
        }, (err, docs) => {
            if(err) {
                res.status(500).send({message: err  || "Error Occurred while retriving user information" })
            }
        })
        res.status(201).send({message: "Usuário editado." })
    }catch(err) {
        res.status(500).send({message: err  || "Error Occurred while retriving user information" })
    }
})

router.get("/getusers", async (req,res) => {
    try {
        User.find()
        .then(user => {
            res.send(user)
        })
    }catch(err) {
        res.status(500).send({message: err  || "Error Occurred while retriving user information" })

    }
})
export {router}
