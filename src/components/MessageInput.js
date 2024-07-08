import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <div className="flex p-4 border-t border-gray-200">
            <input
                type="text"
                className="flex-grow p-2 border rounded"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button
                className="ml-2 bg-blue-500 text-white p-2 rounded"
                onClick={handleSend}
            >
                Send
            </button>
        </div>
    );
};

export default MessageInput;
