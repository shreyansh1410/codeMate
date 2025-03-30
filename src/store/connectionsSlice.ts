import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConnectionUser {
  _id: string;
  firstName: string;
  lastName: string;
  skills: string[];
  bio: string;
  photoURL: string;
}

interface ConnectionsState {
  connections: ConnectionUser[];
  requests: ConnectionUser[];
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
    setConnections: (state, action: PayloadAction<ConnectionUser[]>) => {
      state.connections = action.payload;
    },
    setRequests: (state, action: PayloadAction<ConnectionUser[]>) => {
      state.requests = action.payload;
    },
  },
});

export const { setLoading, setError, setConnections, setRequests } =
  connectionsSlice.actions;
export default connectionsSlice.reducer; 