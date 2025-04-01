import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import { VITE_API_URL } from "../utils/constants";


const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState<{sendingUser: string, text: string, userId: string, targetUserId: string, receivingUser: string}[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState<{ firstName: string; lastName: string } | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const userId = user?._id;
  
  useEffect(() => {
    if (!userId || !targetUserId) {
      console.log("Missing userId or targetUserId, not connecting socket", { userId, targetUserId });
      return;
    }

    const getTargetUserData = async () => {
      const targetUser = await axios.get(`${VITE_API_URL}/profile/${targetUserId}`);
      const { firstName, lastName } = targetUser.data;
      console.log("Target user data:", { firstName, lastName });
      setTargetUser({ firstName, lastName });
    };

    getTargetUserData();

    const socket = createSocketConnection();
    const sendingUser = user?.firstName + " " + user?.lastName;
    const receivingUser = targetUser?.firstName + " " + targetUser?.lastName;
    console.log("Setting up socket connection with user: ", sendingUser, " and targetUser:", receivingUser);
    socket.emit("joinChat", { sendingUser, userId, targetUserId, receivingUser });

    socket.on("receiveMessage", ({sendingUser,
      text,
      userId,
      targetUserId,
      receivingUser}) => {
      setMessages((prev: {sendingUser: string, text: string, userId: string, targetUserId: string, receivingUser: string}[]) => [...prev, {sendingUser, text, userId, targetUserId, receivingUser}]);
    });

    return () => {
      console.log("Cleaning up socket connection");
      if (socket) {
        socket.disconnect();
      }
    };
  }, [userId, targetUserId]);

  const sendMessage = () =>{
    if (!user) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {sendingUser: user.firstName + " " + user.lastName, text: newMessage, userId, targetUserId });
  }

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col mt-20">
      <h1 className="p-5 border-b border-gray-600">Chat with {targetUser?.firstName + " " + targetUser?.lastName}</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-base-content/70">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg: { sendingUser: string; text: string; userId: string; targetUserId: string; receivingUser: string }, index) => {
            return (
              <div
                key={index}
                className={
                  "chat " + (msg.sendingUser === user?.firstName + " " + user?.lastName ? "chat-end" : "chat-start")
                }
              >
                <div className="chat-header">
                  {`${msg.sendingUser === user?.firstName + " " + user?.lastName ? "You" : msg.sendingUser}`}
                  <time className="text-xs opacity-50"> just now</time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">Sent</div>
              </div>
            );
          })
        )}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
          placeholder="Type your message..."
        ></input>
        <button onClick={() => {sendMessage()}} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;