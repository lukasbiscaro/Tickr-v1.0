import React, { useContext, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Context } from "../globalContext/globalContext.js"
import bgLogin from '../../assets/bgLogin.png'

const Login = () => {

    const globalContext = useContext(Context)
    const { setIsLoggedIn } = globalContext;

    const [securePassword, setSecurePassword] = useState(true)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleLogin = () => {
        console.log('Log in')
        console.log(email)
        console.log(password)

        setIsLoggedIn(true)
    }

    return (
        <View
            className="flex-1 bg-black">
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
                        className="flex items-center justify-center h-28 mb-2">
                        <Text
                            className="text-white text-[50px]">Tick<Text className="text-purple-500">r</Text></Text>
                    </View>
                    <View
                        className="flex">
                        <Text
                            className="justify-start font-semibold text-md text-white rounded mx-10 mb-1">E-mail:</Text>
                        <TextInput
                            value={email}
                            onChangeText={text => setEmail(text)}
                            className="font-light text-lg text-white mx-10 border border-b-[#8D8D99] rounded p-2 placeholder:font-light"
                            placeholder='exemplo@exemplo.com'
                            autoComplete='email'
                            textContentType='username' />
                    </View>
                    <View>
                        <Text
                            className="justify-start font-semibold text-md text-white mx-10 mt-7 mb-1">Senha:</Text>
                        <TextInput
                            value={password}
                            onChangeText={text => setPassword(text)}
                            className="font-light text-lg text-white mx-10 border border-b-[#8D8D99] rounded p-2"
                            placeholder='*******'
                            autoComplete='password'
                            textContentType='password'
                            secureTextEntry={securePassword} />
                    </View>
                    <TouchableOpacity
                        onPress={() => handleLogin()}
                        className="flex items-center justify-center rounded bg-purple-500 mx-10 mt-8 h-10">
                        <Text className="text-white font-semibold uppercase">login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

}

export default Login;