import express from 'express';
import jwt from 'jwt';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello");
});

app.post('/auth/login', (req, res) => {
    console.log(req.body);
    res.json({
        success: true,
    });
});

const PORT = 3000;

app.listen(PORT, function() { 
    console.log(`Hosting: http://localhost:${PORT}`);
});