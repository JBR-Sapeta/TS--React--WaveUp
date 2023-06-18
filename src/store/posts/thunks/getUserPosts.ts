import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';
import type { RootState } from '@/store/types';

import { BaseErrorResponse, PostList } from '@/store/types';

interface GetUserPostsInputData {
  userId: number;
  size: number;
  page: number;
}

const getUserPosts = createAsyncThunk<
  PostList,
  GetUserPostsInputData,
  { rejectValue: BaseErrorResponse; state: RootState }
>(
  'posts/findByUser',
  async (data: GetUserPostsInputData, { rejectWithValue, getState }) => {
    const { token } = getState().auth.data;
    const { lang } = getState().lang;
    const { userId, page, size } = data;
    try {
      const response = await axios.get<PostList>(
        `${import.meta.env.VITE_REACT_API_URL}/posts/${userId}`,
        {
          params: {
            page,
            size,
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

export default getUserPosts;
