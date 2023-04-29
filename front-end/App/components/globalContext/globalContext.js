import React, { useState, createContext } from "react"
import * as SecureStore from 'expo-secure-store'

const Context = createContext()

const Provider = ({ children }) => {

    const [domain, setDomain] = useState('http://127.0.0.1:8000/api/v1.0/')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userObject, setUserObject] = useState()

    const setToken = async (token) => {
        await SecureStore.setItemAsync('token', token)
    }

    const globalContext = {
        domain,
        isLoggedIn,
        setIsLoggedIn,
        userObject,
        setUserObject,
        setToken
    }

    return (
        <Context.Provider value={globalContext}>
            {children}
        </Context.Provider>
    )

}

export { Context, Provider }