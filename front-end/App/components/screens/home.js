import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../globalContext/globalContext.js"
import { useNavigation } from '@react-navigation/native'
import { Avatar, CasaDeShow, TheTown } from '../../assets/index'
import axios from 'axios'

const Home = () => {

    const globalContext = useContext(Context)
    const { domain, isLoggedIn } = globalContext

    const navigation = useNavigation()

    const [genreData, setGenreData] = useState([])
    const [eventsData, setEventsData] = useState([])
    const [localsData, setLocalsData] = useState([])
    const [eventsLoading, setEventsLoading] = useState(false)
    const [localsLoading, setLocalsLoading] = useState(false)
    const [bannerLoading, setBannerLoading] = useState(false)

    useEffect(() => {
        axios.get(`${domain}genre/`)
            .then(response => {
                setGenreData(response.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`${domain}event/`)
            .then(response => {
                setEventsData(response.data)
                setEventsLoading(true)
                setBannerLoading(true)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`${domain}local/`)
            .then(response => {
                setLocalsData(response.data)
                setLocalsLoading(true)
            })
            .catch(err => console.log(err))
    }, [])

    const handleProfilePress = () => {
        if (!isLoggedIn) {
            navigation.navigate('Login')
        } else {
            navigation.navigate('Perfil')
        }
    }

    return (
        <View className="flex-1 bg-bgBlack relative">
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View className="flex-row items-center align-middle justify-between px-8 mt-20">
                    <View>
                        <Text className="text-4xl text-white">Tick<Text className="text-mainPurple">r</Text></Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleProfilePress()}
                        className="w-14 h-14 bg-darkGray flex justify-center items-center rounded-full">
                        <Image
                            source={Avatar}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                    </TouchableOpacity>
                </View>
                <View className="mt-9 mb-6 h-12">
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}>
                        {
                            genreData.length > 0 && genreData.map((genre) => (
                                <TouchableOpacity
                                    className="mt-2 ml-4 justify-center align-middle bg-mainPurple w-24 h-9 rounded shadow-sm shadow-black">
                                    <Text className="text-center text-lg text-white font-semibold">{genre.genre}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </View>
                <View>
                    <View className="flex-row items-center justify-between">
                        <Text className="mt-10 ml-4 mb-4 text-xl text-mainPurple font-semibold uppercase">Próximos Eventos</Text>
                        <TouchableOpacity>
                            <Text className="mt-10 mr-4 mb-4 text-sm text-mainPurple font-light underline">Ver Todos</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="h-36 w-full flex justify-center items-center">
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}>
                            {
                                bannerLoading
                                    ?
                                    eventsData.length > 0 && eventsData.slice(0, 8).map((event) => {
                                        return (
                                            <TouchableOpacity
                                                className="ml-4">
                                                <Image
                                                    source={TheTown}
                                                    className="h-full w-80 rounded"
                                                />
                                            </TouchableOpacity>
                                        )
                                    })
                                    :
                                    <ActivityIndicator
                                        size="large"
                                        color="#8E05C2" />
                            }
                        </ScrollView>
                    </View>
                </View>
                <View>
                    <View className="flex-row items-center justify-between">
                        <Text className="mt-16 ml-4 mb-4 text-xl text-mainPurple font-light uppercase">Rolando <Text className="font-semibold">Hoje</Text></Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Todos Eventos")}>
                            <Text className="mt-16 mr-4 mb-4 text-sm text-mainPurple font-light underline">Ver Todos</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="h-72 w-full flex justify-center items-center">
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}>
                            {
                                eventsLoading
                                    ?
                                    eventsData.length > 0 && eventsData.slice(0, 5).map((event) => {
                                        return (
                                            <>
                                                <View
                                                    key={event.id}
                                                    className="flex-col ml-4 h-44 w-40">
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate("Evento", { eventId: event.id })}>
                                                        <Image
                                                            source={TheTown}
                                                            className="h-full w-full rounded"
                                                        />
                                                    </TouchableOpacity>
                                                    <View className="flex-col w-full">
                                                        <Text className="text-white text-lg font-bold mt-3 mb-1">{event.event_name}</Text>
                                                        <View className="flex-col">
                                                            <Text className="text-lowGray text-sm font-light">{event.event_date}</Text>
                                                            <Text className="text-lowGray text-sm font-light mt-1">R$ {event.event_price}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </>
                                        )
                                    })
                                    :
                                    <ActivityIndicator
                                        size="large"
                                        color="#8E05C2" />
                            }
                        </ScrollView>
                    </View>
                </View>
                <View className="mb-24">
                    <View className="flex-row items-center justify-between">
                        <Text className="mt-10 ml-4 mb-4 text-xl text-mainPurple font-semibold uppercase">Principais Locais</Text>
                        <Text className="mt-10 mr-4 mb-4 text-sm text-mainPurple font-light underline">Ver Todos</Text>
                    </View>
                    <View className="h-56 w-full flex justify-center items-center">
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}>
                            {
                                localsLoading
                                    ?
                                    localsData.length > 0 && localsData.slice(0, 5).map((local) => (
                                        <View
                                            key={local.id}
                                            className="ml-4">
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate("Local", { localId: local.id })}>
                                                <Image
                                                    source={CasaDeShow}
                                                    className="h-40 w-60 rounded"
                                                />
                                            </TouchableOpacity>
                                            <Text className="text-white text-lg font-semibold mt-1">{local.local_name}</Text>
                                        </View>
                                    ))
                                    :
                                    <ActivityIndicator
                                        size="large"
                                        color="#8E05C2" />
                            }
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Home