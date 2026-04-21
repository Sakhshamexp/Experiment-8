import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';

const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const handleFetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/protected', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch protected data.');
            if (err.response?.status === 401 || err.response?.status === 403) {
                // If token is invalid/expired, log out
                sessionStorage.removeItem('token');
                navigate('/');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center py-5">
            <Card className="glass-card" style={{ maxWidth: 600, width: '100%', marginBottom: '2rem' }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                        <Typography variant="h4" component="h1" fontWeight="600" color="primary">
                            Dashboard
                        </Typography>
                        <Button 
                            variant="outlined" 
                            color="error" 
                            onClick={handleLogout}
                            sx={{ borderRadius: 2, textTransform: 'none' }}
                        >
                            Logout
                        </Button>
                    </Box>

                    <Typography variant="body1" mb={4}>
                        Secure area. Your token is active. Click below to fetch protected resources from the API.
                    </Typography>

                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={handleFetchData}
                        disabled={loading}
                        sx={{ borderRadius: 2, textTransform: 'none', fontSize: '1.05rem', px: 4, py: 1 }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Fetch Data'}
                    </Button>
                </CardContent>
            </Card>

            {data && (
                <Card className="glass-card" style={{ maxWidth: 600, width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom color="textSecondary">
                            Response Data:
                        </Typography>
                        <Box component="pre" sx={{ 
                            background: '#1e1e1e', 
                            color: '#d4d4d4', 
                            p: 2, 
                            borderRadius: 2, 
                            overflowX: 'auto',
                            fontFamily: 'monospace' 
                        }}>
                            {JSON.stringify(data, null, 2)}
                        </Box>
                    </CardContent>
                </Card>
            )}

            {error && (
                <Typography color="error" variant="body1" align="center" mt={2}>
                    {error}
                </Typography>
            )}
        </div>
    );
};

export default Dashboard;
