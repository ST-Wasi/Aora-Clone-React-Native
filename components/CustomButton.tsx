import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface CustomButtonProps {
    title: string
    handlePress?: () => void
    containerStyles?: any
    textStyles?: any
    isLoading?: boolean
}

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`} disabled={isLoading}>
            <Text className={`text-primary text-lg font-semibold ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton