import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import createPost from './thunks/createPost';
import getPosts from './thunks/getPosts';
import getUserPosts from './thunks/getUserPosts';
import updatePost from './thunks/updatePost';
import deletePost from './thunks/deletePost';
import addLike from './thunks/addLike';
import removeLike from './thunks/removeLike';
import hidePost from '../admin/hidePost';
import showPost from '../admin/showPost';
import deletePostAdmin from '../admin/deletePostAdmin';

export enum PostResetAction {
  CONTENT = 'content',
  FILE = 'file',
}

export interface PostValidationErrors {
  content?: string;
  file?: string;
}

export interface PostError {
  status: number;
  path: string;
  timestamp: number | null;
  message: string;
  validationErrors?: PostValidationErrors;
}

export interface FileData {
  filename: string;
  fileType: string;
}

export interface PostData {
  id: number;
  content: string;
  createdAt: string;
  isPublic: boolean;
  user: {
    id: number;
    accountName: string;
    username: string;
    avatar: null | string;
  };
  file: null | FileData;
  likes: Array<number>;
  comments: number;
}

export interface PostList {
  data: Array<PostData>;
  page: number;
  size: number;
  totalPages: number;
}

export interface PostsState {
  isLoading: boolean;
  message: string;
  status: number | null;
  error: PostError;
  list: PostList;
}

const plainValidationErrors = {
  content: '',
  file: '',
};

const plainError = {
  status: 0,
  path: '',
  timestamp: null,
  message: '',
  validationErrors: plainValidationErrors,
};

const initialState: PostsState = {
  isLoading: false,
  message: '',
  status: null,
  error: plainError,
  list: {
    data: [],
    page: 0,
    size: 10,
    totalPages: 0,
  },
};

const postsSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearValidationError(
      state,
      action: PayloadAction<{ field: PostResetAction }>
    ) {
      if (state.error.validationErrors) {
        state.error.validationErrors[action.payload.field] = '';
      }
    },

    resetValidationErrors(state) {
      state.message = '';
      state.status = null;
      state.error.validationErrors = plainValidationErrors;
    },

    incrementCommentCount(state, action: PayloadAction<{ postId: number }>) {
      const index = state.list.data.findIndex(
        (post) => post.id === action.payload.postId
      );
      if (index !== -1) {
        state.list.data[index].comments += 1;
      }
    },
    decrementCommentCount(state, action: PayloadAction<{ postId: number }>) {
      const index = state.list.data.findIndex(
        (post) => post.id === action.payload.postId
      );
      if (index !== -1) {
        state.list.data[index].comments -= 1;
      }
    },
  },
  extraReducers(builder) {
    //--------------------------   Create Post  -------------------------- \\
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      createPost.fulfilled,
      (state, { payload: { message, status, data } }) => {
        state.message = message;
        state.status = status;
        state.list.data.unshift(data);
        state.isLoading = false;
      }
    );
    builder.addCase(createPost.rejected, (state, { payload, error }) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
        state.error = payload;
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });
    //--------------------------   Get Post  -------------------------- \\
    builder.addCase(getPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, { payload }) => {
      state.message = 'Succes.';
      state.status = 200;
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getPosts.rejected, (state, { payload, error }) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
        state.error = { ...state.error, ...payload };
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });
    //--------------------------   Get User Post  -------------------------- \\
    builder.addCase(getUserPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserPosts.fulfilled, (state, { payload: { data } }) => {
      state.message = 'Succes.';
      state.status = 200;
      state.list.data = data;
      state.isLoading = false;
    });
    builder.addCase(getUserPosts.rejected, (state, { payload, error }) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
        state.error = { ...state.error, ...payload };
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });
    //--------------------------   Update Post  -------------------------- \\

    builder.addCase(
      updatePost.fulfilled,
      (state, { payload: { message, status, content } }) => {
        state.message = message;
        state.status = status;
        const index = state.list.data.findIndex(
          (post) => post.id === content.id
        );
        if (index !== -1) {
          state.list.data[index].content = content.content;
        }
      }
    );
    builder.addCase(updatePost.rejected, (state, { payload, error }) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
        state.error = { ...state.error, ...payload };
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
    });

    //--------------------------   Delete Post  -------------------------- \\
    builder.addCase(
      deletePost.fulfilled,
      (state, { payload: { message, status, content } }) => {
        state.message = message;
        state.status = status;
        state.list.data = state.list.data.filter(
          (post) => post.id !== content.id
        );
      }
    );
    builder.addCase(deletePost.rejected, (state, { payload, error }) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
        state.error = { ...state.error, ...payload };
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
    });
    //--------------------------   Add Like  -------------------------- \\

    builder.addCase(
      addLike.fulfilled,
      (state, { payload: { message, status, postId, userId } }) => {
        state.message = message;
        state.status = status;
        const index = state.list.data.findIndex((post) => post.id === postId);

        if (index !== -1) {
          state.list.data[index].likes.unshift(userId);
        }
      }
    );
    builder.addCase(addLike.rejected, (state, { payload, error }) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
        state.error = { ...state.error, ...payload };
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
    });
    //--------------------------   Remove Like  -------------------------- \\

    builder.addCase(
      removeLike.fulfilled,
      (state, { payload: { message, status, postId, userId } }) => {
        state.message = message;
        state.status = status;
        state.list.data;
        const index = state.list.data.findIndex((post) => post.id === postId);

        if (index !== -1) {
          state.list.data[index].likes = state.list.data[index].likes.filter(
            (id) => id !== userId
          );
        }
      }
    );
    builder.addCase(removeLike.rejected, (state, { payload, error }) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
        state.error = { ...state.error, ...payload };
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
    });

    //--------------------------   Hide Post  -------------------------- \\
    builder.addCase(hidePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      hidePost.fulfilled,
      (state, { payload: { message, status, postId } }) => {
        state.message = message;
        state.status = status;
        const index = state.list.data.findIndex((post) => post.id === postId);
        if (index !== -1) {
          state.list.data[index].isPublic = false;
        }

        state.isLoading = false;
      }
    );
    builder.addCase(hidePost.rejected, (state, { payload, error }) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
        state.error = { ...state.error, ...payload };
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });

    //--------------------------   Show Post  -------------------------- \\
    builder.addCase(showPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      showPost.fulfilled,
      (state, { payload: { message, status, postId } }) => {
        state.message = message;
        state.status = status;
        const index = state.list.data.findIndex((post) => post.id === postId);
        if (index !== -1) {
          state.list.data[index].isPublic = true;
        }

        state.isLoading = false;
      }
    );
    builder.addCase(showPost.rejected, (state, { payload, error }) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
        state.error = { ...state.error, ...payload };
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });
    //--------------------------   Delete Post - Admin  -------------------------- \\
    builder.addCase(deletePostAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      deletePostAdmin.fulfilled,
      (state, { payload: { message, status, postId } }) => {
        state.message = message;
        state.status = status;
        state.list.data = state.list.data.filter((post) => post.id !== postId);
        state.isLoading = false;
      }
    );
    builder.addCase(deletePostAdmin.rejected, (state, { payload, error }) => {
      if (payload) {
        state.status = payload.status;
        state.message = payload.message;
        state.error = { ...state.error, ...payload };
      } else {
        state.message = error.message || 'Unknown error occurred';
      }
      state.isLoading = false;
    });
  },
});

export const {
  resetValidationErrors,
  clearValidationError,
  incrementCommentCount,
  decrementCommentCount,
} = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
