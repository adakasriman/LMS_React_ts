import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Fade,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoginIllustration } from '@features/auth/components/LoginIllustration';
import OTPVerification from '@features/auth/components/OTPVerification/OTPVerification';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.scss';
import { setCredentials } from '../../authSlice';
import Cookies from 'js-cookie';
import { LoginRequest } from '../../../../types/auth';
import { useLoginMutation, useVerifyOtpMutation } from '@features/auth/api/authApi';
import { showSnackbar } from '@components/snackbarUtils';
import { useAppDispatch } from '@app/hooks';
import { LOGIN_CONTENT } from '@utils/uiContent';
const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [isLoginLoading, setIsLoginLoading] = useState(true);
  const [isPasswordExpired, setIsPasswordExpired] = useState(false);
  const [verifyOtp, { isLoading: verifyOtpLoading }] = useVerifyOtpMutation();
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [loginData, setLoginData] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handler = (e: AnimationEvent) => {
      if (e.animationName === 'autofillStart') {
        const email = (document.querySelector('input[type="email"]') as HTMLInputElement)?.value;
        const password = (document.querySelector('input[type="password"]') as HTMLInputElement)
          ?.value;

        if (email || password) {
          setLoginData({
            email: email ?? '',
            password: password ?? '',
          });
        }
      }
    };

    document.addEventListener('animationstart', handler);
    return () => document.removeEventListener('animationstart', handler);
  }, []);

  const handleBackToLogin = () => {
    setStep('login');
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setError('Please enter both email and password');
      return;
    }
    setIsLoginLoading(true);
    const { email, password } = loginData;
    let resValidate: any = {
      isSuccess: false,
    };
    try {
      const res: any = await login({ email, password }).unwrap(); // unwrap() to handle the result
      if (res.status_code == 200) {
        setError('');
        // setIsLoginLoading(true);
        setIsLoginLoading(false);
        resValidate.isSuccess = true;
        setStep('otp');
      } else {
        setIsLoginLoading(false);
        setIsPasswordExpired(res?.is_expired);
        resValidate.isSuccess = false;
        resValidate.message = res.message;
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      resValidate.isSuccess = true;
      resValidate.message = true;
      setIsLoginLoading(false);
    }

    showSnackbar({
      message: resValidate.isSuccess ? 'OTP sent successfully' : resValidate.message,
      severity: resValidate.isSuccess ? 'success' : 'error',
      duration: !resValidate.isSuccess ? 5000 : 3000,
      position: { vertical: 'bottom', horizontal: 'right' },
    });
  };

  const handleResendOTP = () => {
    console.log('gyds');
  };

  const handleLoginSuccess = async (otp: string) => {
    const resValidate: any = {
      isLoggedIn: false,
    };
    try {
      const res: any = await verifyOtp({ email: loginData.email, otp }).unwrap();
      if (res.status_code == 200) {
        dispatch(
          setCredentials({
            token: res.access_token,
            user: res.user,
          }),
        );
        const expiryDate = new Date(res.user.token_expires_at);
        Cookies.set('token', res.access_token, { expires: expiryDate });
        Cookies.set('sessionid', res.session_key, { expires: expiryDate });
        resValidate.isLoggedIn = true;
      }
    } catch (error: any) {
      resValidate.msg = error.message;
    }

    showSnackbar({
      message: resValidate.isLoggedIn ? 'Login successful' : resValidate.msg,
      severity: resValidate.isLoggedIn ? 'success' : 'error',
      duration: 3000,
      position: { vertical: 'bottom', horizontal: 'right' },
    });
    if (resValidate.isLoggedIn) {
      navigate('/');
    }
  };

  const forgotResetHandler = () => {
    navigate(`/forgot-password/${isPasswordExpired ? 'reset' : 'forgot'}`);
  };

  const onchangeHandler = (event: any) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });

    if (!loginData.email.trim() || !loginData.password.trim()) {
      setIsLoginLoading(false);
    } else {
      setIsLoginLoading(true);
    }
  };

  const getLoginButtonLabel = () => {
    if (!loginData.email.trim() || !loginData.password.trim()) return 'Login';
    if (isLoginLoading) return 'Logging In...';
    return 'Login';
  };

  return (
    <Box
      className={`min-h-screen flex items-center justify-center bg-gray-50 p-1 ${styles.loginPage}`}
    >
      <Fade in timeout={600}>
        <Paper
          elevation={0}
          className={styles.loginPaper}
          sx={{
            maxWidth: step === 'otp' ? '530px' : '1000px',
          }}
        >
          <Box
            className={`${styles.loginContainer} grid`}
            sx={{
              gridTemplateColumns: step === 'otp' ? '1fr' : { xs: '1fr', md: '1fr 1fr' },
            }}
          >
            {/* Left Section */}
            <Box className={styles.formSection}>
              {step === 'login' && (
                <>
                  <Box className={styles.headerBox}>
                    <Typography className={styles.loginTitle}>LMS</Typography>
                    <Typography className={styles.loginSubtitle}>
                      Please login to your account
                    </Typography>
                  </Box>

                  {error && (
                    <Fade in>
                      <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {error}
                      </Alert>
                    </Fade>
                  )}

                  <Box component="form" onSubmit={handleLogin}>
                    {/* Email */}
                    <Box className={styles.fieldWrapper}>
                      <Typography className={styles.label}>Email id</Typography>
                      <TextField
                        fullWidth
                        type="email"
                        value={loginData.email}
                        onChange={(e) => onchangeHandler(e)}
                        required
                        name="email"
                        autoComplete="email"
                        placeholder="Enter your email here"
                        variant="outlined"
                        className={styles.inputField}
                      />
                    </Box>

                    {/* Password */}
                    <Box className={styles.fieldWrapper}>
                      <Typography className={styles.label}>Password</Typography>
                      <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        value={loginData.password}
                        onChange={(e) => onchangeHandler(e)}
                        name="password"
                        required
                        autoComplete="current-password"
                        placeholder="Enter your password here"
                        variant="outlined"
                        className={styles.inputField}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                size="small"
                              >
                                {showPassword ? (
                                  <VisibilityOff fontSize="small" />
                                ) : (
                                  <Visibility fontSize="small" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      disabled={isLoginLoading}
                      className={styles.loginButton}
                    >
                      {getLoginButtonLabel()}
                    </Button>
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                      <Typography
                        component="span"
                        onClick={() => forgotResetHandler()}
                        className={styles.forgotLink}
                      >
                        {isPasswordExpired
                          ? LOGIN_CONTENT.BUTTON_CHANGE_PASSWORD
                          : LOGIN_CONTENT.BUTTON_FORGOT_PASSWORD}
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}

              {step === 'otp' && (
                <OTPVerification
                  email={loginData.email}
                  isLoading={verifyOtpLoading}
                  onVerifySuccess={handleLoginSuccess}
                  resendOtpHandler={handleResendOTP}
                  onBack={handleBackToLogin}
                />
              )}
            </Box>

            {step === 'login' && (
              <Box className={styles.illustrationWrapper}>
                <Box className={`${styles.circle} ${styles.circleOne}`} />
                <Box className={`${styles.circle} ${styles.circleTwo}`} />
                <Box className={`${styles.circle} ${styles.circleThree}`} />
                <LoginIllustration />
              </Box>
            )}
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
};

export default Login;
