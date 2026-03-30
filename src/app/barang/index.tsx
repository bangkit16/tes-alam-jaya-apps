import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { barangType } from '@/schema/barang';
import { useAuthStore } from '@/store/useAuthStore';
import { useProductStore } from '@/store/useBarangStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
export default function Barang() {
  const [search, setSearch] = useState<string>('');
  const [barangData, setBarangData] = useState<barangType[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const { getProducts, deleteProduct } = useProductStore();
  const { logout } = useAuthStore();
  const debouncedSearch = useDebounce(search, 300);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const { data: dataBarang, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 0,
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
    if (dataBarang) {
      if (debouncedSearch) {
        const lowercasedFilter = debouncedSearch.toLowerCase();
        const filteredData = dataBarang.filter(
          (item) => item.nama_barang.toLowerCase().includes(lowercasedFilter) || item.kode_barang.toLowerCase().includes(lowercasedFilter)
        );
        setBarangData(filteredData);
      } else {
        setBarangData(dataBarang);
      }
    }
  }, [dataBarang, debouncedSearch]);

  const handleSearchChange = (text: string) => {
    setSearch(text);
  };

  const handleCreate = () => {
    router.push('/barang/create');
  };

  const handleDetailButton = (id: number) => () => {
    router.push(`/barang/${id}`);
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
        <Button
          onPress={handleLogout}
          className=''
        >
          <Text className='text-white font-bold'>Logout</Text>
        </Button>
      </View>
      <View className='items-center justify-center p-5 '>
        <Text className='text-2xl font-bold text-green-900'>Daftar Barang</Text>
        <Text className='text-base text-gray-600'>Berikut adalah daftar barang yang tersedia:</Text>
      </View>
      <View className='flex-row items-center justify-between px-5 '>
        <View className='relative flex-1 mr-2'>
          <Input
            value={search}
            onChange={(e) => handleSearchChange(e.nativeEvent.text)}
            placeholder='Cari barang...'
            className='shadow-md w-full'
          />
        </View>
        <Button onPress={handleCreate}>
          <Text className='text-white'>Tambah Barang</Text>
        </Button>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className='px-5 my-3'
      >
        {isLoading && <Text className='mt-3 text-center'>Loading...</Text>}
        {barangData && barangData.length > 0 ? (
          <View>
            {barangData?.map((barang) => (
              <Card
                className=' mt-3'
                key={barang.kode_barang}
              >
                <CardHeader className='flex-row'>
                  <View className='flex-1 gap-1'>
                    <CardTitle className='text-lg'>{barang.nama_barang}</CardTitle>
                    <CardDescription>Kode : {barang.kode_barang}</CardDescription>
                  </View>
                </CardHeader>
                <CardContent className='space-x-2 flex-row'>
                  <View className='w-1/2 gap-5'>
                    <View className='flex-col gap-1'>
                      <Text className='text-sm text-gray-500'>Harga</Text>
                      <Text className='text-base font-medium text-gray-800'>Rp {barang.harga.toLocaleString('id-ID')}</Text>
                    </View>
                    <View className='flex-col gap-1'>
                      <Text className='text-sm text-gray-500'>Stok</Text>
                      <Text className='text-base font-medium text-gray-800'>{barang.stok}</Text>
                    </View>
                  </View>
                  <View className='w-1/2 gap-5'>
                    <View className='flex justify-center items-center'>
                      <QRCode
                        value={barang.kode_barang}
                        size={100}
                        color='black'
                        backgroundColor='white'
                      />
                    </View>
                  </View>
                </CardContent>
                <CardFooter>
                  <View className='flex-row w-full justify-end gap-2'>
                    <Button onPress={handleDetailButton(barang.id as number) }>
                      <Text className='text-white'>Detail</Text>
                    </Button>
                    <Button
                      variant='outline'
                      onPress={handleEditButton(barang.id as number)}
                    >
                      <Text>Edit</Text>
                    </Button>
                    <Button
                      variant='destructive'
                      onPress={() => handleDeleteButton(barang.id as number)}
                    >
                      <Text className='text-white'>Delete</Text>
                    </Button>
                  </View>
                </CardFooter>
              </Card>
            ))}
          </View>
        ) : (
          <Text className='text-center text-gray-500'>Tidak ada barang yang ditemukan.</Text>
        )}
      </ScrollView>
      <View className='my-4 items-center w-full px-5'>
        <Button
          className='w-full max-w-md'
          onPress={() => router.push('/barang/scan')}
        >
          <Text className='text-white'>Scan QR Code</Text>
        </Button>
      </View>
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
