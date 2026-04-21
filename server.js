import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Simple mock authentication
    if (username === 'admin' && password === '123') {
        res.json({ token: 'mock-jwt-token-123' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.get('/protected', (req, res) => {
    const auth = req.headers.authorization;
    if (auth && auth.startsWith('Bearer ')) {
        res.json({ data: 'This is protected data from the mock backend!', user: 'admin', role: 'SUPER_ADMIN' });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Mock backend running on port ${PORT}`);
});
