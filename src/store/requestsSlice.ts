import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Request {
  _id: string;
  fromUser: {
    _id: string;
    firstName: string;
    lastName: string;
    skills: string[];
    bio: string;
    photoURL: string;
  };
  toUserId: string;
  createdAt: string;
  updatedAt: string;
  status: "interested" | "ignored" | "accepted" | "rejected";
}

interface RequestsState {
  requests: Request[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RequestsState = {
  requests: [],
  isLoading: false,
  error: null,
};

const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setRequests: (state, action: PayloadAction<Request[]>) => {
      state.requests = action.payload;
    },
    updateRequestStatus: (
      state,
      action: PayloadAction<{ requestId: string; status: "accepted" | "rejected" }>
    ) => {
      const requestIndex = state.requests.findIndex((req) => req._id === action.payload.requestId);
      if (requestIndex !== -1) {
        state.requests[requestIndex].status = action.payload.status;
      }
    },
  },
});

export const { setLoading, setError, setRequests, updateRequestStatus } = requestSlice.actions;
export default requestSlice.reducer;
