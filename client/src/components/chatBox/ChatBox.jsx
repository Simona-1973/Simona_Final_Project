import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useFetchMessages,
  useSendMessage,
} from "../../hooks/useSendMessagesCreateNewChat.jsx";
import { UserContext } from "../../context/userContext.jsx";
import moment from "moment";
import { ChevronLeft, Send } from "lucide-react";
import { useSocketContext } from "../../context/socketContext.jsx";
import { Paperclip } from "lucide-react";
import { ArrowDownToLine } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Check } from "lucide-react";
import { X } from "lucide-react";
import axios from "../../config/axios.js";
import AlertMessageWarning from "../alerts/AlertMessageWarning.jsx";

export default function ChatBox({ connection, showChatBox, setShowChatBox }) {
  const fullName = `${connection.address.firstname} ${connection.address.lastname}`;
  const { socket } = useSocketContext();
  const { user } = useContext(UserContext);
  const [openMessages, setOpenMessages] = useState(false);
  const [openEditText, setOpenEditText] = useState(false);
  const { sendMessage, newMessage, setNewMessage, setUploadImage, showAlert } =
    useSendMessage(connection);
  const {
    messages,
    setMessages,
    uploadImage,
    setNotifications,
    notifications,
  } = useFetchMessages(connection);
  const messagesEndRef = useRef(null);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  // fetching message real-time from socket.io
  useEffect(() => {
    try {
      socket?.on("newMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
      return () => socket?.off("newMessage");
    } catch (error) {
      console.log(error);
    }
  }, [socket, newMessage, messages, setMessages, setNewMessage]);

  // Listen for message deletion and update event socket.io
  useEffect(() => {
    const handleDeleteMessage = (deletedMessageId) => {
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message?._id !== deletedMessageId)
      );
    };

    const handleUpdateMessage = (updatedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message._id === updatedMessage._id ? updatedMessage : message
        )
      );
    };

    socket?.on("messageDeleted", handleDeleteMessage);
    socket?.on("messageUpdate", handleUpdateMessage);

    return () => {
      socket?.off("messageDeleted", handleDeleteMessage);
      socket?.off("messageUpdate", handleUpdateMessage);
    };
  }, [socket, setMessages]);

  // useRef to scroll into the view
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Function to download the original file
  const downloadOriginalFile = (fileBlob, fileName) => {
    const blobUrl = URL.createObjectURL(fileBlob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    link.click();
  };

  // Function to handle click event on the arrow
  const handleArrowClick = (message) => {
    if (message.file) {
      const fileName = message.file.split("/").pop();
      fetch(message.file)
        .then((response) => response.blob())
        .then((fileBlob) => {
          downloadOriginalFile(fileBlob, fileName);
        })
        .catch((error) => {
          console.error("Error fetching file:", error);
        });
    } else {
      console.log("No file attached to this message.");
    }
  };

  // Function to handle drop-down menu
  const handleDropMenu = (messageId, openEditText) => {
    setOpenMessages({
      [messageId]: !openMessages[messageId],
    });
    setOpenEditText(!openEditText);
  };

  // function to handle the edit text-area

  const handleEditText = (messageId, openMessages) => {
    setOpenEditText({
      [messageId]: !openEditText[messageId],
    });
    setOpenMessages(!openMessages);
  };

  // update message

  const handleUpdateMessage = async (e, messageId) => {
    e.preventDefault();
    const updatedMessage = {
      message: e.target.updatedmessage.value,
    };

    try {
      const response = await axios.put(
        baseURL + `/messages/update/${messageId}`,
        updatedMessage
      );
      const newUpdatedMessage = response.data.message;
      if (response.status >= 200 && response.status < 300) {
        setMessages((prevMessages) => {
          return prevMessages.map((message) => {
            if (message._id === messageId) {
              return { ...message, message: newUpdatedMessage };
            } else {
              return message;
            }
          });
        });
      } else {
        console.error("Failed to update message");
      }
      setOpenEditText(!openEditText);
    } catch (error) {
      console.log(error);
    }
  };

  // delete message
  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await axios.delete(
        baseURL + `/messages/delete/${messageId}`
      );
      const deletedMessageId = response.data.message._id;
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message?._id !== deletedMessageId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // to navigate too the user s profile
  const handleNavigation = (connection) => {
    if (connection.role === "artist") {
      navigate(`/profile-artist/${connection._id}`);
    } else {
      navigate(`/ProfilePageEntrepreneur/${connection._id}`);
    }
  };


  return (
    <div className="flex flex-col h-[700px] w-full bg-white rounded-lg border border-b-8 border-r-8 border-black ">
      <nav className="w-full h-16 p-3 flex items-center z-50  font-bold shadow-xl">
        {showChatBox && (
          <ChevronLeft
            className="mr-2 cursor-pointer"
            onClick={() => setShowChatBox(false)}
          />
        )}
        <p
          onClick={() => handleNavigation(connection)}
          className="underline cursor-pointer"
        >
          {fullName}
        </p>
      </nav>
      {showAlert && <AlertMessageWarning text="Please type a message" />}
      {messages && messages.length > 0 ? (
        <div className="overflow-y-auto p-5">
          {messages.map((message, index) => {
            const messageClass =
              message.senderId === user?._id
                ? "sent-message"
                : "received-message";

            return (
              <div
                key={message._id}
                className={`chat ${messageClass} ${
                  messageClass === "sent-message" ? "chat-end" : "chat-start"
                } `}
              >
                <div className={`chat-bubble ${messageClass}`}>
                  <div className="flex justify-between gap-3">
                    <p className="message-text text-white">{message.message}</p>
                    <ChevronDown
                      className={`chat ${messageClass} ${
                        messageClass === "received-message" ? "hidden" : ""
                      } cursor-pointer`}
                      onClick={() => handleDropMenu(message._id, openEditText)}
                      color="white"
                    />
                    {openMessages[message._id] && (
                      <div className="  z-10 origin-top-right absolute right-0 mt-5 w-[120px] h-[52px] p-1 rounded-[10px] shadow-lg bg-white border-1 border border-black">
                        <p
                          className=" cursor-pointer text-black"
                          onClick={() =>
                            handleEditText(message._id, openMessages)
                          }
                        >
                          Edit
                        </p>

                        <p
                          onClick={() => handleDeleteMessage(message._id)}
                          className="cursor-pointer text-black"
                        >
                          Delete
                        </p>
                      </div>
                    )}
                  </div>
                  <span className="message-timestamp text-white">
                    {moment(message.createdAt).calendar()}
                  </span>
                  {message.file && (
                    <div className="chat-file relative">
                      <img
                        src={message.file}
                        alt="File"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "200px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                      <div id="download-link">
                        <ArrowDownToLine
                          className={`chat ${messageClass} ${
                            messageClass === "received-message"
                              ? "bg-cobaltBlue"
                              : "bg-retroRed"
                          } w-7 h-7 cursor-pointer absolute top-0 right-0 p-1`}
                          onClick={() => handleArrowClick(message)}
                          color="white"
                        />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef}></div>
                </div>
                {openEditText[message._id] && (
                  <div className="fixed inset-0 bg-black bg-opacity-35 z-50">
                    <form
                      onSubmit={(e) => handleUpdateMessage(e, message._id)}
                      className="absolute top-1/2 right-1/4 bg-white border border-black border-b-4 border-r-4 h-48 w-[60%] md:w-[40%] md:right-1/3  lg:w-[30%]"
                      style={{ backdropFilter: "blur(4px)" }}
                    >
                      <div className=" flex flex-col justify-between gap-28 ">
                        <div className=" flex justify-between bg-borderBlue p-1">
                          <p className=" text-white"> Edit message</p>
                          <X
                            className=" cursor-pointer"
                            onClick={() => handleEditText(message._id)}
                            color="white"
                          />
                        </div>
                        <div className="p-1 flex  gap-1 ">
                          <input
                            type="text"
                            name="updatedmessage"
                            defaultValue={message.message}
                            className=" p-1 w-full  border border-black text-black"
                          />
                          <button className=" bg-retroBlue p-1" type="submit">
                            <Check color="white" />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className=" h-screen flex justify-center items-center font-bold">
          <p>No messages available</p>
        </div>
      )}
      <footer className="flex items-center p-1 gap-3 xxs:justify-start xs:justify-center  ml-1 mt-auto mb-4 h-[70px]">
        <div
          className=" flex items-center gap-3"
          style={{ width: "70%", flexShrink: 0 }}
        >
          <input
            type="text"
            name="message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="realtive flex-grow text-black bg-white border border-black rounded-[10px] px-4 py-2"
            placeholder="Type your message..."
            color="white"
          />
          <label>
            <input
              type="file"
              className="hidden"
              value={uploadImage}
              onChange={(e) => setUploadImage(e.target.files[0])}
            />
            <Paperclip className=" cursor-pointer" />
          </label>
        <button
          onClick={() => sendMessage(connection._id)}
          className="bg-lightBlue text-white px-4 py-2 rounded"
        >
          <Send />
        </button>
        </div>

      </footer>
    </div>
  );
}
