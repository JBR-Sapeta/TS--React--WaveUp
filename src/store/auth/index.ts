/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import signUp from './thunks/signUp';
import signIn from './thunks/signIn';
import resetPassword from './thunks/resetPassword';
import updateAccount from './thunks/updateAccount';
import updateEmail from './thunks/updateEmail';
import updatePassword from './thunks/updatePassword';
import deleteAccount from './thunks/deleteAccount';
import activateAccount from './thunks/activateAccount';

export interface AuthenticationValidationErrors {
  accountName?: string;
  email?: string;
  newEmail?: string;
  password?: string;
  newPassword?: string;
  username?: string;
  birthday?: string;
  description?: string;
  city?: string;
  image?: string;
  token?: string;
}

export interface AuthenticationError {
  status: number;
  path: string;
  timestamp: number | null;
  message: string;
  validationErrors?: AuthenticationValidationErrors;
}

export interface AuthenticatedUserData {
  id: number;
  accountName: string;
  username: string;
  email: string;
  avatar: string | null;
  description: string | null;
  isAdmin: boolean;
  birthday: string | null;
  city: string | null;
  token: string;
  expiresIn: string;
}
export interface AuthenticationState {
  isLoading: boolean;
  message: string;
  status: number | null;
  error: AuthenticationError;
  data: AuthenticatedUserData;
}

const plainValidationErrors = {
  accountName: '',
  email: '',
  newEmail: '',
  password: '',
  newPassword: '',
  username: '',
  birthday: '',
  description: '',
  city: '',
  image: '',
};

const plainData = {
  id: 0,
  accountName: '',
  username: '',
  email: '',
  avatar: null,
  description: null,
  isAdmin: false,
  city: null,
  birthday: null,
  token: '',
  expiresIn: '',
};

const initialState: AuthenticationState = {
  isLoading: false,
  message: '',
  status: null,
  error: {
    status: 0,
    path: '',
    timestamp: null,
    message: '',
    validationErrors: plainValidationErrors,
  },
  data: plainData,
};

export enum AuthenticationResetAction {
  ACCOUNT_NAME = 'accountName',
  EMAIL = 'email',
  NEW_EMAIL = 'newEmail',
  PASSWORD = 'password',
  NEW_PASSWORD = 'newPassword',
  USERNAME = 'username',
  BIRTHDAY = 'birthday',
  DESCRIPTION = 'description',
  CITY = 'city',
  IMAGE = 'image',
}

const authenticatSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<AuthenticatedUserData>) {
      state.data = action.payload;
    },
    resetUserData(state) {
      state.data = plainData;
    },

    resetResponseData(state) {
      state.message = '';
      state.status = null;
    },

    resetValidationErrors(state) {
      state.message = '';
      state.status = null;
      state.error.validationErrors = plainValidationErrors;
    },
    clearValidationError(
      state,
      action: PayloadAction<{ field: AuthenticationResetAction }>
    ) {
      if (state.error.validationErrors) {
        state.error.validationErrors[action.payload.field] = '';
      }
    },
  },
  extraReducers(builder) {
    //--------------------------    Sign Up    -------------------------- \\
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      signUp.fulfilled,
      (state, { payload: { message, status } }) => {
        state.message = message;
        state.status = status;
        state.isLoading = false;
      }
    );
    builder.addCase(signUp.rejected, (state, { payload, error }) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
        state.error = payload;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });
    
    //--------------------------  Activate Account  -------------------------- \\
    builder.addCase(activateAccount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      activateAccount.fulfilled,
      (state, { payload: { message, status } }) => {
        state.message = message;
        state.status = status;
        state.isLoading = false;
      }
    );
    builder.addCase(activateAccount.rejected, (state, { payload, error }) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
        state.error = payload;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });

    //--------------------------   Sign In  -------------------------- \\
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = 200;
      state.message = 'Success.';
      state.isLoading = false;
    });
    builder.addCase(signIn.rejected, (state, { payload, error }) => {
      if (payload) {
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });

    //--------------------------   Reset  -------------------------- \\
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      resetPassword.fulfilled,
      (state, { payload: { message, status } }) => {
        state.message = message;
        state.status = status;
        state.isLoading = false;
      }
    );
    builder.addCase(resetPassword.rejected, (state, { payload, error }) => {
      if (payload) {
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });

    //---------------------   Update Account  --------------------- \\
    builder.addCase(updateAccount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateAccount.fulfilled, (state, { payload }) => {
      state.data = { ...state.data, ...payload };
      state.status = 200;
      state.message = 'Success.';
      state.isLoading = false;
    });
    builder.addCase(updateAccount.rejected, (state, { payload, error }) => {
      if (payload) {
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });

    //---------------------   Update Email  --------------------- \\
    builder.addCase(updateEmail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateEmail.fulfilled,
      (state, { payload: { email, status, message } }) => {
        state.data.email = email;
        state.status = status;
        state.message = message;
        state.isLoading = false;
      }
    );
    builder.addCase(updateEmail.rejected, (state, { payload, error }) => {
      if (payload) {
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });

    //---------------------   Update Password  --------------------- \\
    builder.addCase(updatePassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      updatePassword.fulfilled,
      (state, { payload: { status, message } }) => {
        state.status = status;
        state.message = message;
        state.isLoading = false;
      }
    );
    builder.addCase(updatePassword.rejected, (state, { payload, error }) => {
      if (payload) {
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });

    //---------------------   Delete Account --------------------- \\
    builder.addCase(deleteAccount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteAccount.fulfilled,
      (state, { payload: { status, message } }) => {
        state.status = status;
        state.message = message;
        state.data = plainData;
        state.isLoading = false;
      }
    );
    builder.addCase(deleteAccount.rejected, (state, { payload, error }) => {
      if (payload) {
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });
  },
});

export const {
  setUserData,
  resetUserData,
  resetValidationErrors,
  clearValidationError,
  resetResponseData,
} = authenticatSlice.actions;
export const authenticationReducer = authenticatSlice.reducer;
