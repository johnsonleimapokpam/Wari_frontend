import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [user, setUser] = useState(() => {

    const savedUser =
        localStorage.getItem("user");

    return savedUser
        ? JSON.parse(savedUser)
        : null;
    });

    const login = (
    jwt,
    userData
    ) => {

    localStorage.setItem(
        "token",
        jwt
    );

    localStorage.setItem(
        "user",
        JSON.stringify(userData)
    );

    setToken(jwt);
    setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                setUser,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () =>
    useContext(AuthContext);