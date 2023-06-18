import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosError } from 'axios';
import type { BaseErrorResponse, RootState } from '@/store/types';

interface DeleteUserInputData {
  userId: number;
  password: string;
}

interface DeleteUserOutputData {
  userId: number;
  message: string;
  status: number;
}

interface ResponseData {
  message: string;
}

const deleteUser = createAsyncThunk<
  DeleteUserOutputData,
  DeleteUserInputData,
  { rejectValue: BaseErrorResponse; state: RootState }
>(
  'users/delete',
  async (data: DeleteUserInputData, { rejectWithValue, getState }) => {
    const { token } = getState().auth.data;
    const { lang } = getState().lang;
    const { userId } = data;
    try {
      const response = await axios.delete<ResponseData>(
        `${import.meta.env.VITE_REACT_API_URL}/admin/users/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': lang,
            Authorization: `Bearer ${token}`,
          },
          data: { password: data.password },
        }
      );
      const { status } = response;
      const { message } = response.data;
      return { status, message, userId };
    } catch (err) {
      let error: AxiosError<BaseErrorResponse> = err as any;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export default deleteUser;
