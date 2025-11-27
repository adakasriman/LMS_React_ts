import { baseApi } from '@api/baseApi';

// Define the request type
export interface LoginRequest {
  email: string;
  password: string;
}

// Define the response type (e.g., a login response that could include a token or user data)
export interface LoginResponse {
  token: string; // Example: authentication token
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface ResetPasswordRequest {
  email: string;
  old_password: string;
  new_password: string;
}

// Define your API endpoints with proper types
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login mutation
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body: {
          ...body,
          is_web: true,
        },
      }),
    }),
    verifyOtp: builder.mutation<LoginResponse, { email: string; otp: string; verify?: boolean }>({
      query: (body) => ({
        url: '/validateotp',
        method: 'POST',
        body: {
          ...body,
          is_web: true,
        },
      }),
    }),
    generateOtp: builder.mutation<any, any>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body: {
          ...body,
          is_web: true,
        },
      }),
    }),
    resetPassword: builder.mutation<any, ResetPasswordRequest>({
      query: (body) => ({
        url: '/reset-password',
        method: 'POST',
        body: {
          ...body,
          is_web: true,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

// Export hooks for components to use
export const {
  useLoginMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useGenerateOtpMutation,
} = userApi;
