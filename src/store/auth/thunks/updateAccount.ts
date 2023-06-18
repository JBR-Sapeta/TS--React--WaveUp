import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosError } from 'axios';
import type { AuthenticationError, RootState } from '@/store/types';

interface UpdateAccountInputData {
  username: string;
  image: string | null;
  description: string | null;
  birthday: string | null;
  city: string | null;
}

interface UpdateAccountOutputData {
  id: number;
  accountName: string;
  username: string;
  email: string;
  avatar: string | null;
  description: string | null;
  birthday: string | null;
  city: string | null;
}

const updateAccount = createAsyncThunk<
  UpdateAccountOutputData,
  UpdateAccountInputData,
  { rejectValue: AuthenticationError; state: RootState }
>(
  'auth/account',
  async (data: UpdateAccountInputData, { rejectWithValue, getState }) => {
    const { token, id } = getState().auth.data;
    const { lang } = getState().lang;
    const { username, image, description, birthday, city } = data;
    try {
      const response = await axios.put<UpdateAccountOutputData>(
        `${import.meta.env.VITE_REACT_API_URL}/users/${id}`,
        {
          username,
          image,
          description,
          birthday,
          city,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': lang,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      let error: AxiosError<AuthenticationError> = err as any;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export default updateAccount;
