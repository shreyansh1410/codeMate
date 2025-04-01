import { ConnectionUser } from "../store/types";
import { useNavigate } from "react-router-dom";

interface UserCardProps {
  user: ConnectionUser;
  onInterested: () => void;
  onIgnore: () => void;
  showActions?: boolean;
}

export default function UserCard({ user, onInterested, onIgnore, showActions = true }: UserCardProps) {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate(`/chat/${user._id}`);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center space-x-4">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img src={user.profilePicture || "https://via.placeholder.com/150"} alt={user.name} />
            </div>
          </div>
          <div>
            <h2 className="card-title">{user.name}</h2>
            <p className="text-base-content/70">{user.email}</p>
            {user.bio && <p className="mt-2 text-sm">{user.bio}</p>}
            <div className="flex gap-2 mt-2">
              {user.age && <span className="badge badge-primary">{user.age} years</span>}
              {user.gender && <span className="badge badge-secondary">{user.gender}</span>}
            </div>
            {user.skills && user.skills.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {user.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="badge badge-sm badge-accent">
                    {skill}
                  </span>
                ))}
                {user.skills.length > 3 && (
                  <span className="badge badge-sm badge-ghost">
                    +{user.skills.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-info btn-sm" onClick={handleChatClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Chat
          </button>
          {showActions && (
            <>
              <button className="btn btn-error btn-sm" onClick={onIgnore}>
                Ignore
              </button>
              <button className="btn btn-primary btn-sm" onClick={onInterested}>
                Interested
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}