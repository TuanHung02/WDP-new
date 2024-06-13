import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BadgeIcon from '@mui/icons-material/Badge'; import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import PasswordIcon from '@mui/icons-material/Password';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function LogIn() {

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(formRef.current);

        const formData = {};
        data.forEach((value, key) => {
            formData[key] = value;
        });

        try {
            const response = await fetch('http://localhost:8080/api/user/forgot_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Login successful:', responseData);
                localStorage.setItem('token', responseData.token);
                navigate('/login');
            } else {
                console.error('Login failed:', response.status);
                const errorData = await response.json();
                console.error('Error Data:', errorData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const formRef = useRef(null);

    const [isFocused, setFocused] = useState(false);

    const buttonStyle = {
        alignItems: 'center',
        backgroundImage: 'linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB)',
        border: '0',
        borderRadius: '5px',
        boxShadow: 'rgba(151, 65, 252, 0.2) 0 15px 30px -5px',
        boxSizing: 'border-box',
        color: '#FFFFFF',
        display: 'flex',
        fontFamily: 'Phantomsans, sans-serif',
        fontSize: '10px',
        justifyContent: 'center',
        lineHeight: '1em',
        maxWidth: '100%',
        minWidth: '140px',
        padding: '1px',
        textDecoration: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        width: '100%',
        marginTop: '10px',
        marginBottom: '10px'
    };

    const spanStyle = {
        backgroundColor: 'rgb(5, 6, 45)',
        padding: '16px 24px',
        borderRadius: '6px',
        width: '100%',
        height: '100%',
        transition: '300ms',
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
                            <PasswordIcon style={{ fontSize: "20px" }} />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Forgot Password
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                            ref={formRef}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Please enter your email address ~"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />

                            <Button className="button-64" style={buttonStyle} onClick={handleSubmit}>
                                <span style={spanStyle}>Send to your email</span>
                            </Button>

                            <Grid container>
                                <Grid item>
                                    <Link href="/login" style={{ color: "#669966", textDecoration: "none" }}>
                                        {"Go to login ~"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider >
    );
}