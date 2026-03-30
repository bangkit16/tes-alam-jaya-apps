import z from 'zod';

const barangSchema = z.object({
  id: z.number().optional(),
  nama_barang: z.string().min(1, 'Nama barang wajib diisi'),
  kode_barang: z.string().min(1, 'Kode barang wajib diisi'),
  harga: z.number('Harga harus berupa angka').min(1, 'Harga harus berupa angka positif'),
  stok: z.number('Stok harus berupa angka').min(1, 'Stok harus berupa angka positif'),
});

type barangType = z.infer<typeof barangSchema>;

type ProductStore = {
  products: barangType[];
  getProducts: () => barangType[];
  addProduct: (newProduct: barangType) => barangType;
  updateProduct: (updatedProduct: barangType) => barangType;
  deleteProduct: (id: number) => void;
  detailProduct: (id: number) => barangType | null;
  detailProductByCode: (kode_barang: string) => number | null;
};

export { barangSchema, barangType, ProductStore };
