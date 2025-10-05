import React from 'react';
import { Link } from 'react-router-dom';
import './Header.module.scss'

const Header = () => {
    return (
        <header>
            <div>
                <Link to="/">Main Page</Link>
                <Link to="/analitics">Analitics</Link>
            </div>
            <div>
                <Link to="/create-athlete">Create Athlete</Link>
                <Link to="/create-sport">Create Sport</Link>
            </div>
        </header>
    );
}

export default Header;