import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';
import type {  RootState } from '@/store/types';

import { UserPreviewList, BaseErrorResponse } from '@/store/types';

interface GetUsersByNameInputData {
  page: number;
  size: number;
  name: string;
}

const getUsersByName = createAsyncThunk<
  UserPreviewList,
  GetUsersByNameInputData,
  { rejectValue: BaseErrorResponse; state: RootState }
>(
  'users/find',
  async (data: GetUsersByNameInputData, { rejectWithValue, getState }) => {
    const { token } = getState().auth.data;
    const { lang } = getState().lang;
    try {
      const response = await axios.get<UserPreviewList>(
        `${import.meta.env.VITE_REACT_API_URL}/users/name/`,
        {
          params: {
            name: data.name,
            page: data.page,
            size: data.size,
          },
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

export default getUsersByName;
