import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosError } from 'axios';
import type { AuthenticationError, RootState } from '@/store/types';

interface DeleteAccountInputData {
  password: string;
}

interface DeleteAccountOutputData {
  message: string;
  status: number;
}

interface ResponseData {
  message: string;
}

const deleteAccount = createAsyncThunk<
  DeleteAccountOutputData,
  DeleteAccountInputData,
  { rejectValue: AuthenticationError; state: RootState }
>(
  'auth/delete',
  async (data: DeleteAccountInputData, { rejectWithValue, getState }) => {
    const { token, id } = getState().auth.data;
    const { lang } = getState().lang;
    const { password } = data;
    try {
      const response = await axios.delete<ResponseData>(
        `${import.meta.env.VITE_REACT_API_URL}/users/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': lang,
            Authorization: `Bearer ${token}`,
          },
          data: { password },
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

export default deleteAccount;
