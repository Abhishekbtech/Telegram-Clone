import React, { useEffect, useState } from 'react';
import { fetchChats } from '../api';

const ChatList = ({ onSelectChat }) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const getChats = async () => {
            const chatList = await fetchChats();
            setChats(chatList.data);
        };

        getChats();
    }, []);

    return (
        <div className="overflow-y-auto h-full">
            {chats.map((chat) => (
                <div key={chat.id} className="border-b border-gray-200">
                    <div
                        className="p-4 hover:bg-gray-100 cursor-pointer"
                        onClick={() => onSelectChat(chat.id, chat.creator.name)}
                    >
                        <div className="font-semibold">{chat.creator.name}</div>
                        <div className="text-sm text-gray-600">Total Message {chat.msg_count}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatList;