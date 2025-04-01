import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setLoading,
  setError,
  setConnections,
  appendConnections,
  setConnectionsPage,
  setConnectionsHasMore,
} from "../store/connectionsSlice";
import UserCard from "../components/UserCard";
import { VITE_API_URL } from "../utils/constants";
import { ConnectionUser } from "../store/types";

export default function Connections() {
  const dispatch = useDispatch();
  const { connections, isLoading, error, connectionsPage, connectionsHasMore } =
    useSelector((state: RootState) => state.connections);

  const adaptedConnections: ConnectionUser[] = connections.map((user) => ({
    _id: user._id,
    name: `${user.firstName} ${user.lastName}`,
    email: "",
    profilePicture: user.photoURL,
    bio: user.bio,
    skills: user.skills,
  }));

  const fetchConnections = async (page: number) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(
        `${VITE_API_URL}/user/connections?page=${page}&limit=9`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch connections");
      }

      const data = await response.json();

      if (page === 1) {
        dispatch(setConnections(data.data));
      } else {
        dispatch(appendConnections(data.data));
      }

      dispatch(setConnectionsHasMore(data.data.length === 9));
      dispatch(setConnectionsPage(page));
    } catch (error) {
      dispatch(setError((error as Error).message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLoadMore = () => {
    if (!isLoading && connectionsHasMore) {
      fetchConnections(connectionsPage + 1);
    }
  };

  useEffect(() => {
    fetchConnections(1);
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
        <h1 className="text-3xl font-bold mb-8">Your Connections</h1>

        {connections.length === 0 && !isLoading ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No Connections Yet</h2>
            <p className="text-base-content/70">
              Start connecting with other developers to build your network!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adaptedConnections.map((user) => (
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

        {isLoading && (
          <div className="flex justify-center my-12">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        )}

        {!isLoading && connectionsHasMore && connections.length > 0 && (
          <div className="text-center mt-8">
            <button className="btn btn-primary" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
