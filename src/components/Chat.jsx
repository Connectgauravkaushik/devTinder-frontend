import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const ChatComp = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const user = useSelector((store) => store?.user);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    // As soon the page is loaded , the socket connection is made and JOIN CHAT IS EMITTED
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on('messageReceived' , ({firstName , text}) => {
        setMessages((messages) =>[...messages , {firstName , text}]); // get the previous message and append in it
    });

    return () => {
      socket.disconnect(); //  when the component unmounts it will offloads and close the connection
    };
  }, [userId, targetUserId]);


//send Message Handler
  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessages,
    });
    setNewMessages("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-500 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-500 text-3xl font-bold">Chat</h1>
      <div className="flex-1 overflow-y-scroll p-5">
        {/*display messages */}
        {messages?.map((msg, index) => {
          return (
            <div key={index} className="chat chat-start">
              <div className="chat-header">
               {msg.firstName}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>

      {/* input box and send input box */}
      <div className="p-5 border border-gray-500 flex items-center gap-2">
        <input
          value={newMessages}
          onChange={(e) => setNewMessages(e.target.value)}
          type="text"
          className=" flex-1 border border-gray-500 text-white rounded p-2"
        />
        <button className="btn btn-accent" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComp;
