import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    // Dummy user data for illustration purposes
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        bio: "Software Engineer at OpenAI",
        avatar: "https://via.placeholder.com/150"
    };

    return (
        <div className="h-screen flex flex-col">
            <header className="bg-blue-500 text-white p-4 flex items-center justify-between">
                <h1 className="text-xl font-bold">Profile</h1>
                <Link to="/" className="text-sm bg-white text-blue-500 px-2 py-1 rounded">Home</Link>
            </header>
            <div className="flex-grow p-4">
                <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="flex items-center p-4">
                        <img
                            className="w-16 h-16 rounded-full"
                            src={user.avatar}
                            alt="User Avatar"
                        />
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold">{user.name}</h2>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="mt-2 text-gray-600">{user.bio}</p>
                        </div>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                        <h3 className="text-lg font-semibold">Settings</h3>
                        <ul className="mt-2">
                            <li className="py-2 border-b border-gray-200">
                                <Link to="#" className="text-blue-500 hover:underline">Change Password</Link>
                            </li>
                            <li className="py-2 border-b border-gray-200">
                                <Link to="#" className="text-blue-500 hover:underline">Notification Settings</Link>
                            </li>
                            <li className="py-2 border-b border-gray-200">
                                <Link to="#" className="text-blue-500 hover:underline">Privacy Settings</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
