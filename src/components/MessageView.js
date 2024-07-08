import React, { useEffect, useState } from 'react';
import { fetchMessages } from '../api';

const MessageView = ({ chatId, name }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getMessages = async () => {
            if (chatId) {
                const messageList = await fetchMessages(chatId);
                setMessages(messageList.data);
            }
        };

        getMessages();
    }, [chatId]);

    const formatTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="h-full flex flex-col">
            <div className="bg-gray-100 p-4 flex justify-between items-center">
                <h2 className="text-lg">{name}</h2>
            </div>
            <div className="flex flex-col-reverse overflow-y-auto h-full p-4">
                {messages.map((message) => (
                    <div key={message.id} className="mb-2">
                        <div className="bg-blue-100 p-2 rounded">
                            <div>{message.message}</div>
                            <div className="text-xs text-gray-500">{formatTime(message.created_at)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessageView;
