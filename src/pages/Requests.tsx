import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setLoading, setError, setRequests } from "../store/connectionsSlice";
import UserCard from "../components/Card";

export default function Requests() {
  const dispatch = useDispatch();
  const { requests, isLoading, error } = useSelector(
    (state: RootState) => state.connections
  );

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        dispatch(setLoading(true));
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/requests/received`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await response.json();
        dispatch(setRequests(data.data));
      } catch (error) {
        dispatch(setError((error as Error).message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchRequests();
  }, [dispatch]);

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
    <div className="min-h-screen bg-base-200 p-8 mt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Connection Requests</h1>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No Pending Requests</h2>
            <p className="text-base-content/70">
              You don't have any pending connection requests at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                showActions={false}
                onInterested={() => {}}
                onIgnore={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 