import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';

import { BaseErrorResponse, RootState } from '@/store/types';

export interface ResetCommentInputData {
  commentId: number;
  postId: number;
}

export interface ResetCommentOutputData {
  message: string;
  status: number;
  content: string;
  commentId: number;
  postId: number;
}

interface ResponseData {
  message: string;
  comment: {
    id: number;
    userId: number;
    postId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
}

const resetComment = createAsyncThunk<
  ResetCommentOutputData,
  ResetCommentInputData,
  { rejectValue: BaseErrorResponse; state: RootState }
>(
  'comments/reset',
  async (data: ResetCommentInputData, { rejectWithValue, getState }) => {
    const { token } = getState().auth.data;
    const { lang } = getState().lang;
    const { commentId, postId } = data;

    try {
      const response = await axios.put<ResponseData>(
        `${
          import.meta.env.VITE_REACT_API_URL
        }/admin/comments/reset/${commentId}`,
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
      const {
        message,
        comment: { content },
      } = response.data;
      return { message, status, postId, commentId, content };
    } catch (err) {
      let error: AxiosError<BaseErrorResponse> = err as any;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export default resetComment;
