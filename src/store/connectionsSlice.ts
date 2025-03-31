import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RequestUser {
  _id: string;
  firstName: string;
  lastName: string;
  skills: string[];
  bio: string;
  photoURL: string;
}

export interface ConnectionRequest {
  _id: string;
  fromUserId: RequestUser;
  toUserId: string;
  status: 'interested' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

interface ConnectionsState {
  connections: RequestUser[];
  requests: ConnectionRequest[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ConnectionsState = {
  connections: [],
  requests: [],
  isLoading: false,
  error: null,
};

const connectionsSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setConnections: (state, action: PayloadAction<RequestUser[]>) => {
      state.connections = action.payload;
    },
    setRequests: (state, action: PayloadAction<ConnectionRequest[]>) => {
      state.requests = action.payload;
    },
    updateRequestStatus: (
      state,
      action: PayloadAction<{ requestId: string; status: 'accepted' | 'rejected' }>
    ) => {
      const request = state.requests.find((r) => r._id === action.payload.requestId);
      if (request) {
        request.status = action.payload.status;
      }
    },
  },
});

export const { 
  setLoading, 
  setError, 
  setConnections, 
  setRequests,
  updateRequestStatus
} = connectionsSlice.actions;
export default connectionsSlice.reducer;