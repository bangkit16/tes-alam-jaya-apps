import { Button } from '@/components/ui/button';
import { useProductStore } from '@/store/useBarangStore';
import { Ionicons } from '@expo/vector-icons'; // Icon untuk tombol ganti
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera'; // Tambahkan CameraType
import { router } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function CameraScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanned, setIsScanned] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back'); // State untuk arah kamera
  const isFocused = useIsFocused(); // Memeriksa apakah halaman saat ini sedang aktif

  const { detailProductByCode } = useProductStore();

  // Hanya memuat layar ini atau kamera jika permission ada dan layarnya sedang terfokus
  if (!permission || !isFocused) return <View className='flex-1 bg-black' />;

  if (!permission.granted) {
    return (
      <View className='flex-1 justify-center items-center p-5 bg-white'>
        <Text className='text-center text-lg mb-4 text-gray-700'>Kami butuh izin untuk mengakses kamera</Text>
        <Button
          className='w-full max-w-md'
          onPress={requestPermission}
        >
          <Text className='text-white font-bold'>Berikan Izin</Text>
        </Button>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    // Hindari pemindaian ganda saat sudah memproses
    if (isScanned) return;
    
    setIsScanned(true);

    const kodeBarang = data;
    const productId = detailProductByCode(kodeBarang);

    if (productId) {
      Toast.show({
        type: 'success',
        text1: 'Barang ditemukan! Mengarahkan ke detail...',
      });
      router.push(`/barang/${productId}`);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Barang tidak ditemukan!',
      });
      router.push(`/barang/`);
    }

    // Set timeout agar kamera tidak langsung me-scan berkali-kali secara bersamaan
    setTimeout(() => {
      setIsScanned(false);
    }, 2000);
  };

  return (
    <View className='flex-1 bg-black justify-center items-center'>
      <CameraView
        facing={facing}
        onBarcodeScanned={isScanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Frame bantuan */}
      <View className='absolute inset-0 justify-center items-center pointer-events-none'>
        <View className='w-64 h-64 border-2 border-white rounded-3xl opacity-50' />
        <Text className='text-white mt-4 bg-black/50 px-4 py-1 rounded-md'>Arahkan kamera ke QR Code</Text>
      </View>

      {/* Tombol Batal */}
      <View className='absolute bottom-12 w-full items-center'>
        <View className='mb-5'>
          <TouchableOpacity
            onPress={toggleCameraFacing}
            className='bg-black/40 p-3 rounded-full border border-white/20'
          >
            <Ionicons
              name='camera-reverse'
              size={28}
              color='white'
            />
          </TouchableOpacity>
        </View>
        <Button
          onPress={() => router.back()}
          variant='destructive'
          className='mb-6 '
        >
          <Text className='text-white font-semibold'>Batal</Text>
        </Button>
      </View>
    </View>
  );
}
