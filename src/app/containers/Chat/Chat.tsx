// import Stepper from "containers/Stepper/Stepper";
import React, { useState, useEffect } from "react";
// import { getOrderStatusApi } from "../../services/apiServices";
// import io from "socket.io-client";
import config from '../../../config/config.json'

// const socket = io(config.SERVER_URL);
const socket = require("socket.io-client")(config.SOCKET_URL, {
  rejectUnauthorized: true 
});

const Chat = () => {
  //Chat
  const [message, setMessage] = useState("");
  const [messageArr, setMessageArray] = useState<any>([]);

  const joinRoom = () => {
    // if (room !== "") {
    socket.emit("join_room", 6); //room = 6
    // }
  };

  const sendMessage = () => {
    if(message){        
        socket.emit("send_message", { message, room: 6 }); 
        setMessageArray((s: any) => {
            return [...s, { sender: "Me", message: message }];
        });
        setMessage("")
    }
  };

  useEffect(() => {
    joinRoom();
  }, []);

const messageListener = () => {
    const eventListener = (data: any) => {
        setMessageArray((list: any) => {
          return[
            ...list,
            {sender: "Admin", message: data.message}
          ]
        });
      };
      socket.on("receive_message", eventListener);
  
      return () => socket.off("receive_message", eventListener);
}


  useEffect(() => {
    messageListener()
  }, [socket]);

  return (
    <>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto rounded-2xl dark:bg-gray-800 bg-gray-100 shadow-2xl">
        <div className="flex md:flex-col flex-row justify-start space-y-3  items-center ">
          <div className="px-4 py-6">
            <h3 className="mb-6">Chat</h3>
            <hr className="mb-4" />
            <div className="flex md:flex-col flex-row justify-start space-y-3  items-center ">
              {messageArr &&
                messageArr.map((item: any) => {
                  return [
                    <div className="message-card mb-1">
                      <span className="bg-gray-200 text-gray-800 dark:text-gray-100 dark:bg-gray-500  rounded-lg px-3 py-1  float-right">
                        {item.message}
                      </span>
                    </div>,
                  ];
                })}
            </div>
            <br />
            <hr className="mb-4" />
            <div className="flex flex-row mt-3 mb-3">
              <div className="basis-11/12">
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="Type a message..."
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
              </div>
              <div className="basis-1/12 text-center">
                <button className="bg-gray-400 dark:bg-white/5 p-2 px-5 rounded-2xl ml-2" onClick={sendMessage} >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
