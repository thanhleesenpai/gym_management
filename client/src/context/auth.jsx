import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        user: null,
        token: "",
        role: 1 // 1: user, 2: trainer, 3: admin
    });

    // default axios
    axios.defaults.headers.common['Authorization'] = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            const parsedData = JSON.parse(data);

            setAuth((prevState) => ({ ...prevState, user: parsedData.user, token: parsedData.token, role: parsedData.user.role }));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )

}

// custom hooks

const useAuth = () => {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };