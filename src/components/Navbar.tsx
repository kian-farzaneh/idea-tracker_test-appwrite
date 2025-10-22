// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
    const { currentUser, logout } = useAuth();

    return (
        <nav className="main-header u-padding-inline-end-0">
            <h3 className="u-stretch eyebrow-heading-1">Idea Tracker</h3>
            {currentUser ? (
                <div className="main-header-end u-margin-inline-end-16">
                    <p>{currentUser.email}</p>
                    <button 
                        className="button" 
                        type="button" 
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <Link 
                    href="/login" 
                    className="button u-margin-inline-end-16"
                >
                    Login
                </Link>
            )}
        </nav>
    );
}
