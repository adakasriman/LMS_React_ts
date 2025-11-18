import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, Fade } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FORGOT_PASSWORD_CONTENT, LOGIN_CONTENT } from '@utils/uiContent';
import { showSnackbar } from '@components/snackbarUtils';
interface ForgotPasswordProps {
  onBackToLogin: () => void;
  onResetSuccess: (email: string) => void;
  isLoading: boolean;
}

const ForgotPassword = ({ onBackToLogin, onResetSuccess, isLoading }: ForgotPasswordProps) => {
  const { type } = useParams();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showSnackbar({
          message: 'Email is Required!',
          severity: 'error',
          duration: 3000,
          position: { vertical: 'bottom', horizontal: 'right' },
        });
        return;
      }
      // In a real app, this would send a reset link/OTP to the email
      // After showing success message, move to OTP verification
      setTimeout(() => {
        onResetSuccess(email);
      }, 1500);
    }, 800);
  };

  const otpGenerateHandler = () => {
    if (!email) {
      return;
    }
    onResetSuccess(email);
  };

  return (
    <Fade in>
      <Box>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 700,
              color: '#1a1a1a',
              mb: 1,
            }}
          >
            {type === 'reset' ? LOGIN_CONTENT.BUTTON_CHANGE_PASSWORD : 'Forgot Password?'}
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#666' }}>
            {type === 'reset'
              ? FORGOT_PASSWORD_CONTENT.DESCRIPTION_VERIFY
              : FORGOT_PASSWORD_CONTENT.DESCRIPTION_REQUEST}
          </Typography>
        </Box>

        {/* Success Alert */}
        {isLoading && (
          <Fade in>
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
              Verification code sent successfully! Redirecting...
            </Alert>
          </Fade>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          {/* Email Field */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: 14, color: '#1a1a1a', mb: 1, fontWeight: 500 }}>
              Email Address
            </Typography>
            <TextField
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
              placeholder="Enter your email address"
              variant="outlined"
              disabled={isLoading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                  borderRadius: 3,
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1565c0',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1565c0',
                  },
                },
              }}
            />
          </Box>

          {/* Submit Button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={isLoading}
            onClick={() => otpGenerateHandler()}
            sx={{
              py: 1.5,
              mb: 2,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: 16,
              fontWeight: 600,
              bgcolor: '#1565c0',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#0d47a1',
                boxShadow: 'none',
              },
            }}
          >
            {isLoading ? 'Sending Code...' : 'Send OTP Code'}
          </Button>

          {/* Back to Login */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              size="small"
              onClick={onBackToLogin}
              disabled={isLoading}
              sx={{
                textTransform: 'none',
                color: '#1565c0',
                fontSize: 13,
                '&:hover': {
                  background: 'transparent',
                  textDecoration: 'underline',
                },
              }}
            >
              ← Back to Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default ForgotPassword;
