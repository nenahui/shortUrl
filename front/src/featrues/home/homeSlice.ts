import { shortUrl } from '@/featrues/home/homeThunks';
import { createSlice } from '@reduxjs/toolkit';

export interface HomeState {
  shortenedUrl: string | null;
  isLoading: boolean;
}

const initialState: HomeState = {
  shortenedUrl: null,
  isLoading: false,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(shortUrl.pending, (state) => {
        state.shortenedUrl = '';
        state.isLoading = true;
      })
      .addCase(shortUrl.fulfilled, (state, { payload: apiShortenedUrl }) => {
        state.shortenedUrl = apiShortenedUrl;
        state.isLoading = false;
      })
      .addCase(shortUrl.rejected, (state) => {
        state.isLoading = false;
      });
  },
  selectors: {
    selectShortenedUrl: (state) => state.shortenedUrl,
    selectShotLoading: (state) => state.isLoading,
  },
});

export const { selectShortenedUrl, selectShotLoading } = homeSlice.selectors;
