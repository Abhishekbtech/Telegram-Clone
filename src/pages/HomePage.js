import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatList from '../components/ChatList';
import MessageView from '../components/MessageView';
import Header from '../components/Header';
import MessageInput from '../components/MessageInput';

const HomePage = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleSendMessage = (message) => {
    // Implement sending message logic
    console.log('Send message:', message);
  };

  const handleBackToChats = () => {
    setSelectedChatId(null); // Reset selected chat when going back to chat list
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <div className={`w-full md:w-1/3 border-r border-gray-200 ${selectedChatId ? 'hidden md:block' : ''}`}>
          <ChatList onSelectChat={setSelectedChatId} />
        </div>
        <div className={`w-full md:w-2/3 flex flex-col ${selectedChatId ? 'block' : 'hidden'}`}>
          {selectedChatId && (
            <>
              <div className="flex items-center bg-blue-500 text-white p-4">
                <button
                  onClick={handleBackToChats}
                  className="text-sm bg-white text-blue-500 px-2 py-1 rounded mr-4"
                >
                  Back to Chats
                </button>
                <h2 className="text-xl font-bold">Chat</h2>
              </div>
              <MessageView chatId={selectedChatId} />
              <MessageInput onSendMessage={handleSendMessage} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
