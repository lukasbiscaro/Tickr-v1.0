import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../globalContext/globalContext.js"
import { useNavigation } from '@react-navigation/native'
import { CasaDeShow, TheTown } from '../../assets/index'
import MapView, { Marker } from 'react-native-maps'
import axios from 'axios'
import { useRoute } from '@react-navigation/native'

const LocalInfo = () => {

    const globalContext = useContext(Context)
    const { domain } = globalContext

    const route = useRoute()
    const { localId } = route.params

    const navigation = useNavigation()

    const [showMore, setShowMore] = useState(false)
    const [eventsData, setEventsData] = useState([])
    const [localData, setLocalData] = useState([])
    const [eventsLoading, setEventsLoading] = useState(false)
    const [localInfoLoading, setLocalInfoLoading] = useState(false)

    useEffect(() => {
        axios.get(`${domain}local/manage/${localId}`)
            .then(response => {
                setLocalData([response.data])
                setLocalInfoLoading(true)
            })
            .catch(err => console.log(err))
    }, [localId])

    useEffect(() => {
        axios.get(`${domain}event/`)
            .then(response => {
                setEventsData(response.data)
                setEventsLoading(true)
            })
            .catch(err => console.log(err))
    }, [])

    const toggleShowMore = () => {
        setShowMore(!showMore)
    }

    return (
        <View className="bg-bgBlack flex-1 relative">
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View className="flex-col items-center justify-center px-8 mt-16">
                    <View>
                        <Text className="text-xl text-white font-semibold">Detalhes do Local</Text>
                    </View>
                    {
                        localInfoLoading
                            ?
                            localData.map((local) => {
                                return (
                                    <>
                                        <View>
                                            <Image
                                                source={CasaDeShow} // EXAMPLE IMAGE (Fix API)
                                                className="w-[370px] h-[280px] mt-8 rounded" />
                                            <Text className="text-3xl text-white font-semibold mt-7">{local.local_name}</Text>
                                            <Text className="text-md text-lowGray font-light mt-11"><Text className="font-semibold text-white">📆 Calendário:</Text> {local.local_date}</Text>
                                            <Text className="text-md text-lowGray font-light my-2 w-80 leading-5"><Text className=
                                                "font-semibold text-white">⏱️ Horário de Funcionamento:</Text> {local.local_time_start.slice(0, 5)}h até {local.local_time_ends.slice(0, 5)}h</Text>
                                            <Text className="text-md text-lowGray font-light">
                                                <Text className="font-semibold text-white">🪧 Localizacão:</Text> {local.local_location}</Text>
                                            <Text
                                                numberOfLines={showMore ? null : 3}
                                                className="text-md text-lowGray font-light mt-11">{local.local_description}</Text>
                                            {local.local_description.length > 120 && (
                                                <TouchableOpacity onPress={toggleShowMore}>
                                                    <Text className="text-mainPurple mt-2">
                                                        {showMore ? 'Ler menos' : 'Ler mais'}
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                        <View className="flex items-center justify-center">
                                            <View>
                                                <View>
                                                    <MapView
                                                        style={{ borderRadius: 5 }}
                                                        className="w-[370px] h-[200px] mt-8"
                                                        initialRegion={{
                                                            latitude: -23.527492655718017,
                                                            longitude: -46.6677981175072,
                                                            latitudeDelta: 0.005,
                                                            longitudeDelta: 0.005,
                                                        }}
                                                    >
                                                        <Marker
                                                            coordinate={{
                                                                latitude: -23.527492655718017,
                                                                longitude: -46.6677981175072,
                                                            }}
                                                            title="R. Tagipuru, 795 - Barra Funda, São Paulo"
                                                        />
                                                    </MapView>
                                                </View>
                                                <Text className="text-lowGray mt-2">{local.local_location}</Text>
                                            </View>
                                        </View>
                                    </>
                                )
                            })
                            :
                            <ActivityIndicator
                                size="large"
                                color="#8E05C2"
                                className="my-48" />
                    }
                </View>
                <View className="mb-28">
                    <View className="flex-row items-center justify-between">
                        <Text className="mt-10 ml-4 mb-4 text-xl text-mainPurple font-semisemibold uppercase">Eventos neste local</Text>
                        <Text className="mt-10 mr-4 mb-4 text-sm text-mainPurple font-light underline">Ver Todos</Text>
                    </View>
                    <View className="h-60 w-full flex justify-center items-center">
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}>
                            {
                                eventsLoading
                                    ?
                                    eventsData.slice(0, 5).map(event => (
                                        <View
                                            key={event.id}
                                            className="ml-4">
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate("Evento", { eventId: event.id })}>
                                                <Image
                                                    source={TheTown}
                                                    className="h-40 w-36 rounded"
                                                />
                                            </TouchableOpacity>
                                            <View className="flex-col">
                                                <Text className="text-white text-md font-semisemibold mt-3 mb-1">{event.event_name}</Text>
                                                <Text className="text-lowGray text-sm font-light">{event.event_date}</Text>
                                                <Text className="text-lowGray text-sm font-light mt-1">R$ {event.event_price}</Text>
                                            </View>
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

export default LocalInfo