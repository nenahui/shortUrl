import type { RootState } from '@/app/store';
import { axiosApi } from '@/axiosApi';
import type { IShort, IShortMutation } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const shortUrl = createAsyncThunk<string, IShortMutation, { state: RootState }>(
  'home/short',
  async (values, { rejectWithValue }) => {
    try {
      const { data: short } = await axiosApi.post<IShort>('/short', values);

      return short.shortUrl;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);
