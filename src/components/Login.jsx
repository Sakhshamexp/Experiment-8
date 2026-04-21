import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardContent, Typography, TextField, Box } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });
            if (response.data && response.data.token) {
                sessionStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            } else {
                setError('Login failed: No token received.');
            }
        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <Card className="glass-card" style={{ maxWidth: 400, width: '100%' }}>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="600" color="primary">
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center" mb={4}>
                        Enter your credentials to access your account
                    </Typography>
                    
                    <form onSubmit={handleLogin}>
                        <Box mb={3}>
                            <TextField
                                fullWidth
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Box>
                        <Box mb={4}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Box>
                        {error && (
                            <Typography color="error" variant="body2" align="center" mb={2}>
                                {error}
                            </Typography>
                        )}
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            fullWidth 
                            size="large"
                            sx={{ borderRadius: 2, textTransform: 'none', fontSize: '1.1rem', py: 1.2 }}
                        >
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
