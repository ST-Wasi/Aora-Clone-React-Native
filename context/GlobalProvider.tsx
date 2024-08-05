import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/appwrite";

interface GlobalContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    loading: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    console.log(context)
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};

const GlobalProvider = ({ children }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCurrentUser().then((user) => {
            if (user) {
                setIsLoggedIn(true)
                setUser(user)
            } else {
                setIsLoggedIn(false)
                setUser(null)
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                loading
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}   

export default GlobalProvider