import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { images } from '../../constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const Signin = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {setUser,setIsLoggedIn} = useGlobalContext();

  const submit = async () => {
    if (!form.email || !form.password) Alert.alert('Error', 'Please fill il all fields')

      setIsSubmitting(true)
    try {
      const result = await signIn(form.email, form.password)
      setUser(result)
      setIsLoggedIn(true)
      Alert.alert("Success", "User signed in successfully")
      // set this to global for further istimaal
      router.replace('/Home')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full min-h-[85vh] justify-center items-center px-4 my-6'>
          <Image source={images.logo} resizeMode='contain' className='w-[116px] h-[35px]' />
          <Text className='text-2xl text-white font-semibold mt-10'>Login to Aora</Text>
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => { setForm({ ...form, email: e }) }}
            keyboardType='email-address'
            otherStyles='mt-7 w-full'
          />

          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e) => { setForm({ ...form, password: e }) }}
            otherStyles='mt-7 w-full'
          />

          <CustomButton title='Sign In' handlePress={submit} containerStyles='mt-7 w-full' isLoading={isSubmitting} />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100'>Don't have account ?
              <Link href='/sign-up' className='text-lg font-semibold text-secondary'> Sign Up</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signin