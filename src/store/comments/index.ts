import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import createComment from './thunks/createComment';
import getComments from './thunks/getComments';
import updateComment from './thunks/updateComment';
import deleteComment from './thunks/deleteComment';
import resetComment from '../admin/resetComment';
import { CommentList } from '@/components';
import { act } from 'react-dom/test-utils';

export interface CommentData {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
    avatar: string | null;
  };
}

export interface CommentList {
  data: Array<CommentData>;
  page: number;
  size: number;
  totalPages: number;
}

export interface CommentError {
  status: number;
  path: string;
  timestamp: number | null;
  message: string;
  validationErrors?: {
    content?: string;
  };
}

export interface CommentState {
  isLoading: boolean;
  message: string;
  status: number | null;
  error: CommentError;
  currentPostId: number;
  fetchedPages: number;
  list: {
    [id: string]: CommentList;
  };
}

const initialValidationErrors = {
  content: '',
};

const initialError = {
  status: 0,
  path: '',
  timestamp: null,
  message: '',
  validationErrors: initialValidationErrors,
};

const initialState: CommentState = {
  isLoading: false,
  message: '',
  status: null,
  error: initialError,
  currentPostId: 0,
  fetchedPages: 0,
  list: {},
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetValidationErrors(state) {
      state.message = '';
      state.status = null;
      state.error.validationErrors = initialValidationErrors;
    },
  },
  extraReducers(builder) {
    //--------------------------   Create Comment  -------------------------- \\
    builder.addCase(createComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      createComment.fulfilled,
      (state, { payload: { message, status, postId, comment } }) => {
        state.message = message;
        state.status = status;

        if (state.list[postId] === undefined) {
          state.list[postId] = {
            data: [comment],
            page: 0,
            size: 10,
            totalPages: 1,
          };
        } else {
          state.list[postId].data.push(comment);
        }
        state.isLoading = false;
      }
    );
    builder.addCase(createComment.rejected, (state, action) => {
      if (action.payload) {
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.error = action.payload;
      } else {
        state.message = action.error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });
    //--------------------------   Get Comments  -------------------------- \\
    builder.addCase(getComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getComments.fulfilled,
      (state, { payload: { status, postId, list } }) => {
        state.message = 'Success';
        state.status = status;
        if (state.list[postId] === undefined) {
          state.list[postId] = list;
        }

        if (state.list[postId].page + 1 === list.page) {
          state.list[postId].data = state.list[postId].data.concat(list.data);
          state.list[postId].page = list.page;
          state.list[postId].size = list.size;
          state.list[postId].totalPages = list.totalPages;
        }

        state.isLoading = false;
      }
    );
    builder.addCase(getComments.rejected, (state, {payload, error}) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
        state.error = payload;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });
    //--------------------------   Update Comment  -------------------------- \\
    builder.addCase(updateComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateComment.fulfilled,
      (state, { payload: { message, status, postId, commentId, content } }) => {
        state.message = message;
        state.status = status;

        const index = state.list[postId].data.findIndex(
          (comment) => comment.id === commentId
        );

        if (index !== -1) {
          state.list[postId].data[index].content = content;
        }
        state.isLoading = false;
      }
    );
    builder.addCase(updateComment.rejected, (state, {payload, error}) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
        state.error = payload;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });
    //--------------------------   Delete Comment  -------------------------- \\
    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteComment.fulfilled,
      (state, { payload: { message, status, commentId, postId } }) => {
        state.message = message;
        state.status = status;
        state.list[postId].data = state.list[postId].data.filter(
          (comment) => comment.id !== commentId
        );
        state.isLoading = false;
      }
    );
    builder.addCase(deleteComment.rejected, (state, {payload, error}) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
        state.error = payload;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });
    //--------------------------   Reset Comment  -------------------------- \\
    builder.addCase(resetComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      resetComment.fulfilled,
      (state, { payload: { message, status, postId, commentId, content } }) => {
        state.message = message;
        state.status = status;

        const index = state.list[postId].data.findIndex(
          (comment) => comment.id === commentId
        );

        if (index !== -1) {
          state.list[postId].data[index].content = content;
        }
        state.isLoading = false;
      }
    );
    builder.addCase(resetComment.rejected, (state, {payload, error}) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
        state.error = payload;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });
  },
});

export const { resetValidationErrors } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
