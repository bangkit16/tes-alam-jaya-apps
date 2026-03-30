import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text as TextShad } from '@/components/ui/text';
import { registerSchema, registerType } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/useAuthStore';
import Toast from 'react-native-toast-message';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {  email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (data: registerType) => {
    // Karena registerType memiliki confirmPassword, sedangkan useAuthStore.register hanya meminta loginType,
    // kita cukup pastikan yang di-passing sesuai expected parameter type (misal tanpa confirmPassword).
    const { email, password } = data;
    const success = register({ email, password });

    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Registrasi berhasil!',
        text2: 'Silakan login dengan akun baru Anda.',
      });
      router.push('/login');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Email sudah terdaftar!',
      });
    }
  };

  return (
    <LinearGradient
      colors={['#1a472a', '#2c5e2e', '#3a7e3a']}
      className='flex-1 items-center justify-center w-full h-full'
    >
      <SafeAreaView className='flex-1 w-full'>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className='flex-1'
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View className='flex-1 items-center justify-center p-4'>
              <TouchableOpacity
                onPress={() => router.push('/')}
                className='w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg'
              >
                <Text className='font-poppins font-black text-5xl text-green-900'>A</Text>
              </TouchableOpacity>

              <Text className='text-3xl mb-5 font-poppins font-bold text-white mt-5'>Buat Akun Baru</Text>

              <View className='min-w-full max-w-md bg-white rounded-2xl p-6 shadow-lg'>
                {/* USERNAME */}
                {/* <View className='mb-4'>
                  <Text className='text-gray-700 font-poppins font-medium mb-2'>Username</Text>
                  <Controller
                    control={control}
                    name='username'
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder='Username'
                        className={errors.username ? 'border-red-500' : ''}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.username && <Text className='text-red-500 text-xs mt-1 font-poppins'>{errors.username.message}</Text>}
                </View> */}

                {/* EMAIL */}
                <View className='mb-4'>
                  <Text className='text-gray-700 font-poppins font-medium mb-2'>Email</Text>
                  <Controller
                    control={control}
                    name='email'
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder='Email'
                        className={errors.email ? 'border-red-500' : ''}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize='none'
                        keyboardType='email-address'
                      />
                    )}
                  />
                  {errors.email && <Text className='text-red-500 text-xs mt-1 font-poppins'>{errors.email.message}</Text>}
                </View>

                {/* PASSWORD */}
                <View className='mb-4'>
                  <Text className='text-gray-700 font-poppins font-medium mb-2'>Password</Text>
                  <Controller
                    control={control}
                    name='password'
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder='Password'
                        secureTextEntry
                        className={errors.password ? 'border-red-500' : ''}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.password && <Text className='text-red-500 text-xs mt-1 font-poppins'>{errors.password.message}</Text>}
                </View>

                {/* CONFIRM PASSWORD */}
                <View className='mb-6'>
                  <Text className='text-gray-700 font-poppins font-medium mb-2'>Konfirmasi Password</Text>
                  <Controller
                    control={control}
                    name='confirmPassword'
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder='Ulangi Password'
                        secureTextEntry
                        className={errors.confirmPassword ? 'border-red-500' : ''}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.confirmPassword && <Text className='text-red-500 text-xs mt-1 font-poppins'>{errors.confirmPassword.message}</Text>}
                </View>

                <Button
                  className='h-auto py-3 rounded shadow-lg'
                  onPress={handleSubmit(onSubmit)}
                >
                  <TextShad className='text-xl font-poppins'>Daftar Sekarang</TextShad>
                </Button>

                <View className='flex-row items-center justify-center mt-5'>
                  <Text className='text-gray-500 text-sm font-poppins'>Sudah punya akun? </Text>
                  <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text className='text-green-900 font-semibold text-sm font-poppins'>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
