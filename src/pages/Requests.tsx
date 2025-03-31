import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setLoading,
  setError,
  setRequests,
  appendRequests,
  setRequestsPage,
  setRequestsHasMore,
} from "../store/connectionsSlice";
import RequestCard from "../components/RequestCard";
import { toast } from "react-hot-toast";
import axios from "axios";
import { VITE_API_URL } from "../utils/constants";

export default function Requests() {
  const dispatch = useDispatch();
  const { requests, isLoading, error, requestsPage, requestsHasMore } =
    useSelector((state: RootState) => state.connections);

  const fetchRequests = async (page: number) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${VITE_API_URL}/user/requests/received?page=${page}&limit=9`,
        { withCredentials: true }
      );

      if (!response.data.success) {
        throw new Error("Failed to fetch requests");
      }

      if (page === 1) {
        dispatch(setRequests(response.data.data));
      } else {
        dispatch(appendRequests(response.data.data));
      }

      // Check if there are more requests to load
      dispatch(setRequestsHasMore(response.data.data.length === 9));
      dispatch(setRequestsPage(page));
    } catch (error: any) {
      dispatch(
        setError(error.response?.data?.message || "Failed to fetch requests")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLoadMore = () => {
    if (!isLoading && requestsHasMore) {
      fetchRequests(requestsPage + 1);
    }
  };

  useEffect(() => {
    fetchRequests(1);
  }, [dispatch]);

  const handleAccept = async (requestId: string) => {
    try {
      await axios.post(
        `${VITE_API_URL}/request/review/accepted/${requestId}`,
        {},
        { withCredentials: true }
      );

      // Remove the request from the list immediately
      dispatch(
        setRequests(requests.filter((request) => request._id !== requestId))
      );
      toast.success("Connection request accepted!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to accept request");
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await axios.post(
        `${VITE_API_URL}/request/review/rejected/${requestId}`,
        {},
        { withCredentials: true }
      );

      // Remove the request from the list immediately
      dispatch(
        setRequests(requests.filter((request) => request._id !== requestId))
      );
      toast.success("Connection request rejected");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reject request");
    }
  };

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

        {requests.length === 0 && !isLoading ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No Pending Requests</h2>
            <p className="text-base-content/70">
              You don't have any pending connection requests at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <RequestCard
                key={request._id}
                user={request.fromUserId}
                onAccept={() => handleAccept(request._id)}
                onReject={() => handleReject(request._id)}
              />
            ))}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center my-12">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        )}

        {!isLoading && requestsHasMore && requests.length > 0 && (
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
