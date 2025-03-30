import React from 'react';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  bio: string;
  photoURL: string;
  skills: string[];
  age?: number;
  gender?: string;
}

interface UserCardProps {
  user: User;
  onInterested: (userId: string) => void;
  onIgnore: (userId: string) => void;
  showActions?: boolean; // New prop to control action buttons visibility
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onInterested, 
  onIgnore, 
  showActions = true // Default to true to maintain backward compatibility
}) => {
  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden h-96 relative group">
      {/* Main image that takes up most of the card */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70 z-10"></div>
      
      <div className="h-full w-full">
        <img
          src={user.photoURL || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&size=400&background=random`}
          alt={`${user.firstName} ${user.lastName}`}
          className="h-full w-full object-cover"
        />
      </div>
      
      {/* User info overlaid on the bottom of the image */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-wide">
              {user.firstName} {user.lastName}
              {user.age && <span className="ml-2">{user.age}</span>}
            </h2>
            
            {(user.gender || user.bio) && (
              <div className="mt-1 text-white/90">
                {user.gender && (
                  <span className="mr-2 text-sm">{user.gender}</span>
                )}
                {user.bio && (
                  <p className="mt-1 line-clamp-2 text-sm">{user.bio}</p>
                )}
              </div>
            )}
          </div>
          
          <div className="flex gap-1 items-center">
            <span className="badge badge-sm">
              {user.skills.length} {user.skills.length === 1 ? 'skill' : 'skills'}
            </span>
          </div>
        </div>
        
        {/* Skills section */}
        <div className="flex flex-wrap gap-1 mt-2 mb-2">
          {user.skills.slice(0, 3).map((skill, index) => (
            <span
              key={`${user._id}-${skill}-${index}`}
              className="badge badge-sm badge-primary"
            >
              {skill}
            </span>
          ))}
          {user.skills.length > 3 && (
            <span className="badge badge-sm badge-ghost">+{user.skills.length - 3}</span>
          )}
        </div>
      </div>
      
      {/* Action buttons - only show if showActions is true */}
      {showActions && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6 p-4 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30 bg-gradient-to-t from-black/80 to-transparent pb-8 pt-12">
          <button
            className="btn btn-circle btn-error btn-lg shadow-lg"
            onClick={() => onIgnore(user._id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            className="btn btn-circle btn-primary btn-lg shadow-lg"
            onClick={() => onInterested(user._id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Skills tooltip on hover */}
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-circle btn-sm btn-ghost bg-black/30 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div tabIndex={0} className="dropdown-content z-30 card card-compact w-64 p-2 shadow bg-base-100 text-base-content">
            <div className="card-body">
              <h3 className="card-title text-sm">Skills</h3>
              <div className="flex flex-wrap gap-1">
                {user.skills.map((skill, index) => (
                  <span
                    key={`full-${user._id}-${skill}-${index}`}
                    className="badge badge-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;