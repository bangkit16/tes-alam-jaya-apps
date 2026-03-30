import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { barangType } from '@/schema/barang';
import { useAuthStore } from '@/store/useAuthStore';
import { useProductStore } from '@/store/useBarangStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function Edit() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [dataBarang, setDataBarang] = useState<barangType>();
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const { deleteProduct } = useProductStore();
  const queryClient = useQueryClient();
  const { detailProduct } = useProductStore();
  const { logout } = useAuthStore();
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const {
    data: barangData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['product', id], // Pisahkan queryKey agar tidak menimpa list 'products'
    queryFn: () => detailProduct(Number(id)),
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: async (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', itemToDelete] });
      Toast.show({ type: 'success', text1: 'Barang berhasil dihapus' });

      setIsDeleteDialogOpen(false);
      setItemToDelete(null);

      router.push('/barang');
    },
  });

  useEffect(() => {
    if (barangData) {
      setDataBarang(barangData);
    }
  }, [barangData]);

  const handleBack = () => {
    router.back();
  };

  const handleEditButton = (id: number) => () => {
    router.push(`/barang/${id}/edit`);
  };

  const handleDeleteButton = (id: number) => {
    setItemToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      console.log('Menghapus item dengan ID:', itemToDelete);
      deleteMutation(itemToDelete);
    }
  };

  return (
    <SafeAreaView className='flex-1 w-full bg-white'>
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
        <Button onPress={handleLogout}>
          <Text className='text-white font-bold'>Logout</Text>
        </Button>
      </View>
      <View className='items-center justify-center p-5 '>
        <Text className='text-2xl font-bold text-green-900'>Detail Barang</Text>
        <Text className='text-base text-gray-600'>Berikut adalah detail barang:</Text>
      </View>
      <View className='flex-row items-center justify-between px-5 '>
        <Button
          className=''
          onPress={handleBack}
        >
          <Text className='text-white'>Kembali</Text>
        </Button>
        <View className='relative flex-1 mr-2'></View>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className='px-5 my-3'
      >
        <Card className=' mt-3'>
          <CardContent className='space-x-2 flex-col w-full'>
            {isLoading ? (
              <Text>Loading...</Text>
            ) : (
              dataBarang && (
                <>
                  <View className='flex-1 gap-2 '>
                    <View className=' mb-6'>
                      <Text className='text-gray-700 font-poppins text-start font-medium mb-4'>Nama Barang</Text>
                      <Text className='text-lg font-bold'>{dataBarang?.nama_barang}</Text>
                    </View>
                    <View className=' mb-6'>
                      <Text className='text-gray-700 font-poppins text-start font-medium mb-4'>Kode Barang</Text>
                      <Text className='text-lg font-bold'>{dataBarang?.kode_barang}</Text>
                    </View>
                    <View className=' mb-6'>
                      <Text className='text-gray-700 font-poppins text-start font-medium mb-4'>Harga</Text>
                      <Text className='text-lg font-bold'>Rp {dataBarang?.harga}</Text>
                    </View>
                    <View className=' mb-2'>
                      <Text className='text-gray-700 font-poppins text-start font-medium mb-4'>Stok</Text>
                      <Text className='text-lg font-bold'>{dataBarang?.stok}</Text>
                    </View>
                  </View>
                  <View className='p-5 flex items-center justify-center w-full'>
                    <Text className='text-gray-700 font-poppins text-start font-medium text-2xl mb-6'>QR Code</Text>
                    <QRCode
                      value={dataBarang?.kode_barang}
                      size={300}
                      color='black'
                      backgroundColor='white'
                    />
                  </View>
                </>
              )
            )}
          </CardContent>
          <CardFooter>
            <View className='my-4 items-center w-full px-5 flex-row gap-3 justify-center'>
              <Button
                variant='outline'
                // className='border-2 border-gray-200'
                onPress={handleEditButton(dataBarang?.id as number)}
              >
                <Text>Update Barang</Text>
              </Button>
              <Button
                variant='destructive'
                onPress={() => handleDeleteButton(dataBarang?.id as number)}
              >
                <Text className='text-white'>Hapus Barang</Text>
              </Button>
            </View>
          </CardFooter>
        </Card>
      </ScrollView>
      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        {/* Tambahkan DialogContent */}
        <DialogContent className='w-[90%] max-w-[400px] bg-white'>
          <DialogHeader>
            <DialogTitle className='text-xl font-bold text-red-600'>Hapus Barang?</DialogTitle>
            <DialogDescription className='text-gray-600'>
              Apakah Anda yakin ingin menghapus barang ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>

          {/* Tambahkan Footer untuk Tombol Aksi */}
          <DialogFooter className='flex-row justify-end gap-3 mt-4'>
            <Button
              variant='outline'
              onPress={() => setIsDeleteDialogOpen(false)}
            >
              <Text>Batal</Text>
            </Button>
            <Button
              variant='destructive'
              onPress={handleDelete}
            >
              <Text className='text-white'>Hapus</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SafeAreaView>
  );
}
