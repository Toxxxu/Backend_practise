import express from 'express';

import mongoose from 'mongoose';

import { registerValidation } from './validations/auth.js';

import checkAuth from './utils/checkAuth.js';
import { getMe, login, register } from './controllers/UserController.js';

mongoose
    .connect(
        'mongodb+srv://admin:1234@cluster0.ubqswce.mongodb.net/blog?retryWrites=true&w=majority',
    )
    .then(() => { console.log('MongoDB connected'); })
    .catch((err) => { console.log('MongoDB error', err); });

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello");
});

app.post('/auth/login', login);
app.post('/auth/register', registerValidation, register);
app.get('/auth/me', checkAuth, getMe);

const PORT = 3000;

app.listen(PORT, function() { 
    console.log(`Hosting: http://localhost:${PORT}`);
});
