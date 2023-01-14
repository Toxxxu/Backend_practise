import express from 'express';
import multer from 'multer';

import mongoose from 'mongoose';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import { checkAuth, handleValidationErrors } from './utils/index.js';

import { UserController, PostController } from './controllers/index.js';

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

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, handleValidationErrors, PostController.update);

const PORT = 3000;

app.listen(PORT, function() { 
    console.log(`Hosting: http://localhost:${PORT}`);
});
