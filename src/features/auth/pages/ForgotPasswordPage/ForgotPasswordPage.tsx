import React, { useState } from 'react';
import { Box, Paper, Fade } from '@mui/material';
import OTPVerification from '@features/auth/components/OTPVerification/OTPVerification';
import ForgotPassword from '@features/auth/components/ForgotPassword';
import ResetPassword from '@features/auth/components/ResetPassword';
import { useNavigate } from 'react-router-dom';
import styles from '@features/auth/pages/ForgotPasswordPage/ForgotPasswordPage.module.scss';
import {
  useGenerateOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} from '@features/auth/api/authApi';
import { showSnackbar } from '@components/snackbarUtils';

const ForgotPasswordPage: React.FC = () => {
  const [generateOtpMutation, { isLoading: loading }] = useGenerateOtpMutation();
  const [verifyOtp, { isLoading: verifyOtpLoading }] = useVerifyOtpMutation();
  const [resetPasswordMutation, { isLoading: ResetPasswordApiLoading }] =
    useResetPasswordMutation();

  const navigate = useNavigate();
  // const mapTypeToStep = (type?: string): 'forgot' | 'reset-otp' | 'reset-password' => {
  //   switch (type) {
  //     case 'forgot':
  //       return 'forgot';
  //     case 'otp':
  //       return 'reset-otp';
  //     case 'reset':
  //       return 'reset-password';
  //     default:
  //       return 'forgot';
  //   }
  // };

  // const [step, setStep] = useState<'forgot' | 'reset-otp' | 'reset-password'>(
  //   mapTypeToStep(type)
  // );

  const [step, setStep] = useState<'forgot' | 'reset-otp' | 'reset-password'>('forgot');

  const [email, setEmail] = useState('');

  const handleResetCodeSent = async (email: string) => {
    const res: any = await generateOtpMutation({ email, verify: true });
    if (res.data.status_code === 200) {
      setStep('reset-otp');
      setEmail(email);
    }
  };

  const handleResetOTPVerified = async (otp: string) => {
    const resValidate: any = {
      isVerified: false,
    };
    try {
      const res: any = await verifyOtp({ email: email, otp }).unwrap();
      if (res.status_code == 200) {
        setStep('reset-password');
        resValidate.msg = res.message;
        resValidate.isVerified = true;
      }
    } catch (error: any) {
      resValidate.msg = error.message;
    }

    showSnackbar({
      message: resValidate.isVerified ? 'Otp Verification Successful' : resValidate.msg,
      severity: resValidate.isVerified ? 'success' : 'error',
      duration: 3000,
      position: { vertical: 'bottom', horizontal: 'right' },
    });
  };

  const handlePasswordResetSuccess = async (old_password: string, new_password: string) => {
    const resValidate: any = {
      isVerified: false,
    };
    try {
      const submitData = { email: email, old_password, new_password };
      const res: any = await resetPasswordMutation(submitData).unwrap();
      if (res.status_code == 200) {
        resValidate.isVerified = true;
        resValidate.msg = 'Password Reset Successful';
      } else {
        resValidate.msg = res.message;
      }
    } catch (error: any) {
      resValidate.msg = error.message;
    }

    showSnackbar({
      message: resValidate.msg,
      severity: resValidate.isVerified ? 'success' : 'error',
      duration: 3000,
      position: { vertical: 'bottom', horizontal: 'right' },
    });
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleResendOTP = () => {
    // To do
  };

  return (
    <Box
      className={`min-h-screen flex items-center justify-center bg-gray-50 p-1 ${styles.forgotPasswordPage}`}
    >
      <Fade in timeout={600}>
        <Paper elevation={0} className={styles.forgotPaper} sx={{ maxWidth: '530px' }}>
          {step === 'forgot' && (
            <ForgotPassword
              onResetSuccess={handleResetCodeSent}
              onBackToLogin={handleBackToLogin}
              isLoading={loading}
            />
          )}

          {step === 'reset-otp' && (
            <OTPVerification
              email={email}
              onVerifySuccess={handleResetOTPVerified}
              resendOtpHandler={handleResendOTP}
              onBack={handleBackToLogin}
              isLoading={verifyOtpLoading}
            />
          )}

          {step === 'reset-password' && (
            <ResetPassword
              email={email}
              onResetSuccess={handlePasswordResetSuccess}
              onBackToLogin={handleBackToLogin}
              isLoading={ResetPasswordApiLoading}
            />
          )}
        </Paper>
      </Fade>
    </Box>
  );
};

export default ForgotPasswordPage;
