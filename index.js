import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose
    .connect('mongodb+srv://admin:1234@cluster0.ubqswce.mongodb.net/?retryWrites=true&w=majority')
    .then(() => { console.log('MongoDB connected'); })
    .catch((err) => { console.log('MongoDB error', err); });

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello");
});

app.post('/auth/register', (req, res) => {
    
});

const PORT = 3000;

app.listen(PORT, function() { 
    console.log(`Hosting: http://localhost:${PORT}`);
});