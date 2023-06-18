import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';
import type { RootState } from '@/store/types';

import { BaseErrorResponse } from '@/store/types';

interface DeletePostInputData {
  postId: number;
}

interface ResponseData {
  message: string;
  status: number;
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

interface DeletePostOutputData extends ResponseData {
  status: number;
}

const deletePost = createAsyncThunk<
  DeletePostOutputData,
  DeletePostInputData,
  { rejectValue: BaseErrorResponse; state: RootState }
>(
  'posts/delete',
  async (data: DeletePostInputData, { rejectWithValue, getState }) => {
    const { token } = getState().auth.data;
    const { lang } = getState().lang;
    try {
      const response = await axios.delete<ResponseData>(
        `${import.meta.env.VITE_REACT_API_URL}/posts/${data.postId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': lang,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const {status} = response;
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

export default deletePost;
