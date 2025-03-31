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
  currentUser: FeedUser | null;
  currentPage: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  users: [],
  currentUser: null,
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
      // Set the first user as current user if available
      state.currentUser = action.payload.length > 0 ? action.payload[0] : null;
    },
    appendUsers: (state, action: PayloadAction<FeedUser[]>) => {
      state.users = [...state.users, ...action.payload];
      // Set the first user as current user if there was no current user
      if (!state.currentUser && action.payload.length > 0) {
        state.currentUser = action.payload[0];
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<FeedUser | null>) => {
      state.currentUser = action.payload;
    },
    moveToNextUser: (state) => {
      if (state.users.length > 0) {
        const currentIndex = state.currentUser 
          ? state.users.findIndex(user => user._id === state.currentUser?._id)
          : -1;
        
        // If there's a next user, set it as current
        if (currentIndex < state.users.length - 1) {
          state.currentUser = state.users[currentIndex + 1];
        } else {
          // No more users
          state.currentUser = null;
        }
      }
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
  setCurrentUser,
  moveToNextUser,
} = feedSlice.actions;
export default feedSlice.reducer;