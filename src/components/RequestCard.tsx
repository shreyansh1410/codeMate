interface RequestUser {
  _id: string;
  firstName: string;
  lastName: string;
  skills: string[];
  bio: string;
  photoURL: string;
}

interface RequestCardProps {
  user: RequestUser;
  onAccept: () => void;
  onReject: () => void;
}

export default function RequestCard({ user, onAccept, onReject }: RequestCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden h-96 relative group">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70 z-10"></div>
      
      <div className="h-full w-full">
        <img
          src={user.photoURL || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&size=400&background=random`}
          alt={`${user.firstName} ${user.lastName}`}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-wide">
              {user.firstName} {user.lastName}
            </h2>
            {user.bio && <p className="mt-1 line-clamp-2 text-sm">{user.bio}</p>}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2 mb-2">
          {user.skills?.slice(0, 3).map((skill, index) => (
            <span key={`${user._id}-${skill}-${index}`} className="badge badge-sm badge-primary">
              {skill}
            </span>
          ))}
          {user.skills?.length > 3 && (
            <span className="badge badge-sm badge-ghost">+{user.skills.length - 3}</span>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6 p-4 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30 bg-gradient-to-t from-black/80 to-transparent pb-8 pt-12">
        <button
          className="btn btn-circle btn-error btn-lg shadow-lg"
          onClick={onReject}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button
          className="btn btn-circle btn-success btn-lg shadow-lg"
          onClick={onAccept}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
