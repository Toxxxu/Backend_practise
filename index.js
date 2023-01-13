import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation } from './validations/auth.js';

import UserModel from './models/model.js';

mongoose
    .connect('mongodb+srv://admin:1234@cluster0.ubqswce.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => { console.log('MongoDB connected'); })
    .catch((err) => { console.log('MongoDB error', err); });

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello");
});

app.post('/auth/register', registerValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash,
    });

    const user = await doc.save();

    res.json(user)
});

const PORT = 3000;

app.listen(PORT, function() { 
    console.log(`Hosting: http://localhost:${PORT}`);
});