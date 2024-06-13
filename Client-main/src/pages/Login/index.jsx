import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import PasswordIcon from '@mui/icons-material/Password';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useEffect } from 'react';

const ADMIN = "65aa44271de57d06c7f378a7"
const USER = "65aa441d1de57d06c7f378a6"
const PARTNER = "65aa44431de57d06c7f378a8"


const defaultTheme = createTheme();

export default function LogIn() {

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [user, setUser] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(formRef.current);

    const formData = {};
    data.forEach((value, key) => {
      formData[key] = value;
    });

    const requiredFields = ["email", "password"];
    const newErrors = {};

    const token = localStorage.getItem('token');

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/user/login', {
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
        const token = responseData.token;
        toast.success('Login successful ~')
        if (token) {
          const decodedToken = jwtDecode(token);
          const roleId = decodedToken.role;
          console.log("roleId ne: ", roleId);
          if (roleId === 'ADMIN') {
            window.location.href = '/dashboard';
          }
          else if (roleId === 'PARTNER'){
            window.location.href = '/home-partner'
            console.log(roleId)
          }  else {
            navigate('/');
          }
        }
      } else {
        console.error('Login failed:', response.status);
        const errorData = await response.json();
        console.error('Error Data:', errorData);
        toast.error(errorData.error);
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
              LOG IN
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
              ref={formRef}
            >
              <TextField
                error={errors["email"]}
                helperText={errors["email"]}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                error={errors["password"]}
                helperText={errors["password"]}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Grid container>
                <Grid item>
                  <Link href="/forgot" style={{ color: "#669966", textDecoration: "none" }}>
                    {"Forgot password"}
                  </Link>
                </Grid>
              </Grid>

              <Button className="button-64" style={buttonStyle} onClick={handleSubmit}>
                <span style={spanStyle}>Log In</span>
              </Button>

              <Grid container>
                <Grid item>
                  <Link href="/register" style={{ color: "#669966", textDecoration: "none" }}>
                    {"Don't have an account? Register here..."}
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