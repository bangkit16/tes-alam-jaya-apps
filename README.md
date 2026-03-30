# Aplikasi Manajemen Inventaris Alam Jaya Textile

Aplikasi **Alam Jaya Textile** adalah sebuah aplikasi mobile yang dibuat menggunakan React Native (Expo) untuk mempermudah manajemen stok dan data barang/inventaris textile.

## 🚀 Fitur Aplikasi

1. **Autentikasi Pengguna**: Sistem Login aman untuk membatasi akses aplikasi hanya kepada pengguna yang berhak.
2. **Manajemen Barang (CRUD)**:
   - **Daftar Barang**: Melihat seluruh daftar barang yang tersedia beserta rincian informasi dasar.
   - **Tambah Barang**: Memasukkan data barang baru seperti Nama Barang, Kode Barang, Harga, dan Stok.
   - **Edit Barang**: Memperbarui informasi barang yang sudah ada.
   - **Hapus Barang**: Menghapus data barang dari sistem dengan konfirmasi keamanan.
3. **Detail Barang & QR Code**:
   - Melihat rincian lengkap mengenai sebuah barang.
   - Terdapat fitur mendapatkan QR Code secara otomatis berdasarkan Kode Barang untuk keperluan pelacakan.
4. **Scan QR Code**: Fitur pemindai/scanner (kamera) bawaan untuk melakukan scan QR Code barang fisik secara langsung.
5. **Pencarian & Real-time Update**: Dilengkapi sinkronisasi data yang cepat (menggunakan React Query) sehingga setiap perubahan stok atau data akan diperbarui secara real-time.

## ⚙️ Cara Instalasi & Menjalankan Aplikasi

Ikuti panduan ini untuk menjalankan aplikasi di development environment:

### 1. Instalasi Dependensi

Pastikan Anda berada di root direktori aplikasi, lalu unduh semua package yang dibutuhkan dengan menjalankan:

```bash
npm install
```

### 2. Menjalankan Server Expo

Setelah proses instalasi selesai, jalankan server dengan perintah:

```bash
npx expo start
```

_Atau alternatif lain: `npm start` atau `npm run dev`._

### 3. Membuka Aplikasi

Setelah server berjalan, sebuah QR Code akan muncul di terminal. Pilih salah satu cara berikut untuk membuka aplikasi:

- **Menggunakan HP Langsung (Disarankan untuk mengetes fitur kamera)**:
  1. Unduh aplikasi **Expo Go** (tersedia di App Store untuk iOS dan Play Store untuk Android).
  2. _Penting: Pastikan Handphone dan Komputer/Laptop Anda terkoneksi ke jaringan Wi-Fi/Internet yang sama._
  3. Buka Expo Go, lalu **Scan QR Code** yang muncul di terminal komputer Anda.
- **Menggunakan Android Emulator**: Tekan tombol `a` pada command/terminal jika emulator Android telah terbuka.
- **Menggunakan iOS Simulator (khusus Mac OS)**: Tekan tombol `i` pada terminal jika Xcode Simulator terbuka.

---

## 📖 Cara Penggunaan Aplikasi (Use Case)

1. **Proses Login**: Buka aplikasi dan Anda akan diarahkan ke halaman Login. Masukkan kredensial login Anda untuk masuk ke sistem.
2. **Melihat dan Menambah Barang**:
   - Anda akan melihat daftar barang di halaman utama.
   - Anda juga dapat menekan "Tambah Barang" untuk mencatat stok item textile yang baru pada gudang dengan memasukkan data barang serta Harga/Stok yang berupa angka.
3. **Penggunaan QR Scanner**: Ketuk ikon atau tombol kamera/Scan, arahkan kamera ke QR code fisik suatu barang (biasanya menempel pada barang). Aplikasi akan membaca kode dan secara rinci masuk ke halaman barang terkait.
4. **Detail & Edit**: Melalui menu detail, Anda dapat memperbarui informasi (misalnya ada penambahan Stok) atau bahkan mencetak/menampilkan QR code barang tersebut.
5. **Logout**: Tekan tombol Logout jika sesi/penggunaan aplikasi telah beres untuk menjaga keamanan data.
