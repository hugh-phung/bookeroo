import { SESSION_USER } from "../components/constants"

// Gets Java item from local storage
// Checks if it exists
export const getSessionUser = () => {
    const sessionUserString = localStorage.getItem(SESSION_USER)
    if(sessionUserString){
        return JSON.parse(sessionUserString)
    }
    return false
}