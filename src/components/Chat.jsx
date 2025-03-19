import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const ChatComp = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const user = useSelector((store) => store?.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
     const chat = await axios.get(BASE_URL+'/chat/'+targetUserId , {withCredentials:true});

     const chatMessages = chat?.data?.messages.map((msg) => {
      const {senderId , text} = msg;
      return {
        firstName:senderId?.firstName,
        lastName:senderId?.lastName,
        text
      }
     });
   
     setMessages(chatMessages);
  }

  useEffect(()=> {
    fetchChatMessages();
  } , [])

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    // As soon the page is loaded , the socket connection is made and JOIN CHAT IS EMITTED
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on('messageReceived' , ({firstName , lastName , text}) => {
        setMessages((messages) =>[...messages , {firstName , lastName ,text}]); // get the previous message and append in it
    });

    return () => {
      socket.disconnect(); //  when the component unmounts it will offloads and close the connection
    };
  }, [userId, targetUserId]);


//send Message Handler
  const sendMessage = () => {
    console.log()
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      targetUserId,
      text: newMessages,
    });
    console.log(newMessages);
    setNewMessages("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-500 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-500 text-3xl font-bold">Chat</h1>
      <div className="flex-1 overflow-y-scroll p-5">
        {/*display messages */}
        {messages?.map((msg, index) => {
          return (
            <div key={index} className={
            user.firstName === msg.firstName ? "chat chat-end" : "chat chat-start"}>
              <div className="chat-header">
               {`${msg.firstName} ${msg.lastName}`}
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
