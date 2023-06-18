import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosError } from 'axios';
import type { AuthenticationError, RootState } from '@/store/types';

interface NewPasswordInputData {
  password: string;
  passwordResetToken: string;
}

interface NewPasswordOutputData {
  message: string;
  status: number;
}

interface ResponseData {
  message: string;
}

const newPassword = createAsyncThunk<
  NewPasswordOutputData,
  NewPasswordInputData,
  { rejectValue: AuthenticationError; state: RootState }
>(
  'auth/recovery',
  async (data: NewPasswordInputData, { rejectWithValue, getState }) => {
    const { lang } = getState().lang;
    const { password, passwordResetToken } = data;
    try {
      const response = await axios.put<ResponseData>(
        `${import.meta.env.VITE_REACT_API_URL}/users/password`,
        {
          password,
          passwordResetToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': lang,
          },
        }
      );

      const { status } = response;
      const { message } = response.data;
      return { message, status };
    } catch (err) {
      let error: AxiosError<AuthenticationError> = err as any;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export default newPassword;
