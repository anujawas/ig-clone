import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    currentUser: null,
    setCurrentUser: null
});

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(false);
    const value = { currentUser, setCurrentUser };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useLoading must be used within LoadingProvider");
    }
    return context;
}