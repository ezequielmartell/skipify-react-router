// Context.js
import React, { useState } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [boycottState, setBoycottState] = useState(false);
    const [badArtistsArray, setBadArtistsArray] = useState(['']);
    const [newArtist, setNewArtists] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [loading, setLoading] = useState(true);


    return (
        <Context.Provider value={{
            password, setPassword,
            email, setEmail,
            error, setError,
            isAuthenticated, setIsAuthenticated,
            boycottState, setBoycottState,
            badArtistsArray, setBadArtistsArray,
            newArtist, setNewArtists,
            accessToken, setAccessToken,
            loading, setLoading,
        }}>
            {children}
        </Context.Provider>
    );
};
