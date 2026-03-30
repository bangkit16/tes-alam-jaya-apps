import { Button } from '@/components/ui/button';
import { Text as TextShad } from '@/components/ui/text';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#1a472a', '#2c5e2e', '#3a7e3a']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className='flex-1 rounded-2xl items-center justify-center w-full h-full'
    >
      <SafeAreaView className='flex-1 items-center justify-center w-full h-full'>
        <View className='flex-1 items-center justify-center p-4 '>
          <View className='w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg'>
            <TouchableOpacity
              onPress={() => router.push('/barang')}
              className='text-white font-poppins font-bold text-3xl'
            >
              <Text className='font-poppins font-black text-6xl text-green-900'>A</Text>
            </TouchableOpacity>
          </View>
          <Text className='text-3xl font-poppins font-bold text-white mb-2 mt-5'>ALAM JAYA TEXTILE</Text>
          <Button
            onPress={() => router.push('/barang')}
            className='min-w-[180px] p-3 text-white h-auto font-poppins my-3'
          >
            <TextShad className=' font-bold text-2xl'>Dashboard</TextShad>
          </Button>
        </View>
        <View className='mt-4 items-center'>
          <Text className='text-white '>Copyright © Alam Jaya Textile, 2026</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
