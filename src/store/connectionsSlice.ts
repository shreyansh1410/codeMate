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
  connectionsPage: number;
  connectionsHasMore: boolean;
  requestsPage: number;
  requestsHasMore: boolean;
}

const initialState: ConnectionsState = {
  connections: [],
  requests: [],
  isLoading: false,
  error: null,
  connectionsPage: 1,
  connectionsHasMore: true,
  requestsPage: 1,
  requestsHasMore: true,
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
    appendConnections: (state, action: PayloadAction<RequestUser[]>) => {
      state.connections = [...state.connections, ...action.payload];
    },
    setRequests: (state, action: PayloadAction<ConnectionRequest[]>) => {
      state.requests = action.payload;
    },
    appendRequests: (state, action: PayloadAction<ConnectionRequest[]>) => {
      state.requests = [...state.requests, ...action.payload];
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
    setConnectionsPage: (state, action: PayloadAction<number>) => {
      state.connectionsPage = action.payload;
    },
    setConnectionsHasMore: (state, action: PayloadAction<boolean>) => {
      state.connectionsHasMore = action.payload;
    },
    setRequestsPage: (state, action: PayloadAction<number>) => {
      state.requestsPage = action.payload;
    },
    setRequestsHasMore: (state, action: PayloadAction<boolean>) => {
      state.requestsHasMore = action.payload;
    },
  },
});

export const { 
  setLoading, 
  setError, 
  setConnections,
  appendConnections,
  setRequests,
  appendRequests,
  updateRequestStatus,
  setConnectionsPage,
  setConnectionsHasMore,
  setRequestsPage,
  setRequestsHasMore
} = connectionsSlice.actions;
export default connectionsSlice.reducer;