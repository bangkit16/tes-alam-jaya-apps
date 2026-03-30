import { Button } from '@/components/ui/button';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Header() {
  const router = useRouter();
  return (
    <View className='flex-row z-10 bg-white sticky max-w-full items-center justify-between align-middle px-5 py-3  border-b-2 border-gray-300'>
      <View className='gap-2 items-center w-auto flex-row '>
        <LinearGradient
          colors={['#1a472a', '#2c5e2e', '#3a7e3a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 10 }}
          className='w-16 h-16 rounded-full flex items-center justify-center shadow-lg'
        >
          <TouchableOpacity
            onPress={() => router.push('/barang')}
            className='text-white font-poppins font-bold text-3xl'
          >
            <Text className='font-poppins font-black text-3xl text-white'>A</Text>
          </TouchableOpacity>
        </LinearGradient>
        <View className='w-auto flex-col '>
          <Text className='text-2xl font-black text-green-800 w-60 '>ALAM JAYA</Text>
          <Text className='text-lg  text-green-800 '>TEXTILE </Text>
        </View>
      </View>
      <Button
        onPress={() => router.push('/login')}
        className=''
      >
        <Text className='text-white font-bold'>Logout</Text>
      </Button>
    </View>
  );
}
