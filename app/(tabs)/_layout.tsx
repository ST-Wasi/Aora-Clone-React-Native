import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'

import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }: any) => {
    return (
        <View className='justify-center items-center gap-1'>
            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className='w-5 h-5 p-0'
            />
            <Text className="text-xs" style={{color: color}}>
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: "#CDCDE0",
                    tabBarStyle: {
                        backgroundColor: '#161622',
                        borderTopWidth: 1,
                        borderTopColor: "#232533",
                        height: 80
                    }
                }}
            >
                <Tabs.Screen name="Home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                color={color}
                                focused={focused}
                                icon={icons.home}
                                name='Home'
                            />
                        )
                    }}
                />
                <Tabs.Screen name="Bookmark"
                    options={{
                        title: 'Bookmark',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                color={color}
                                focused={focused}
                                icon={icons.bookmark}
                                name='Bookmark'
                            />
                        )
                    }}
                />
                <Tabs.Screen name="Create"
                    options={{
                        title: 'Create',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                color={color}
                                focused={focused}
                                icon={icons.plus}
                                name='Create'
                            />
                        )
                    }}
                />
                <Tabs.Screen name="profile"
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                color={color}
                                focused={focused}
                                icon={icons.profile}
                                name='Profile'
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabsLayout