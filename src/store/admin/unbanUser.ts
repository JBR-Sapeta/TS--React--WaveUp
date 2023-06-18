import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosError } from 'axios';
import type { BaseErrorResponse, RootState } from '@/store/types';

interface UnbanUserInputData {
  userId: number;
}

interface UnbanUserOutputData {
  userId: number;
  message: string;
  status: number;
}
interface ResponseData {
  message: string;
}

const unbanUser = createAsyncThunk<
  UnbanUserOutputData,
  UnbanUserInputData,
  { rejectValue: BaseErrorResponse; state: RootState }
>(
  'users/unban',
  async (data: UnbanUserInputData, { rejectWithValue, getState }) => {
    const { token } = getState().auth.data;
    const { lang } = getState().lang;
    const { userId } = data;
    try {
      const response = await axios.put<ResponseData>(
        `${import.meta.env.VITE_REACT_API_URL}/admin/users/unban/${userId}`,
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

export default unbanUser;
