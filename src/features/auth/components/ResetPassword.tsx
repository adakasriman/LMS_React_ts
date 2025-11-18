import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Fade,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { EMAIL_PATTERNS } from '@utils/constants';
import { useParams } from 'react-router-dom';

interface ResetPasswordProps {
  email: string;
  onResetSuccess: (newPassword: any, confirmPassword: any) => void;
  onBackToLogin: () => void;
  isLoading: boolean;
}

const ResetPassword = ({ email, onResetSuccess, onBackToLogin, isLoading }: ResetPasswordProps) => {
  const { type } = useParams();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!oldPassword) {
      setError('Old password is required.');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword === oldPassword) {
      setError('New password cannot be same as old password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const isValidEmail = EMAIL_PATTERNS.some((pattern) => pattern.test(email));
    if (!isValidEmail) {
      setError('Please use your official CredRight or Caspian email address.');
      return;
    }

    setTimeout(() => {
      if (type == 'forgot') {
        onResetSuccess(oldPassword, confirmPassword);
      } else {
        onResetSuccess(newPassword, confirmPassword);
      }
    }, 800);
  };

  const fieldStyles = {
    '& .MuiOutlinedInput-root': {
      bgcolor: 'white',
      borderRadius: 3,
      '& fieldset': { borderColor: 'transparent' },
      '&:hover fieldset': { borderColor: '#1565c0' },
      '&.Mui-focused fieldset': { borderColor: '#1565c0' },
    },
  };

  return (
    <Fade in>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
            Reset Password
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#666' }}>
            Create a new password for {email}
          </Typography>
        </Box>

        {error && (
          <Fade in>
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          </Fade>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          {/* Old Password */}
          {type == 'forgot' && (
            <Box sx={{ mb: 2.5 }}>
              <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 500 }}>Old Password</Typography>
              <TextField
                fullWidth
                type={showOldPassword ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                placeholder="Enter old password"
                variant="outlined"
                sx={fieldStyles}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        edge="end"
                        size="small"
                      >
                        {showOldPassword ? (
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
          )}

          {/* New Password */}
          <Box sx={{ mb: 2.5 }}>
            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 500 }}>New Password</Typography>
            <TextField
              fullWidth
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter new password"
              variant="outlined"
              sx={fieldStyles}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                      size="small"
                    >
                      {showNewPassword ? (
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

          {/* Confirm Password */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 500 }}>Confirm Password</Typography>
            <TextField
              fullWidth
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Re-enter new password"
              variant="outlined"
              sx={fieldStyles}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? (
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
            disabled={isLoading}
            sx={{
              py: 1.5,
              mb: 2,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: 16,
              fontWeight: 600,
              bgcolor: '#1565c0',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#0d47a1', boxShadow: 'none' },
            }}
          >
            {isLoading ? 'Resetting Password...' : 'Reset Password'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              size="small"
              onClick={onBackToLogin}
              disabled={isLoading}
              sx={{
                textTransform: 'none',
                color: '#1565c0',
                fontSize: 13,
                '&:hover': { background: 'transparent', textDecoration: 'underline' },
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

export default ResetPassword;
