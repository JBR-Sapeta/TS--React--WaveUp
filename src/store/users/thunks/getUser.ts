import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';
import type { RootState } from '@/store/types';

import { UserData, BaseErrorResponse } from '@/store/types';

interface GetUserInputData {
  userId: number;
}

const getUser = createAsyncThunk<
  UserData,
  GetUserInputData,
  { rejectValue: BaseErrorResponse; state: RootState }
>(
  'users/user',
  async (data: GetUserInputData, { rejectWithValue, getState }) => {
    const { token } = getState().auth.data;
    const { lang } = getState().lang;
    const { userId } = data;
    try {
      const response = await axios.get<UserData>(
        `${import.meta.env.VITE_REACT_API_URL}/users/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': lang,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      let error: AxiosError<BaseErrorResponse> = err as any;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export default getUser;
