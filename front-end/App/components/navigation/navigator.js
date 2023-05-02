import React, { useContext } from "react"
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Login from '../screens/login.js'
import Home from '../screens/home.js'
import Event from '../screens/event.js'
import Local from '../screens/local.js'
import Profile from '../screens/profile.js'
import ticket from '../screens/ticket.js'
import Edit_Profile from '../screens/edit_profile.js'
import { Context } from "../globalContext/globalContext.js"
import { Foundation, FontAwesome5, FontAwesome } from '@expo/vector-icons'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export const StackNavigator = () => {

    const globalContext = useContext(Context)
    const { isLoggedIn, userObject } = globalContext

    return (
        <Stack.Navigator>
            {(!isLoggedIn) || (!userObject) ?
                <>
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="Evento" component={Event} options={{ headerShown: false }} />
                    <Stack.Screen name="Local" component={Local} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                </>
                :
                <>
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="Evento" component={Event} options={{ headerShown: false }} />
                    <Stack.Screen name="Local" component={Local} options={{ headerShown: false }} />
                    <Stack.Screen name="Perfil" component={Profile} options={{ headerShown: false }} />
                    <Stack.Screen name="Editar Perfil" component={Edit_Profile} options={{ headerShown: false }} />
                </>
            }

        </Stack.Navigator>
    )
}

export const TabNavigator = () => {

    const globalContext = useContext(Context)
    const { isLoggedIn } = globalContext

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    paddingBottom: 0,
                    backgroundColor: "#121214",
                    borderTopWidth: 0,
                    paddingBottom: 30,
                    paddingTop: 10,
                    elevation: 0,
                    height: 90
                }
            }}>
            <Tab.Screen
                name="Início"
                component={StackNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Foundation name="home" size={35} color="#8E05C2" />
                        } return <Foundation name="home" size={30} color="#8D8D99" />
                    }
                }}
            />
            {isLoggedIn ?
                <>
                    <Tab.Screen
                        name="Ingressos"
                        component={ticket}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ color, size, focused }) => {
                                if (focused) {
                                    return <FontAwesome name="ticket" size={33} color="#8E05C2" />
                                } return <FontAwesome name="ticket" size={28} color="#8D8D99" />
                            }
                        }}
                    />
                    <Tab.Screen
                        name="Perfil"
                        component={Profile}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ color, size, focused }) => {
                                if (focused) {
                                    return <FontAwesome5 name="user-alt" size={28} color="#8E05C2" />
                                } return <FontAwesome5 name="user-alt" size={23} color="#8D8D99" />

                            }
                        }}

                    />
                </>
                :
                <Tab.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false,
                        tabBarStyle: { display: 'none' },
                        tabBarIcon: ({ color, size, focused }) => {
                            if (focused) {
                                return <FontAwesome5 name="user-alt-slash" size={28} color="#8E05C2" />
                            } return <FontAwesome5 name="user-alt-slash" size={23} color="#8D8D99" />

                        }
                    }} />
            }
        </Tab.Navigator>
    )
}