import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-500 text-white p-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">Telegram Clone</h1>
            <Link to="/profile" className="text-sm bg-white text-blue-500 px-2 py-1 rounded">
                Profile
            </Link>
        </header>
    );
};

export default Header;
