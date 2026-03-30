import { useAuthStore } from '@/store/useAuthStore';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function BarangLayout() {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    // Arahkan kembali pengguna ke /login jika tidak masuk
    return <Redirect href="/login" />;
  }

  // Pengguna terautentikasi, izinkan merender router di dalam folder `barang`
  return <Stack screenOptions={{ headerShown: false }} />;
}
