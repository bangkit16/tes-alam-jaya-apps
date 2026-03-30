import { barangType, ProductStore } from '@/schema/barang';
import { create } from 'zustand';

// Dummy Database Barang

const INITIAL_PRODUCTS = [
  {
    id: 1,
    kode_barang: '08839',
    nama_barang: 'Kaos Hitam PE',
    harga: 55000,
    stok: 152,
  },
  {
    id: 2,
    kode_barang: '08840',
    nama_barang: 'Kaos Putih Combed 30s',
    harga: 60000,
    stok: 120,
  },
  {
    id: 3,
    kode_barang: '08841',
    nama_barang: 'Kaos Navy Premium',
    harga: 65000,
    stok: 98,
  },
];

export const useProductStore = create<ProductStore>((set, get) => ({
  products: INITIAL_PRODUCTS,

  getProducts: () => {
    return (get() as { products: barangType[] }).products;
  },

  addProduct: (newProduct: barangType) => {
    const products = get().products;
    const lastId = products.at(-1)?.id || 0;
    const newProductWithId: barangType = { ...newProduct, id: lastId + 1 };

    set((state: { products: barangType[] }) => ({
      products: [...state.products, newProductWithId],
    }));

    return newProductWithId;
  },
  updateProduct: (updatedProduct: barangType) => {
    set((state) => ({
      products: state.products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
    }));
    return updatedProduct;
  },

  deleteProduct: (id: number) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }));
  },

  detailProduct: (id: number) => {
    const products = get().products;
    return products.find((p) => p.id === id) || null;
  },

  detailProductByCode: (kode_barang: string) => {
    // return (get() as { products: barangType[] }).products.find((p) => p.kode_barang === kode_barang) || null;
    return get().products.find((p) => p.kode_barang === kode_barang)?.id || null;
  },
}));
