import express from 'express';
import multer from 'multer';

import mongoose from 'mongoose';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import checkAuth from './utils/checkAuth.js';
import { getMe, login, register } from './controllers/UserController.js';
import { getAll, getOne, remove, create, update } from './controllers/PostController.js';

mongoose
    .connect(
        'mongodb+srv://admin:1234@cluster0.ubqswce.mongodb.net/blog?retryWrites=true&w=majority',
    )
    .then(() => { console.log('MongoDB connected'); })
    .catch((err) => { console.log('MongoDB error', err); });

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, login);
app.post('/auth/register', registerValidation, register);
app.get('/auth/me', checkAuth, getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post('/posts', checkAuth, postCreateValidation, create);
app.delete('/posts/:id', checkAuth, remove);
app.patch('/posts/:id', checkAuth, update);

const PORT = 3000;

app.listen(PORT, function() { 
    console.log(`Hosting: http://localhost:${PORT}`);
});
