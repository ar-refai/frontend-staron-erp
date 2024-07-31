import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api';
import { Container, Box, TextField, Button, Typography, Alert, Avatar, Card, CardMedia } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';

const Login = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(credentials);
            console.log(response);
            if (response.status === 400) {
                setLoginError("");
                if (response.message.password) {
                    setPasswordError(response.message.password);
                }
                if (response.message.email) {
                    setEmailError(response.message.email);
                }
            } else if (response.status === 200) {
                localStorage.setItem('staron_token', response.token);
                const jsonString = JSON.stringify(response.user);
                localStorage.setItem('staron_user', jsonString);
                navigate('/global/dashboard');
            } else {
                setLoginError(response.message);
                setPasswordError("");
                setEmailError("");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Container
            component="main"
            maxWidth="sm"
            sx={{
                bgcolor: '#fff',
                borderRadius: "20px",
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '30px 0',



                }}
            >
                <Card sx={{ maxWidth: 275, mt:'10px', background: "transparent", boxShadow: '0' }}>
                    <CardMedia
                        component="img"
                        alt="Logo"
                        height="120"
                        image={require('../../assets/dark-logo.png')}
                        sx={{ backgroundColor: 'transparent', }}
                    /></Card>
                <Box component="form" id="login-form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="filled-basic"               
                        name="email"
                        autoComplete="email"
                        value={credentials.email}
                        onChange={handleChange}
                        error={!!emailError}
                        helperText={emailError}
                        label="Email"
                        variant="filled"
                        sx={{
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: colors.primary[200],
                            },
                            "& .MuiOutlinedInput-root": {
                                "&:hover > fieldset": {
                                    borderColor: colors.primary[200],
                                },
                            },
                            "& .MuiSvgIcon-root": {
                                color: colors.primary[800],
                            },
                            "& .MuiFilledInput-root:before": {
                                borderBottomColor: colors.primary[800],
                            },
                            "& .MuiFilledInput-root:after": {
                                borderBottomColor: colors.primary[800],
                            },
                            "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                                borderBottomColor: colors.primary[800],
                            },
                        }}
    
                    />
                    <TextField
                        variant="filled"
                        margin="normal"
                        id="filled-basic-two"               
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        sx={{
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: colors.primary[200],
                            },
                            "& .MuiOutlinedInput-root": {
                                "&:hover > fieldset": {
                                    borderColor: colors.primary[200],
                                },
                            },
                            "& .MuiSvgIcon-root": {
                                color: colors.primary[800],
                            },
                            "& .MuiFilledInput-root:before": {
                                borderBottomColor: colors.primary[800],
                            },
                            "& .MuiFilledInput-root:after": {
                                borderBottomColor: colors.primary[800],
                            },
                            "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                                borderBottomColor: colors.primary[800],
                            },
                        }}
                        autoComplete="current-password"
                        value={credentials.password}
                        onChange={handleChange}
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    {loginError && <Alert severity="error">{loginError}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign in
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
