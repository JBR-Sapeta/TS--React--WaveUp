import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';
import type {
  AuthenticationError,
  RootState,
} from '@/store/types';

export interface ResetInputData {
  email: string;
}

interface ResetOutputData {
  message: string;
  status: number;
}

interface ResponseData {
  message: string;
}

const resetPassword = createAsyncThunk<
  ResetOutputData,
  ResetInputData,
  {
    rejectValue: AuthenticationError;
    state: RootState;
  }
>('auth/reset', async (data: ResetInputData, { rejectWithValue, getState }) => {
  const { lang } = getState().lang;
  const { email } = data;
  try {
    const response = await axios.post<ResponseData>(
      `${import.meta.env.VITE_REACT_API_URL}/users/password`,
      {
        email,
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
});

export default resetPassword;
