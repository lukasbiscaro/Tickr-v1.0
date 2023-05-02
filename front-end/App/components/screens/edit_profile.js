import { ScrollView, View, Image, Text, TextInput } from 'react-native'
import React from 'react'
import { Avatar, bgEditProfile } from '../../assets/index'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Edit_Profile = () => {

    return (
        <View className="bg-bgBlack flex-1">
            <ScrollView>
                <View className="w-full h-80">
                    <View className="absolute w-full h-56 flex items-center">
                        <Image
                            source={bgEditProfile}
                            className="relative w-full h-full object-cover bg-center"
                        />
                        <View className="w-40 h-40 flex justify-center items-center bg-darkGray absolute mt-36 rounded-full">
                            <Image
                                source={Avatar}
                                className="w-36 h-36 object-cover bg-center"
                            />
                        </View>
                    </View>
                </View>
                <View className="px-8">
                    <View className="mt-3">
                        <Text className="text-white font-semibold text-md">Username:</Text>
                        <TextInput
                            className="font-light text-lg text-white border border-t-0 border-x-0 border-b-lowGray rounded p-2 placeholder:font-light"
                            placeholder='exemplo'
                            textContentType='username' />
                    </View>
                    <View className="flex-row justify-between">
                        <View className="mt-10 w-40">
                            <Text className="text-white font-semibold text-md">Nome:</Text>
                            <TextInput
                                className="font-light text-lg text-white border border-t-0 border-x-0 border-b-lowGray rounded p-2 placeholder:font-light"
                                placeholder='exemplo'
                                textContentType='username' />
                        </View>
                        <View className="mt-10 w-40">
                            <Text className="text-white font-semibold text-md">Sobrenome:</Text>
                            <TextInput
                                className="font-light text-lg text-white border border-t-0 border-x-0 border-b-lowGray rounded p-2 placeholder:font-light"
                                placeholder='exemplo'
                                textContentType='username' />
                        </View>
                    </View>
                    <View className="mt-10">
                        <Text className="text-white font-semibold text-md">E-mail:</Text>
                        <TextInput
                            className="font-light text-lg text-white border border-t-0 border-x-0 border-b-lowGray rounded p-2 placeholder:font-light"
                            placeholder='exemplo@exemplo.com'
                            textContentType='username' />
                    </View>
                    <View className="mb-28">
                        <TouchableOpacity
                            className="mt-10 h-10 justify-center items-center rounded bg-mainPurple">
                            <Text className="text-white font-semibold text-md uppercase">Salvar edições</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="mt-5 h-10 mb-5 justify-center items-center rounded bg-darkGray">
                            <Text className="text-dangerRed font-semibold text-md uppercase">Excluir Conta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Edit_Profile
