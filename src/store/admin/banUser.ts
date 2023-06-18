import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosError } from 'axios';
import type { BaseErrorResponse, RootState } from '@/store/types';

interface BanUserInputData {
  userId: number;
}

interface BanUserOutputData {
  userId: number;
  message: string;
  status: number;
}

interface ResponseData {
  message: string;
}

const banUser = createAsyncThunk<
  BanUserOutputData,
  BanUserInputData,
  { rejectValue: BaseErrorResponse; state: RootState }
>(
  'users/ban',
  async (data: BanUserInputData, { rejectWithValue, getState }) => {
    const { token } = getState().auth.data;
    const { lang } = getState().lang;
    const { userId } = data;
    try {
      const response = await axios.put<ResponseData>(
        `${import.meta.env.VITE_REACT_API_URL}/admin/users/ban/${userId}`,
        {},
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
      return { status, message, userId };
    } catch (err) {
      let error: AxiosError<BaseErrorResponse> = err as any;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export default banUser;
