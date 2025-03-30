import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FeedUser {
  _id: string;
  firstName: string;
  lastName: string;
  skills: string[];
  bio: string;
  photoURL: string;
}

interface FeedState {
  users: FeedUser[];
  currentPage: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  users: [],
  currentPage: 1,
  hasMore: true,
  isLoading: false,
  error: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUsers: (state, action: PayloadAction<FeedUser[]>) => {
      state.users = action.payload;
    },
    appendUsers: (state, action: PayloadAction<FeedUser[]>) => {
      state.users = [...state.users, ...action.payload];
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setUsers,
  appendUsers,
  setCurrentPage,
  setHasMore,
} = feedSlice.actions;
export default feedSlice.reducer; 