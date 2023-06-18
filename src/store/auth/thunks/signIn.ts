import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';
import type {
  AuthenticationError,
  AuthenticatedUserData,
  RootState,
} from '@/store/types';

export interface SignInInputData {
  email: string;
  password: string;
}

const signIn = createAsyncThunk<
  AuthenticatedUserData,
  SignInInputData,
  {
    rejectValue: AuthenticationError;
    state: RootState;
  }
>(
  'auth/signIn',
  async (data: SignInInputData, { rejectWithValue, getState }) => {
    const { lang } = getState().lang;
    const { email, password } = data;
    try {
      const response = await axios.post<AuthenticatedUserData>(
        `${import.meta.env.VITE_REACT_API_URL}/users/auth`,
        {
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
      return response.data;
    } catch (err) {
      let error: AxiosError<AuthenticationError> = err as any;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export default signIn;
