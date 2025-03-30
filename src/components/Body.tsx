import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "../store/authSlice";
import type { RootState } from "../store/store";
import { getProfile } from "../api/auth";

export default function Body() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const [isInitialAuthCheckComplete, setIsInitialAuthCheckComplete] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        try {
          dispatch(setLoading(true));
          const response = await getProfile();
          if (response.user) {
            dispatch(setUser(response.user));
          }
        } catch (error) {
          // If the profile fetch fails, it means the user is not authenticated
          // We don't need to do anything here as the user will be redirected to login
        } finally {
          dispatch(setLoading(false));
        }
      }
      setIsInitialAuthCheckComplete(true);
    };

    checkAuth();
  }, [dispatch, user]);

  if (!isInitialAuthCheckComplete) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <main>
        <Outlet />
      </main>
    </div>
  );
} 