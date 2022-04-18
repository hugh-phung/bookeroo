import {useState} from "react"

// Hook to simply form handling
export const useForm = (initalState) => {
    const [fields, setFields] = useState(initalState)
    
    const handleInputChange = (event) => {
        setFields(fields => ({...fields, [event.target.name]: event.target.value}))
    }
    return {fields, setFields, handleInputChange}
}