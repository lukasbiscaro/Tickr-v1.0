import React, { useContext, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Context } from "../globalContext/globalContext.js"
import bgLogin from '../../assets/bgLogin.png'
import axios from 'axios';

const Login = () => {

    const globalContext = useContext(Context)
    const { setIsLoggedIn, domain, setUserObject, setToken } = globalContext;

    const [securePassword, setSecurePassword] = useState(true)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const [isFormValid, setIsFormValid] = useState(false)

    const handleEmailChange = (text) => {
        setEmail(text)
        checkForm(text, password)
    }

    const handlePasswordChange = (text) => {
        setPassword(text)
        checkForm(email, text)
    }

    const checkForm = (email, password) => {
        if (email && password) {
            const isEmailValid = email.trim()
            const isPasswordValid = password.trim()
            setIsFormValid(isEmailValid && isPasswordValid)
        } else {
            setIsFormValid(false)
        }
    }

    const handleLogin = () => {

        setError('')

        const lowercaseEmail = email.toLowerCase();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const data = JSON.stringify({
            'username': lowercaseEmail,
            'password': password
        })

        axios.post(`${domain}user/login-user/`, data, config)
            .then(res => {
                if (res.status === 200) {
                    setUserObject(res.data)
                    setToken(res.data.token)
                    setIsLoggedIn(true)
                }
            })
            .catch(error => {
                setError("Não foi possível validar suas credenciais!")
                console.log(error)
            })
    }

    return (
        <View
            className="flex-1 bg-bgBlack">
            <View
                className="relative w-full h-full">
                <Image
                    source={bgLogin}
                    className="w-full h-full"
                />
            </View>
            <View
                className="absolute w-full h-full flex justify-start items-center mt-56">
                <View
                    className="h-[350px] w-[330px] rounded flex justify-start">
                    <View
                        className="flex items-center justify-center h-24 mb-2">
                        <Text
                            className="text-white text-[50px]">Tick<Text className="text-mainPurple">r</Text></Text>
                    </View>
                    {
                        error &&
                        <View className="flex justify-center">
                            <View className="bg-dangerRed mx-10 mb-6 p-2">
                                <Text className="text-white font-semibold">{error}</Text>
                            </View>
                        </View>
                    }
                    <View
                        className="flex">
                        <Text
                            className="justify-start font-semibold text-md text-white rounded mx-10 mb-1">E-mail:</Text>
                        <TextInput
                            value={email}
                            onChangeText={handleEmailChange}
                            className="font-light text-lg text-white mx-10 border border-b-lowGray rounded p-2 placeholder:font-light"
                            placeholder='exemplo@exemplo.com'
                            autoComplete='email'
                            textContentType='username' />
                    </View>
                    <View>
                        <Text
                            className="justify-start font-semibold text-md text-white mx-10 mt-7 mb-1">Senha:</Text>
                        <TextInput
                            value={password}
                            onChangeText={handlePasswordChange}
                            className="font-light text-lg text-white mx-10 border border-b-lowGray rounded p-2"
                            placeholder='*******'
                            autoComplete='password'
                            textContentType='password'
                            secureTextEntry={securePassword} />
                    </View>
                    {
                        !isFormValid ?
                            <>
                                <TouchableOpacity
                                    disabled
                                    className="flex items-center justify-center rounded bg-lowGray mx-10 mt-8 h-10">
                                    <Text className="text-bgBlack font-semibold uppercase">login</Text>
                                </TouchableOpacity>
                            </>
                            :
                            <TouchableOpacity
                                onPress={() => handleLogin()}
                                className="flex items-center justify-center rounded bg-mainPurple mx-10 mt-8 h-10">
                                <Text className="text-white font-semibold uppercase">login</Text>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )

}

export default Login;