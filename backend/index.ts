import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';

import { router as usersRoute } from './routes/users';
import { router as cuponsRoute } from './routes/cupom';


const app = express();
app.use(express.json());

dotenv.config();

mongoose
    .connect(`${process.env.MONGO_URL}`)
    .then(() => {
        console.log("DB connection successfull")
    }).catch((err) => {
        console.log(err);
    })


app.use("/users", usersRoute)
app.use("/cupom", cuponsRoute)

app.listen(process.env.PORT || 3001, () => console.log('Running on port 3001'));
