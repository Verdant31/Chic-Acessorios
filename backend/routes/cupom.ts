import express from 'express';
import { isIdentifier } from 'typescript';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

console.log(process.env.EMAIL_LOGIN, process.env.EMAIL_PASS)
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASS,
    }
})

const router = express.Router();

router.put("/addcupom", async (req,res) => {
    const today = new Date;
    const expiration = new Date();
    expiration.setDate(today.getDate() + 30);

    if(req.body.value >= 100 && req.body.value < 200) req.body.value = 'CUPOM10';
    if(req.body.value >= 200 && req.body.value < 300) req.body.value = 'CUPOM20';
    if(req.body.value >= 300) req.body.value = 'CUPOM30';

    const mailOptions = {
        from: 'contato.chic18@gmail.com', // sender address
        to: req.body.email, // receiver (use array of string for a list)
        subject: 'CHIC ACESSÓRIOS - Bônus Cliente Especial!!!', // Subject line
        text: `Prezado cliente,` + "\n" +
        `A CHIC Acessórios agradece a preferência e como "cliente especial",` + "\n" +
        `VOCÊ acaba de ganhar um ${req.body.value} para a sua próxima compra.`+ "\n" +
        `** Lembrando que o seu bônus é válido por 30 dias.`+ "\n" +
        `Até breve!`+ "\n" +
        `Um abraço,`+ "\n" +
        `CHIC Acessórios`
    };
    try {
        transporter.sendMail(mailOptions, (err, info) => {
            if(err)
                console.log(err)
            else
                console.log(info);
        });
        User.findByIdAndUpdate(req.body.id, {
            cupom: {
                name: req.body.value,
                generationDate: Date.now(),
                expirationDate: expiration
            }
        }, (err, docs) => {
            if(err) {
                res.status(500).send({message: err  || "Error Occurred while retriving user information" })
            }
        })
        
        res.status(201).send({message: "Cupom Adicionado"})
    }catch(err) {
        res.status(500).send({message: err  || "Error Occurred while retriving user information" })
    }
})


router.delete("/deletecupom/:id", async (req,res) => {
    const id = req.params.id;
    try {
        User.findByIdAndUpdate(id, {
            cupom: [{}]
        }, (err, docs) => {
            if(err) {
                res.status(500).send({message: err  || "Error Occurred while retriving user information" })
            }
        })
        res.status(201).send({message: "Cupom deletado." })
    }catch(err) {
        res.status(500).send({message: err  || "Error Occurred while retriving user information" })
    }
})

export {router}
