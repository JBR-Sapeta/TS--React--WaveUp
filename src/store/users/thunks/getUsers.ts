import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';

import { UserPreviewList, BaseErrorResponse, RootState } from '@/store/types';

interface GetUsersInputData {
  page: number;
  size: number;
}

const getUsers = createAsyncThunk<
  UserPreviewList,
  GetUsersInputData,
  { rejectValue: BaseErrorResponse; state: RootState }
>(
  'users/list',
  async (data: GetUsersInputData, { rejectWithValue, getState }) => {
    const {token} = getState().auth.data;
    const {lang} = getState().lang;
    try {
      const response = await axios.get<UserPreviewList>(
        `${import.meta.env.VITE_REACT_API_URL}/users`,
        {
          params: {
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

export default getUsers;
