import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosError } from 'axios';
import type { AuthenticationError, RootState } from '@/store/types';

interface ActivateAccountInputData {
  activationToken: string;
}

interface ActivateAccountOutputData {
  status: number;
  message: string;
}

interface ResponseData {
    message: string;
}
  

const activateAccount = createAsyncThunk<
ActivateAccountOutputData,
  ActivateAccountInputData,
  { rejectValue: AuthenticationError; state: RootState }
>(
  'auth/activate',
  async (data: ActivateAccountInputData, { rejectWithValue, getState }) => {
    const { lang } = getState().lang;
    const { activationToken } = data;
    try {
      const response = await axios.post<ResponseData>(
        `${import.meta.env.VITE_REACT_API_URL}/users/activate/${activationToken}`,
        {},
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

export default activateAccount;
