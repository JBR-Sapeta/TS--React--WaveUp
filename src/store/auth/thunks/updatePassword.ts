import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosError } from 'axios';
import type { AuthenticationError, RootState } from '@/store/types';

interface UpdatePasswordInputData {
  password: string;
  newPassword: string;
}

interface UpdatePasswordOutputData {
  message: string;
  status: number;
}

interface ResponseData {
  message: string;
}

const updatePassword = createAsyncThunk<
  UpdatePasswordOutputData,
  UpdatePasswordInputData,
  { rejectValue: AuthenticationError; state: RootState }
>(
  'auth/password',
  async (data: UpdatePasswordInputData, { rejectWithValue, getState }) => {
    const { token, id } = getState().auth.data;
    const { lang } = getState().lang;
    const { password, newPassword } = data;
    try {
      const response = await axios.put<ResponseData>(
        `${import.meta.env.VITE_REACT_API_URL}/users/password/${id}`,
        {
          password,
          newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': lang,
            Authorization: `Bearer ${token}`,
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

export default updatePassword;
