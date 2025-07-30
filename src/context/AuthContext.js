import { createContext, useState, useEffect } from "react";
import api from "../api";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        const res = await api.post("login/", { username, password });
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        setUser(jwtDecode(res.data.access));
    };

    const logout = async () => {
        const refresh = localStorage.getItem("refresh");
        await api.post("logout/", { refresh });
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            setUser(jwtDecode(token));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
