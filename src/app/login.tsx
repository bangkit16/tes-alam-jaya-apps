import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text as TextShad } from '@/components/ui/text';
import { loginSchema, loginType } from '@/schema/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
  const { login } = useAuthStore();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: loginType) => {
    const success = login(data);

    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Login berhasil!',
      });
      router.push('/barang');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Email atau password salah!',
      });
    }
  };

  return (
    <LinearGradient
      colors={['#1a472a', '#2c5e2e', '#3a7e3a']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className='flex-1 rounded-2xl items-center justify-center w-full h-full'
    >
      <SafeAreaView className='flex-1 items-center justify-center w-full h-full'>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className='flex-1'
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className='flex-1 items-center justify-center p-4 '>
              <View className='w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg'>
                <TouchableOpacity
                  onPress={() => router.push('/')}
                  className='text-white font-poppins font-bold text-3xl'
                >
                  <Text className='font-poppins font-black text-6xl text-green-900'>A</Text>
                </TouchableOpacity>
              </View>
              <Text className='text-3xl mb-5 font-poppins font-bold text-white mt-5'>Login ke akun anda</Text>
              <View className='min-w-full max-w-md bg-white rounded-2xl p-6 shadow-lg '>
                {/* INPUT EMAIL */}
                <View className=' mb-6'>
                  <Text className='text-gray-700 font-poppins text-start font-medium mb-4'>Email</Text>
                  <Controller
                    control={control}
                    name='email'
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder='Email'
                        className={`shadow-sm ${errors.email ? 'border-red-500' : ''}`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize='none'
                      />
                    )}
                  />
                  {errors.email && <Text className='text-red-500 text-xs mt-1 font-poppins'>{errors.email.message}</Text>}
                </View>

                {/* INPUT PASSWORD */}
                <View className=' mb-6'>
                  <Text className='text-gray-700 font-poppins text-start font-medium mb-4'>Password</Text>
                  <Controller
                    control={control}
                    name='password'
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder='Password'
                        className={`shadow-sm ${errors.password ? 'border-red-500' : ''}`}
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.password && <Text className='text-red-500 text-xs mt-1 font-poppins'>{errors.password.message}</Text>}
                </View>

                {/* TOMBOL LOGIN */}
                <Button
                  className='h-auto px-6 py-3 rounded shadow-lg'
                  onPress={handleSubmit(onSubmit)}
                >
                  <TextShad className='text-xl font-poppins'>Login</TextShad>
                </Button>

                <View className='flex-row items-center justify-center my-5'>
                  <Text className='text-gray-500 text-sm text-center font-poppins'>Tidak punya akun? </Text>
                  <TouchableOpacity onPress={() => router.push('/register')}>
                    <Text className=' text-green-900 font-semibold text-sm font-poppins'>register</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text className='mt-2 '>email: admin@gmail.com</Text>
              <Text className='mt-2 '>password: password</Text>
            </View>

            <View className='mt-4 items-center'>
              <Text className='text-white font-poppins'>Copyright © Alam Jaya Textile, 2026</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
