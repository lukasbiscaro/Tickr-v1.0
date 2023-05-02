import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../globalContext/globalContext.js"
import { Avatar, TheTown } from '../../assets/index'
import MapView, { Marker } from 'react-native-maps'
// import artists from '../data/artists' ---- Update with events (Line-up Example)
import axios from 'axios'
import { useRoute } from '@react-navigation/native'

const EventInfo = () => {

    const globalContext = useContext(Context)
    const { domain } = globalContext

    const route = useRoute()
    const { eventId } = route.params

    const [showMore, setShowMore] = useState(false)
    const [eventsData, setEventsData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get(`${domain}event/manage/${eventId}`)
            .then(response => {
                setEventsData([response.data])
                setLoading(true)
            })
            .catch(err => console.log(err))
    }, [eventId])

    const toggleShowMore = () => {
        setShowMore(!showMore)
    }

    return (
        <View className="bg-bgBlack flex-1 relative">
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View className="flex-col items-center justify-center px-8 mt-16">
                    <View>
                        <Text className="text-xl text-white font-semibold">Detalhes do Evento</Text>
                    </View>
                    {
                        loading
                            ?
                            eventsData.map((event) => {
                                return (
                                    <>
                                        <View key={event.id}>
                                            <Image
                                                source={TheTown} // EXAMPLE IMAGE (Fix API)
                                                className="w-[370px] h-[280px] mt-8 rounded" />
                                            <Text className="text-3xl text-white font-semibold mt-7 mb-4 uppercase">{event.event_name}</Text>
                                            <Text className="text-lg text-white font-semibold">R$ {event.event_price}</Text>
                                            <Text className="text-md text-lowGray font-semisemibold mt-8"><Text className="font-semibold text-white">📆 Calendário:</Text> {event.event_date}</Text>
                                            <Text className="text-md text-lowGray font-semisemibold my-2"><Text className=
                                                "font-semibold text-white">⏱️ Horário de Funcionamento:</Text> {event.event_time_start.slice(0, 5)}h até {event.event_time_ends.slice(0, 5)}h</Text>
                                            <Text className="text-md text-lowGray font-semisemibold"><Text className="font-semibold text-white">🪧 Localizacão:</Text> {event.event_location}</Text>
                                            <Text
                                                numberOfLines={showMore ? null : 3}
                                                className="text-md text-lowGray font-light mt-11">{event.event_description}</Text>
                                            {event.event_description.length > 120 && (
                                                <TouchableOpacity onPress={toggleShowMore}>
                                                    <Text className="text-mainPurple mt-2">
                                                        {showMore ? 'Ler menos' : 'Ler mais'}
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                        <View>
                                            <View>
                                                <MapView
                                                    style={{ borderRadius: 5 }}
                                                    className="w-[370px] h-[200px] mt-8"
                                                    initialRegion={{
                                                        latitude: -23.697427688758005,
                                                        longitude: -46.69988131874373,
                                                        latitudeDelta: 0.005,
                                                        longitudeDelta: 0.005,
                                                    }}
                                                >
                                                    <Marker
                                                        coordinate={{
                                                            latitude: -23.697427688758005,
                                                            longitude: -46.69988131874373,
                                                        }}
                                                        title={event.event_location}
                                                    />
                                                </MapView>
                                            </View>
                                            <Text className="text-lowGray mt-2">{event.event_location}</Text>
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
                <View className="mb-12">
                    <View className="flex-row items-center justify-between">
                        <Text className="mt-10 ml-4 mb-4 text-xl text-mainPurple font-semisemibold uppercase">Participantes</Text>
                        <Text className="mt-10 mr-4 mb-4 text-sm text-mainPurple font-light underline">Ver Todos</Text>
                    </View>
                    <View className="h-56 w-full flex justify-center items-center">
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}>
                            {/* {
                                artists.map(artist => (
                                    <View
                                        key={artist.id}
                                        className="ml-4">
                                        <TouchableOpacity>
                                            <Image
                                                source={Avatar}
                                                className="mt-4 h-24 w-24 rounded-full"
                                            />
                                        </TouchableOpacity>
                                        <Text className="text-white text-md text-center font-semibold mt-3">{artist.name}</Text>
                                    </View>
                                ))
                            } */}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default EventInfo