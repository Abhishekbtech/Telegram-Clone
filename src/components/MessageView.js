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

    const isToday = (someDate) => {
        const today = new Date();
        return someDate.getDate() === today.getDate() &&
               someDate.getMonth() === today.getMonth() &&
               someDate.getFullYear() === today.getFullYear();
    };

    const formatTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString([], { day: '2-digit', month: 'long' });
    };

    return (
        <div className="h-full flex flex-col">
            <div className="bg-gray-100 p-4 flex justify-between items-center">
                <h2 className="text-lg">{name}</h2>
            </div>
            <div className="flex flex-col overflow-y-auto h-full p-4">
                {messages.reduce((acc, message, index) => {
                    const date = new Date(message.created_at);
                    const prevDate = index > 0 ? new Date(messages[index - 1].created_at) : null;

                    if (index === 0 || date.toDateString() !== prevDate?.toDateString()) {
                        acc.push(
                            <div key={`date-${message.id}`} className="text-center my-2 text-gray-500">
                                {formatDate(message.created_at)}
                            </div>
                        );
                    }

                    acc.push(
                        <div key={message.id} className="mb-2">
                            <div className="bg-blue-100 p-2 rounded">
                                <div>{message.message}</div>
                                <div className="text-xs text-gray-500">{formatTime(message.created_at)}</div>
                            </div>
                        </div>
                    );
                    return acc;
                }, [])}
            </div>
        </div>
    );
};

export default MessageView;
