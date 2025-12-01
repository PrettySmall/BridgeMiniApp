import { createContext, useContext, useEffect, useState } from "react";
import Coins from "@/constants/Coins";
import { login, setAuthToken } from "@/api";

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

const AppProvider = ({ children }) => {
    const [currency1, setCurrency1] = useState(Coins[0]);
    const [currency2, setCurrency2] = useState(Coins[1]);
    const [createdTime, setCreatedTime] = useState(Date.now())
    const [destination, setDestination] = useState('')
    const [amount, setAmount] = useState('0')
    const [toAmount, setToAmount] = useState('0')
    const [isAuthenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        const loginOnInit = async () => {
            const userData = {
                chatid: window.Telegram.WebApp.initDataUnsafe?.user?.id,
                referral: ''
            };
            login(userData).then(data => {
                if (data) {
                    setAuthenticated(true)
                } else {
                    setAuthenticated(false)
                }
            });
        };
        const logoutUser = () => {
            localStorage.removeItem("jwtToken");
            setAuthToken(null);
            setAuthenticated(false)
        };

        loginOnInit();

        return () => {
            logoutUser();
        };
    }, [])

    return (
        <AppContext.Provider value={{
            currency1,
            currency2,
            destination,
            createdTime,
            amount,
            toAmount,
            setCurrency1,
            setCurrency2,
            setDestination,
            setCreatedTime,
            setAmount,
            setToAmount,
            isAuthenticated
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider