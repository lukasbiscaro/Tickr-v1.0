import React, { useState, createContext } from "react"

const Context = createContext()

const Provider = ({ children }) => {

    const [domain, setDomain] = useState('http://127.0.0.1:8000/api/v1.0/')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const globalContext = {
        domain,
        isLoggedIn,
        setIsLoggedIn
    }

    return (
        <Context.Provider value={globalContext}>
            {children}
        </Context.Provider>
    )

}

export { Context, Provider }