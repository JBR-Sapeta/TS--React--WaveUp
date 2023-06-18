import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';

import { BaseErrorResponse, RootState } from '@/store/types';

interface ShowPostInputData {
  postId: number;
}

interface ShowPostOutputData {
  status: number;
  message: string;
  postId: number;
}

interface ResponseData {
  message: string;
}

const showPost = createAsyncThunk<
  ShowPostOutputData,
  ShowPostInputData,
  { rejectValue: BaseErrorResponse; state: RootState }
>(
  'posts/show',
  async (data: ShowPostInputData, { rejectWithValue, getState }) => {
    const { token } = getState().auth.data;
    const { lang } = getState().lang;
    const { postId } = data;
    try {
      const response = await axios.put<ResponseData>(
        `${import.meta.env.VITE_REACT_API_URL}/admin/posts/show/${postId}`,
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
      return { message, status, postId };
    } catch (err) {
      let error: AxiosError<BaseErrorResponse> = err as any;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export default showPost;
