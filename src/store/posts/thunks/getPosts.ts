import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';
import type { RootState } from '@/store/types';

import { BaseErrorResponse, PostList } from '@/store/types';

export type DateQuery = 'today' | 'week' | 'older';

interface GetPostsInputData {
  page: number;
  size: number;
  date: DateQuery;
}

const getPosts = createAsyncThunk<
  PostList,
  GetPostsInputData,
  { rejectValue: BaseErrorResponse; state: RootState }
>(
  'users/find',
  async (data: GetPostsInputData, { rejectWithValue, getState }) => {
    const { token } = getState().auth.data;
    const { lang } = getState().lang;
    try {
      const response = await axios.get<PostList>(
        `${import.meta.env.VITE_REACT_API_URL}/posts`,
        {
          params: {
            date: data.date,
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

export default getPosts;
