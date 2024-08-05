import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

interface FormFieldProps {
  title: string
  value: string
  placeholder?: string
  handleChangeText: (e: any) => void
  otherStyles?: string
  keyboardType?: string
}



const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType, ...props }: FormFieldProps) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-medium'>{title}</Text>

      <View className=' border-2 border-black-200 h-16 px-4 bg-black-100 focus:border-secondary rounded-2xl justify-center items-center flex-row'>
        <TextInput
          className='w-full h-full text-white'
          value={value}
          placeholder={placeholder}
          placeholderTextColor={'#7B7B8B'}
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => {
            setShowPassword(!showPassword)
          }}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField