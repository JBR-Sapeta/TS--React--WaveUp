/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import getUserLanguage from '@/utils/getUserLanguage';

export type LanguageType = 'EN' | 'PL';

export interface LanguageState {
  lang: LanguageType;
}

const lang = getUserLanguage();

const initialState: LanguageState = { lang };

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<'EN' | 'PL'>) {
      state.lang = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
