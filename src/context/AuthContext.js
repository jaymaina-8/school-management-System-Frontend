import React, { createContext, useState } from "react";
import API from "../api";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem("access") ? {
        access: localStorage.getItem("access"),
        refresh: localStorage.getItem("refresh"),
    } : null);
    const [user, setUser] = useState(() => authTokens ? jwt_decode(authTokens.access) : null);

    const login = async (username, password) => {
        const response = await API.post("token/", { username, password });
        if (response.status === 200) {
            const data = response.data;
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
        }
    };

    const logout = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ user, authTokens, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
