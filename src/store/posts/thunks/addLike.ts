import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';

import { BaseErrorResponse, RootState } from '@/store/types';

export interface AddLikeInputData {
  postId: number;
}

export interface AddLikeOutputData {
  message: string;
  status: number;
  postId: number;
  userId: number;
}

interface ResponseData {
  message: string;
}

const addLike = createAsyncThunk<
  AddLikeOutputData,
  AddLikeInputData,
  { rejectValue: BaseErrorResponse; state: RootState }
>('like/add', async (data: AddLikeInputData, { rejectWithValue, getState }) => {
  const { token, id: userId } = getState().auth.data;
  const { lang } = getState().lang;
  const { postId } = data;
  try {
    const response = await axios.post<ResponseData>(
      `${import.meta.env.VITE_REACT_API_URL}/likes/${postId}`,
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
    return { message, status, postId, userId };
  } catch (err) {
    let error: AxiosError<BaseErrorResponse> = err as any;
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

export default addLike;
