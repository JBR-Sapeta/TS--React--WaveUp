import { configureStore } from '@reduxjs/toolkit';
import { languageReducer } from './lang';
import { authenticationReducer } from './auth';
import { usersReducer } from './users';
import { postsReducer } from './posts';
import { commentsReducer } from './comments';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export interface BaseErrorResponse {
  status: number;
  path: string;
  timestamp: number;
  message: string;
}

const store = configureStore({
  reducer: {
    lang: languageReducer,
    auth: authenticationReducer,
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
