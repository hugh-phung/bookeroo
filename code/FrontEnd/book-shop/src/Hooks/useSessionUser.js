import {useContext} from 'react'
import SessionUserProvider from '../Context/SessionUserContext'

export const useSessionUser = () => {
    return useContext(SessionUserProvider)
} 