import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { barangSchema, barangType } from "@/schema/barang";
import { useProductStore } from "@/store/useBarangStore";
import { useAuthStore } from '@/store/useAuthStore';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Edit() {
  const [barangData, setBarangData] = useState<barangType>();
  const { detailProduct, updateProduct } = useProductStore();
  const { logout } = useAuthStore();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<barangType>({
    resolver: zodResolver(barangSchema),
    defaultValues: {
      nama_barang: barangData?.nama_barang || "",
      kode_barang: barangData?.kode_barang || "",
      harga: barangData?.harga || 0,
      stok: barangData?.stok || 0,
    },
  });

  const { data: dataBarang } = useQuery({
    queryKey: ["product", id],
    queryFn: () => detailProduct(Number(id)),
  });

  useEffect(() => {
    if (dataBarang) {
      setBarangData(dataBarang);
      reset(dataBarang);
    }
  }, [dataBarang, reset]);

  const { mutate, status } = useMutation({
    mutationFn: async (updatedProduct: barangType) =>
      updateProduct(updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/barang");
      Toast.show({
        type: "success",
        text1: "Barang berhasil diedit",
      });
    },
  });

  const onSubmit = (data: barangType) => {
    // Sertakan id dari barangData agar updateProduct bisa menemukan barang yang tepat
    mutate({ ...data, id: barangData?.id });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 w-full bg-white">
      <View className="flex-row z-10 bg-white sticky max-w-full items-center justify-between align-middle px-5 py-3  border-b-2 border-gray-300">
        <View className="gap-2 items-center w-auto flex-row ">
          <LinearGradient
            colors={["#1a472a", "#2c5e2e", "#3a7e3a"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 10 }}
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
          >
            <TouchableOpacity
              onPress={() => router.push("/barang")}
              className="text-white font-poppins font-bold text-3xl"
            >
              <Text className="font-poppins font-black text-3xl text-white">
                A
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <View className="w-auto flex-col ">
            <Text className="text-2xl font-black text-green-800 w-60 ">
              ALAM JAYA
            </Text>
            <Text className="text-lg  text-green-800 ">TEXTILE </Text>
          </View>
        </View>
        <Button onPress={handleLogout} className="">
          <Text className="text-white font-bold">Logout</Text>
        </Button>
      </View>
      <View className="items-center justify-center p-5 ">
        <Text className="text-2xl font-bold text-green-900">Edit Barang</Text>
        <Text className="text-base text-gray-600">
          Silahkan edit data barang:
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-5 ">
        <Button className="" onPress={handleBack}>
          <Text className="text-white">Kembali</Text>
        </Button>
        <View className="relative flex-1 mr-2"></View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-5 my-3">
        <Card className=" mt-3">
          <CardContent className="space-x-2 flex-row w-full">
            <View className="flex-1 gap-2">
              <View className=" mb-6">
                <Text className="text-gray-700 font-poppins text-start font-medium mb-4">
                  Nama Barang
                </Text>
                <Controller
                  control={control}
                  name="nama_barang"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Nama Barang"
                      className={`w-full shadow-sm ${errors.nama_barang ? "border-red-500" : ""}`}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.nama_barang && (
                  <Text className="text-red-500 text-xs mt-1 font-poppins">
                    {errors.nama_barang.message}
                  </Text>
                )}
              </View>
              <View className=" mb-6">
                <Text className="text-gray-700 font-poppins text-start font-medium mb-4">
                  Kode Barang
                </Text>
                <Controller
                  control={control}
                  name="kode_barang"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Kode Barang"
                      className={`w-full shadow-sm ${errors.kode_barang ? "border-red-500" : ""}`}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.kode_barang && (
                  <Text className="text-red-500 text-xs mt-1 font-poppins">
                    {errors.kode_barang.message}
                  </Text>
                )}
              </View>
              <View className=" mb-6">
                <Text className="text-gray-700 font-poppins text-start font-medium mb-4">
                  Harga
                </Text>
                <Controller
                  control={control}
                  name="harga"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Harga Barang"
                      keyboardType="numeric"
                      className={`w-full shadow-sm ${errors.harga ? "border-red-500" : ""}`}
                      onBlur={onBlur}
                      onChangeText={(text) => {
                        const numericValue = text.replace(/[^0-9]/g, "");
                        onChange(numericValue === "" ? 0 : Number(numericValue));
                      }}
                      value={value === 0 ? "" : value?.toString()}
                    />
                  )}
                />
                {errors.harga && (
                  <Text className="text-red-500 text-xs mt-1 font-poppins">
                    {errors.harga.message}
                  </Text>
                )}
              </View>
              <View className=" mb-6">
                <Text className="text-gray-700 font-poppins text-start font-medium mb-4">
                  Stok
                </Text>
                <Controller
                  control={control}
                  name="stok"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Stok"
                      keyboardType="numeric"
                      className={`w-full shadow-sm ${errors.stok ? "border-red-500" : ""}`}
                      onBlur={onBlur}
                      onChangeText={(text) => {
                        const numericValue = text.replace(/[^0-9]/g, "");
                        onChange(numericValue === "" ? 0 : Number(numericValue));
                      }}
                      value={value === 0 ? "" : value?.toString()}
                    />
                  )}
                />
                {errors.stok && (
                  <Text className="text-red-500 text-xs mt-1 font-poppins">
                    {errors.stok.message}
                  </Text>
                )}
              </View>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
      <View className="my-4 items-center w-full px-5">
        <Button className="w-full max-w-md" onPress={handleSubmit(onSubmit)}>
          <Text className="text-white">Update Barang</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
