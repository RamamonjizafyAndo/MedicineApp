import { createContext, useState } from "react";

export const UserContext = createContext();


export const UserContextProvider = (props)=>{
    const [idUser, setIdUser] = useState('');
    const [idMedicament, setIdMedicament] = useState('');
    const changeIdUser = (value)=>{
        setIdUser(value);
    }
    const changeIdMedicament = (value)=>{
        setIdMedicament(value)
    }
    return(
        <UserContext.Provider value={{idUser, changeIdUser, idMedicament, changeIdMedicament}}>
            {props.children}
        </UserContext.Provider>
    )
}