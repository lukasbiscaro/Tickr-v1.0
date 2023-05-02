import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native'
import { bgAllEvents } from '../../assets/index'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

const AllEvents = () => {

    return (
        <View className="bg-bgBlack flex-1 relative">
            <ScrollView className="mb-20">
                <View className="w-full h-64">
                    <View className="flex items-start">
                        <Image
                            source={bgAllEvents}
                            className="w-full h-full"
                        />
                        <View className="absolute ml-3 mt-48 bg-darkGray py-2 px-3 rounded-xl shadow-sm shadow-black">
                            <Text className="text-mainPurple font-semibold text-2xl uppercase">
                                <Text className="font-light text-white">Rolando</Text> Hoje <Ionicons name="ios-arrow-down" size={24} color="white" />
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity className="bg-darkGray rounded h-36 mt-5 mx-2 flex-row items-center">
                    <View className="w-40 h-32 ml-2 mr-4">
                        <Image
                            source={bgAllEvents}
                            className="w-full h-full object-cover rounded"
                        />
                    </View>
                    <View>
                        <Text className="text-mainPurple font-light mb-4">
                            20 ABR. {'>'} 09 MAI.
                        </Text>
                        <Text className="text-white text-lg font-semibold uppercase">
                            The Town
                        </Text>
                        <Text className="text-lowGray font-light text-sm mt-1">
                            Rua Exemplo Exemplo, 123
                        </Text>
                        <View className="flex-row items-center mt-4">
                            <Text className="text-mainPurple">
                                Ver Mais
                            </Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color='#8E05C2' />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className="bg-darkGray rounded h-36 mt-5 mx-2 flex-row items-center">
                    <View className="w-40 h-32 ml-2 mr-4">
                        <Image
                            source={bgAllEvents}
                            className="w-full h-full object-cover rounded"
                        />
                    </View>
                    <View>
                        <Text className="text-mainPurple font-light mb-4">
                            20 ABR. {'>'} 09 MAI.
                        </Text>
                        <Text className="text-white text-lg font-semibold uppercase">
                            The Town
                        </Text>
                        <Text className="text-lowGray font-light text-sm mt-1">
                            Rua Exemplo Exemplo, 123
                        </Text>
                        <View className="flex-row items-center mt-4">
                            <Text className="text-mainPurple">
                                Ver Mais
                            </Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color='#8E05C2' />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className="bg-darkGray rounded h-36 mt-5 mx-2 flex-row items-center">
                    <View className="w-40 h-32 ml-2 mr-4">
                        <Image
                            source={bgAllEvents}
                            className="w-full h-full object-cover rounded"
                        />
                    </View>
                    <View>
                        <Text className="text-mainPurple font-light mb-4">
                            20 ABR. {'>'} 09 MAI.
                        </Text>
                        <Text className="text-white text-lg font-semibold uppercase">
                            The Town
                        </Text>
                        <Text className="text-lowGray font-light text-sm mt-1">
                            Rua Exemplo Exemplo, 123
                        </Text>
                        <View className="flex-row items-center mt-4">
                            <Text className="text-mainPurple">
                                Ver Mais
                            </Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color='#8E05C2' />
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default AllEvents
