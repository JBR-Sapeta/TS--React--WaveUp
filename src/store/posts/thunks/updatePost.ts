import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';

import { BaseErrorResponse, RootState } from '@/store/types';

interface UpdatePostInputData {
  postId: number;
  content: string;
}

interface ResponseData {
  message: string;
  content: {
    id: number;
    content: string;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
    userId: number;
    file: number | null;
  };
}

interface UpdatePostOutputData extends ResponseData {
  status: number;
}

const updatePost = createAsyncThunk<
  UpdatePostOutputData,
  UpdatePostInputData,
  { rejectValue: BaseErrorResponse; state: RootState }
>(
  'posts/update',
  async (data: UpdatePostInputData, { rejectWithValue, getState }) => {
    const { token } = getState().auth.data;
    const { lang } = getState().lang;
    const { postId, content } = data;
    try {
      const response = await axios.put<ResponseData>(
        `${import.meta.env.VITE_REACT_API_URL}/posts/${postId}`,
        {
          content,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': lang,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { status } = response;
      return { ...response.data, status };
    } catch (err) {
      let error: AxiosError<BaseErrorResponse> = err as any;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export default updatePost;
