import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosError } from 'axios';
import type { AuthenticationError, RootState } from '@/store/types';

interface UpdateEmailInputData {
  password: string;
  newEmail: string;
}

interface UpdateEmailOutputData {
  message: string;
  status: number;
  email: string;
}

interface ResponseData {
  message: string;
  email: string;
}

const updateEmail = createAsyncThunk<
  UpdateEmailOutputData,
  UpdateEmailInputData,
  { rejectValue: AuthenticationError; state: RootState }
>(
  'auth/email',
  async (data: UpdateEmailInputData, { rejectWithValue, getState }) => {
    const { token, id } = getState().auth.data;
    const { lang } = getState().lang;
    const { password, newEmail } = data;
    try {
      const response = await axios.put<ResponseData>(
        `${import.meta.env.VITE_REACT_API_URL}/users/email/${id}`,
        {
          password,
          newEmail,
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
      const { message, email } = response.data;
      return { message, status, email };
    } catch (err) {
      let error: AxiosError<AuthenticationError> = err as any;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export default updateEmail;
