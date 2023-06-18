import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';

import { BaseErrorResponse, RootState } from '@/store/types';

export interface DeleteCommentInputData {
  postId: number;
  commentId: number;
}

export interface DeleteCommentOutputData {
  message: string;
  status: number;
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

const deleteComment = createAsyncThunk<
  DeleteCommentOutputData,
  DeleteCommentInputData,
  { rejectValue: BaseErrorResponse; state: RootState }
>(
  'comments/delete',
  async (data: DeleteCommentInputData, { rejectWithValue, getState }) => {
    const authData = getState().auth.data;
    const { lang } = getState().lang;
    const { postId, commentId } = data;
    try {
      const response = await axios.delete<ResponseData>(
        `${import.meta.env.VITE_REACT_API_URL}/comments/${data.commentId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': lang,
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      const { status } = response;
      const { message } = response.data;
      return { message, status, postId, commentId };
    } catch (err) {
      let error: AxiosError<BaseErrorResponse> = err as any;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export default deleteComment;
