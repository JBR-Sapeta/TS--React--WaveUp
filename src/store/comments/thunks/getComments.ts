import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';

import { BaseErrorResponse, CommentList, RootState } from '@/store/types';

export interface GetCommentsInputData {
  postId: number;
  page: number;
}

export interface GetCommentsOutputData {
  status: number;
  postId: number;
  list: CommentList;
}

const getComments = createAsyncThunk<
  GetCommentsOutputData,
  GetCommentsInputData,
  { rejectValue: BaseErrorResponse; state: RootState }
>(
  'comments/get',
  async (data: GetCommentsInputData, { rejectWithValue, getState }) => {
    const authData = getState().auth.data;
    const { lang } = getState().lang;
    const { postId, page } = data;
    try {
      const response = await axios.get<CommentList>(
        `${import.meta.env.VITE_REACT_API_URL}/comments/${data.postId}`,
        {
          params: {
            page: data.page,
          },

          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': lang,
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      const { status } = response;
      return { status, list: response.data, postId };
    } catch (err) {
      let error: AxiosError<BaseErrorResponse> = err as any;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export default getComments;
