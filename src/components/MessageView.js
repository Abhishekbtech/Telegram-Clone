import React, { useEffect, useState } from 'react';
import { fetchMessages } from '../api';

const MessageView = ({ chatId, name }) => {
    const [messages, setMessages] = useState([]);
    const [currentDate, setCurrentDate] = useState('');

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

    const handleScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        const elements = document.getElementsByClassName('message-item');
        let currentDate = '';

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const rect = element.getBoundingClientRect();
            if (rect.top > 0 && rect.top < window.innerHeight / 2) {
                currentDate = element.getAttribute('data-date');
                break;
            }
        }

        setCurrentDate(currentDate);
    };

    return (
        <div className="h-full flex flex-col">
            {/* <div className="bg-gray-100 p-4 flex justify-between items-center">
                <h2 className="text-lg">{name}</h2>
            </div> */}
            <div className="relative flex flex-col overflow-y-auto h-full p-4" onScroll={handleScroll}>
                {currentDate && (
                    <div className="sticky top-0 mx-auto bg-white px-4 py-1 rounded text-center text-gray-500 shadow">
                        {currentDate}
                    </div>
                )}
                {messages.reduce((acc, message, index) => {
                    const date = new Date(message.created_at);
                    const prevDate = index > 0 ? new Date(messages[index - 1].created_at) : null;
                    const messageDate = formatDate(message.created_at);

                    if (index === 0 || date.toDateString() !== prevDate?.toDateString()) {
                        acc.push(
                            <div key={`date-${message.id}`} className="text-center my-2 text-gray-500">
                                <div className="inline-block bg-gray-200 px-4 py-1 rounded">
                                    {messageDate}
                                </div>
                            </div>
                        );
                    }

                    acc.push(
                        <div key={message.id} className="mb-2 message-item" data-date={messageDate}>
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
