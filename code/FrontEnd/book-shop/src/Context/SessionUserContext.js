import React, { useState } from "react"
import { SESSION_USER } from "../components/constants"
import { useEffect } from "react"


const SessionUserContext = React.createContext(null)

export const SessionUserProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userType, setUserType] = useState(
        {
            normal:false,
            admin:false,
            business:false
        }
    );

    const [sessionUser, setSessionUser] = useState({username:""})

    // Sets the user type.
    const checkType = (user) => {
        if (user.userType === "admin")
        {
            setUserType({
                normal:false,
                admin:true,
                business:false
            });
        }
        else if (user.userType === "user")
        {
            setUserType({
                normal:true,
                admin:false,
                business:false
            });     
        }

        else if (user.userType === "business")
        {
            setUserType({
                normal:false,
                admin:false,
                business:true
            });     
        }
    }

    // Stores login data in local storage.
    const getLocalStorageSessionUser = () => {
        const user = localStorage.getItem(SESSION_USER)
        if (user)
        {
            return JSON.parse(user)
        }
    }

    // Used in combination with getLocalStorageSessionUser() to make sure
    // login state is not lost when page is refreshed.
    useEffect(() => {
        const user = getLocalStorageSessionUser()
        if (user)
        {
            setSessionUser(user)
            checkType(user);
            setLoggedIn(true)
        }
    }, [sessionUser.username])
    

    // Stores user in local storage and sets the user type.
    const loginSessionUser = (user) => {
        localStorage.setItem(SESSION_USER, JSON.stringify(user));            
        setSessionUser(user);
        setLoggedIn(true)
        checkType(user);
    }

    // Removes user from local storage and logs out.
    const logoutSessionUser = () => {
        localStorage.setItem(SESSION_USER, "");
        setSessionUser({username:""})
        setLoggedIn(false)
    }

    // Providers allows access to other components
    return <SessionUserContext.Provider value={{
        sessionUser,
        loggedIn,
        userType,
        loginSessionUser,
        logoutSessionUser, 
        }}>
        {children}
    </SessionUserContext.Provider>
}

export default SessionUserContext