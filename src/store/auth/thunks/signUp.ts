import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';
import type { AuthenticationError, RootState } from '@/store/types';

export interface SignUpInputData {
  accountName: string;
  email: string;
  password: string;
}

interface SignUpOutputData {
  message: string;
  status: number;
}

interface ResponseData {
  message: string;
  status: number;
}

const signUp = createAsyncThunk<
  SignUpOutputData,
  SignUpInputData,
  {
    rejectValue: AuthenticationError;
    state: RootState;
  }
>(
  'auth/signUp',
  async (data: SignUpInputData, { rejectWithValue, getState }) => {
    const { lang } = getState().lang;
    const { accountName, email, password } = data;
    try {
      const response = await axios.post<ResponseData>(
        `${import.meta.env.VITE_REACT_API_URL}/users`,
        {
          accountName,
          email,
          password,
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

export default signUp;
