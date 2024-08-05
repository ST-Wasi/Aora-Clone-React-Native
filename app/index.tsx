import { View, Text, ScrollView, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { router, Redirect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../constants'
import CustomButton from '@/components/CustomButton'
import { useGlobalContext } from '@/context/GlobalProvider'

const Home = () => {
    const { isLoggedIn, loading } = useGlobalContext();
    if(!loading && isLoggedIn) return <Redirect href='/Home' />
    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className='w-full justify-center items-center min-h-[85vh] px-4 '>
                    <Image
                        className='w-[130px] h-[84px]'
                        source={images.logo}
                        resizeMode='contain'
                    />
                    <Image
                        className='max-w-[380px] w-full h-[300px]'
                        source={images.cards}
                        resizeMode='contain'
                    />
                    <View className='relative mt-5'>
                        <Text className='text-3xl text-white text-center font-bold'>Discover Endless Possibilities with {" "}<Text className='text-secondary-200'>Aora</Text> </Text>
                        <Image
                            source={images.path}
                            className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
                            resizeMode='contain'
                        />
                    </View>
                    <Text className='text-sm text-gray-100 mt-7 text-center'>Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora</Text>

                    <CustomButton title='Continue with Email' containerStyles={'w-full mt-7'} handlePress={() => router.push('/sign-in')} />
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style='light' />
        </SafeAreaView>
    )
}

export default Home