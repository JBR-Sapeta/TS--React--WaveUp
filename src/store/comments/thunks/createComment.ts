import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';

import { CommentError, RootState, CommentData } from '@/store/types';

export interface CreateCommentInputData {
  postId: number;
  content: string;
}

export interface CreateCommentOutputData {
  message: string;
  status: number;
  comment: CommentData;
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

const createComment = createAsyncThunk<
  CreateCommentOutputData,
  CreateCommentInputData,
  { rejectValue: CommentError; state: RootState }
>(
  'comments/create',
  async (data: CreateCommentInputData, { rejectWithValue, getState }) => {
    const authData = getState().auth.data;
    const { lang } = getState().lang;
    const { postId, content } = data;
    try {
      const response = await axios.post<ResponseData>(
        `${import.meta.env.VITE_REACT_API_URL}/comments/${postId}`,
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
      const comment = {
        id: response.data.comment.id,
        content: response.data.comment.content,
        createdAt: response.data.comment.createdAt,
        user: {
          id: authData.id,
          username: authData.username,
          avatar: authData.avatar,
        },
      };
      return { comment, postId, message, status };
    } catch (err) {
      let error: AxiosError<CommentError> = err as any;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export default createComment;
