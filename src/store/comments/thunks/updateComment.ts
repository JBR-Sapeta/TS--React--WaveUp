import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';

import { CommentError, RootState } from '@/store/types';

export interface UpdateCommentInputData {
  postId: number;
  commentId: number;
  content: string;
}

export interface UpdateCommentOutputData {
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

const updateComment = createAsyncThunk<
  UpdateCommentOutputData,
  UpdateCommentInputData,
  { rejectValue: CommentError; state: RootState }
>(
  'comments/update',
  async (data: UpdateCommentInputData, { rejectWithValue, getState }) => {
    const authData = getState().auth.data;
    const { lang } = getState().lang;
    const { postId, content, commentId } = data;
    try {
      const response = await axios.put<ResponseData>(
        `${import.meta.env.VITE_REACT_API_URL}/comments/${commentId}`,
        {
          content: content,
        },
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
      return {
        content: content,
        commentId: commentId,
        postId: postId,
        message,
        status,
      };
    } catch (err) {
      let error: AxiosError<CommentError> = err as any;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export default updateComment;
