import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setLoading,
  setError,
  setUsers,
  setCurrentPage,
  setHasMore,
  moveToNextUser,
} from "../store/feedSlice";
import UserCard from "../components/Card";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Feed() {
  const dispatch = useDispatch();
  const { users, currentUser, isLoading, error } = useSelector(
    (state: RootState) => state.feed
  );

  const fetchFeed = async (page: number) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/feed`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch feed");
      }
      const data = await response.json();
      dispatch(setUsers(data.data));
      dispatch(setHasMore(false));
      dispatch(setCurrentPage(page));
    } catch (error) {
      dispatch(setError((error as Error).message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleInterested = async (userId: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/request/send/interested/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(moveToNextUser());
      toast.success("Connection request sent!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send connection request");
    }
  };

  const handleIgnore = async (userId: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/request/send/ignored/${userId}`,
        {},
        { withCredentials: true }
      );

      dispatch(moveToNextUser());
      toast.success("User ignored");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to ignore user");
    }
  };

  useEffect(() => {
    fetchFeed(1);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen pt-16 p-4">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 p-4 bg-base-200 mt-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Find Your CodeMate</h1>
          
          {/* <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-30 menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Filter by Skills</a></li>
              <li><a>Sort by Most Recent</a></li>
              <li><a>Reset Filters</a></li>
            </ul>
          </div> */}
        </div>
        
        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        ) : currentUser ? (
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <UserCard
                key={currentUser._id}
                user={currentUser}
                onInterested={() => handleInterested(currentUser._id)}
                onIgnore={() => handleIgnore(currentUser._id)}
              />
            </div>
          </div>
        ) : users.length > 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-base-100 rounded-lg shadow-xl p-8 text-center max-w-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-xl font-bold mt-4">All Caught Up!</h3>
              <p className="text-base-content/60 mt-2">
                You've gone through all potential CodeMates for now. Check back later for new matches!
              </p>
              <button className="btn btn-primary mt-4" onClick={() => fetchFeed(1)}>
                Refresh
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-base-100 rounded-lg shadow-xl p-8 text-center max-w-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold mt-4">No Matches Found</h3>
              <p className="text-base-content/60 mt-2">
                We couldn't find any potential CodeMates at the moment. Please check back later!
              </p>
              <button className="btn btn-primary mt-4" onClick={() => fetchFeed(1)}>
                Refresh
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}