import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionsSlice";
import requestReducer from "./requestsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
