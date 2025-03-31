import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setLoading,
  setError,
  setRequests,
} from "../store/connectionsSlice";
import RequestCard from "../components/RequestCard";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Requests() {
  const dispatch = useDispatch();
  const { requests, isLoading, error } = useSelector(
    (state: RootState) => state.connections
  );

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/requests/received`,
          { withCredentials: true }
        );

        if (!response.data.success) {
          throw new Error("Failed to fetch requests");
        }

        dispatch(setRequests(response.data.data));
      } catch (error: any) {
        dispatch(
          setError(error.response?.data?.message || "Failed to fetch requests")
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchRequests();
  }, [dispatch]);

  const handleAccept = async (requestId: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/request/review/accepted/${requestId}`,
        {},
        { withCredentials: true }
      );

      // Remove the request from the list immediately
      dispatch(setRequests(requests.filter(request => request._id !== requestId)));
      toast.success("Connection request accepted!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to accept request");
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/request/review/rejected/${requestId}`,
        {},
        { withCredentials: true }
      );

      // Remove the request from the list immediately
      dispatch(setRequests(requests.filter(request => request._id !== requestId)));
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
      </div>
    </div>
  );
}
