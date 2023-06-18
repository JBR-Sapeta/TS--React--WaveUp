import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';

import { PostError, FileData, RootState } from '@/store/types';

export interface CreatePostInputData {
  content: string;
  file: File | null;
}

export interface CreatePostOutputData {
  message: string;
  status: number;
  data: {
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
  };
}

export interface CreatedFileData extends FileData {
  id: number;
}

export interface CreatedPostData {
  message: string;
  content: {
    id: number;
    content: string;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
    userId: number;
    file: number;
  };
}

const createPost = createAsyncThunk<
  CreatePostOutputData,
  CreatePostInputData,
  { rejectValue: PostError; state: RootState }
>(
  'posts/create',
  async (data: CreatePostInputData, { rejectWithValue, getState }) => {
    const {
      token,
      accountName,
      username,
      avatar,
      id: userId,
    } = getState().auth.data;
    const { lang } = getState().lang;
    let fileResponse;
    if (data.file) {
      try {
        fileResponse = await axios.post<CreatedFileData>(
          `${import.meta.env.VITE_REACT_API_URL}/files/posts`,
          {
            file: data.file,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept-Language': lang,
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        let error: AxiosError<PostError> = err as any;
        if (!error.response) {
          throw err;
        }

        let validationErrors: undefined | object = undefined;
        if (error.response.status == 400) {
          validationErrors = { file: error.response.data.message };
        }
        return rejectWithValue({ ...error.response.data, validationErrors });
      }
    }

    let postResponse;
    try {
      postResponse = await axios.post<CreatedPostData>(
        `${import.meta.env.VITE_REACT_API_URL}/posts`,
        {
          content: data.content,
          file: fileResponse?.data.id || null,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': lang,
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      let error: AxiosError<PostError> = err as any;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }

    const { status } = postResponse;
    const { content, message } = postResponse.data;
    const file = fileResponse
      ? {
          filename: fileResponse.data.filename,
          fileType: fileResponse.data.fileType,
        }
      : null;

    return {
      message,
      status,
      data: {
        id: content.id,
        content: content.content,
        createdAt: content.createdAt,
        isPublic: content.isPublic,
        user: {
          id: userId,
          accountName: accountName,
          username: username,
          avatar: avatar,
        },
        file: file,
        likes: [],
        comments: 0,
      },
    };
  }
);

export default createPost;
