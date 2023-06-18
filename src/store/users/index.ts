import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import getUser from './thunks/getUser';
import getUsers from './thunks/getUsers';
import getUsersByName from './thunks/getUsersByName';
import banUser from '../admin/banUser';
import unbanUser from '../admin/unbanUser';
import deleteUser from '../admin/deleteUser';

export interface UserData {
  id: number;
  accountName: string;
  username: string;
  avatar: string | null;
  birthday: string | null;
  description: string | null;
  city: string | null;
  hasBan: boolean;
}

export interface UserPreviewData {
  id: number;
  accountName: string;
  username: string;
  avatar: string | null;
  birthday: string | null;
  city: string | null;
}

export interface UserPreviewList {
  data: Array<UserPreviewData>;
  page: number;
  size: number;
  totalPages: number;
}

export interface UsersState {
  isLoading: boolean;
  message: string;
  status: number | null;
  user: UserData | null;
  list: UserPreviewList;
}

const initialState: UsersState = {
  isLoading: false,
  message: '',
  status: null,
  user: null,
  list: {
    data: [],
    page: 0,
    size: 10,
    totalPages: 0,
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    //--------------------------   Get User -------------------------- \\
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, {payload}) => {
      state.user = payload;
      state.message = 'Success.';
      state.status = 200;
      state.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state, {payload, error}) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });

    //--------------------------   Get Users List -------------------------- \\
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, {payload}) => {
      state.list = payload;
      state.message = 'Success.';
      state.status = 200;
      state.isLoading = false;
    });
    builder.addCase(getUsers.rejected, (state, {payload, error}) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });

    //--------------------------   Get Users By Name -------------------------- \\
    builder.addCase(getUsersByName.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsersByName.fulfilled, (state, {payload}) => {
      state.list = payload;
      state.message = 'Success.';
      state.status = 200;
      state.isLoading = false;
    });
    builder.addCase(getUsersByName.rejected, (state, {payload, error}) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });
    //-------------------------- Ban User - Admin -------------------------- \\
    builder.addCase(banUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      banUser.fulfilled,
      (state, { payload: { message, status, userId } }) => {
        state.message = message;
        state.status = status;
        if (state.user?.id === userId) {
          state.user.hasBan = true;
        }
        state.isLoading = false;
      }
    );
    builder.addCase(banUser.rejected, (state, {payload, error}) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });
    //-------------------------- Unban User - Admin -------------------------- \\
    builder.addCase(unbanUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      unbanUser.fulfilled,
      (state, { payload: { message, status, userId } }) => {
        state.message = message;
        state.status = status;
        if (state.user?.id === userId) {
          state.user.hasBan = false;
        }
        state.isLoading = false;
      }
    );
    builder.addCase(unbanUser.rejected, (state, {payload, error}) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });
    //-------------------------- Dlete User - Admin -------------------------- \\
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteUser.fulfilled,
      (state, { payload: { message, status } }) => {
        state.message = message;
        state.status = status;
        state.user = null;
        state.isLoading = false;
      }
    );
    builder.addCase(deleteUser.rejected, (state, {payload, error}) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
