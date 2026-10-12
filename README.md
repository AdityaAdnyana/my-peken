# MyPeken — Marketplace UMKM Lokal Wilayah Sarbagita (Bali)

**MyPeken** adalah platform *marketplace* berbasis lokasi (*Location-Based Service*) yang dirancang untuk mewadahi dan mendigitalisasi pelaku UMKM lokal di Provinsi Bali, khususnya kawasan **Sarbagita (Denpasar, Badung, Gianyar, dan Tabanan)**. Platform ini mengintegrasikan pembukaan toko berstandar KYC dengan validasi koordinat GPS, transaksi aman berbasis rekening bersama (*Escrow*), kalkulasi logistik otomatis, pencairan dana *real-time* (*Disbursement*), serta asisten pelanggan pintar berbasis AI.

**Desain UI/UX:** https://www.figma.com/design/H75A4PbI7NiACWFYe9bQ2J/Untitled?node-id=0-1&t=KOchgcipULN2Q972-1

## Fitur Utama (Key Features)

Fitur dalam ekosistem **MyPeken** dirancang menggunakan arsitektur **Unified Account (Single Identity)**, di mana setiap pengguna dapat langsung berbelanja sebagai Pembeli dan dapat mengajukan pembukaan toko kapan saja untuk menjadi Penjual UMKM, serta dikelola oleh Administrator:

### Autentikasi & Manajemen Akun

- **Google OAuth & WhatsApp OTP:** Autentikasi dua langkah menggunakan akun Google yang dilanjutkan dengan verifikasi 6 digit kode OTP melalui WhatsApp.
- **Unified Account & Mode Switching:** Akun pengguna otomatis aktif dengan akses standar **Pembeli (Buyer)** setelah verifikasi OTP. Pengguna dapat membuka toko melalui tombol *"Buka Toko Gratis"* di halaman Profil, atau beralih antarmuka secara mulus antara mode Pembeli dan **Dashboard Toko (Seller)** jika toko sudah aktif.
- **Pengaturan Profil & Buku Alamat:** Pengelolaan daftar alamat pengiriman lengkap dengan titik koordinat GPS serta penentuan *Alamat Utama* sebagai acuan *default checkout* dan pencarian lokasi terdekat.

### Fitur Pembeli (Buyer)

- **Eksplorasi Berbasis Lokasi & Filter Lanjutan:** Pencarian produk dan toko UMKM terdekat berdasarkan radius kilometer menggunakan Google Maps API (dengan *fallback* otomatis ke Alamat Utama jika izin GPS ditolak), dilengkapi filter kategori dan urutan harga.
- **Single-Seller Cart, Validasi Toko Sendiri & Kalkulasi Ongkir:** Manajemen keranjang belanja satu toko per *checkout*, dilengkapi validasi sistem yang mencegah pengguna membeli produk dari tokonya sendiri (anti-manipulasi transaksi/rating), serta perhitungan ongkos kirim otomatis via API Logistik.
- **Transaksi Aman dengan Escrow:** Pembayaran terintegrasi *Payment Gateway* (Transfer Bank, E-Wallet, QRIS) di mana dana ditahan di rekening bersama hingga pesanan dikonfirmasi selesai atau otomatis diteruskan setelah $2 \times 24$ jam barang berstatus terkirim.
- **Asisten Virtual AI (Groq API) & Pelacakan Pesanan:** *Floating chat* berbahasa Indonesia yang mampu menjawab FAQ, mengecek status pengiriman secara *real-time* berdasarkan Nomor Pesanan langsung dari *database*, serta fitur eskalasi ke Admin.
- **Dompet Refund & Penarikan Instan:** Pengembalian dana otomatis akibat pembatalan pesanan ke *Saldo Saya* yang dapat ditarik langsung ke rekening bank pribadi secara *real-time* melalui *API Disbursement*.
- **Ulasan & Rating Produk:** Pemberian *rating* bintang (1–5) beserta foto ulasan untuk pesanan yang telah selesai.

### Fitur Penjual (Seller UMKM)

- **Pembukaan Toko, KYC & Geofencing Sarbagita:** Pengajuan pembukaan toko dari halaman Profil dengan mengisi profil dasar toko (Nama Toko unik, Deskripsi, dan Logo), unggah KTP & *selfie* KTP, kesesuaian nama rekening bank, serta validasi titik koordinat GPS khusus area Sarbagita (selama status *Menunggu Verifikasi Admin* atau *Ditolak*, akun tetap dapat digunakan berbelanja normal sebagai pembeli).
- **Manajemen Etalase & Multi-Varian (CRUD):** Pengelolaan katalog produk lengkap mencakup kategori, stok, berat, visibilitas produk (*hide/show*), serta pengaturan varian dinamis (ukuran, level pedas, dll.).
- **Pemrosesan Pesanan & Booking Kurir Instan:** Pengelolaan pesanan masuk dengan input resi manual untuk ekspedisi reguler, atau pemanggilan kurir otomatis (*auto-booking driver*) via API Logistik untuk pengiriman *instant/same-day*.
- **Penarikan Pendapatan Otomatis (Real-time Payout):** Pencairan saldo pendapatan toko langsung ke rekening bank terdaftar (terkunci sesuai KYC) yang diproses otomatis saat itu juga melalui *API Disbursement Payment Gateway*.

### Fitur Administrator

- **Verifikasi & Persetujuan Toko Baru:** Panel peninjauan profil toko baru (Nama, Deskripsi, Logo), dokumen KYC (KTP, Selfie KTP, Rekening Bank), dan titik lokasi GPS UMKM beserta pengiriman notifikasi status persetujuan otomatis via WhatsApp.
- **Pusat Resolusi Konflik (Dispute Center):** Mediasi komplain antara pembeli dan penjual melalui peninjauan bukti *unboxing*, riwayat percakapan, manajemen alur retur barang, hingga keputusan alokasi dana *Escrow*.
- **Manajemen Skema Biaya Layanan Dinamis:** Konfigurasi fleksibel tarif biaya layanan platform bertingkat (minimum 1% berdasarkan rentang harga untuk produk fisik UMKM) yang dibebankan pada tagihan akhir *checkout* pembeli.
- **Moderasi Ekosistem & Master Data (Suspend Toko vs Akun):** Pemantauan seluruh data pengguna, toko, dan produk dengan wewenang terpisah antara **Suspend Toko** (menyembunyikan etalase & menghentikan pesanan baru sementara/permanen, wajib menyelesaikan pesanan berjalan, namun pemilik masih bisa *login* sebagai Pembeli), **Suspend Akun Pengguna** (pemblokiran akses *login* total), serta **Hapus Produk**.

---

## Tech Stack & Integrasi API

### Pengembangan Aplikasi

- **Fullstack Framework:** Next.js
- **UI & Styling:** Tailwind CSS
- **Database:** MySQL
- **Authentication & Session:** Auth.js (NextAuth)

### Layanan Pihak Ketiga (Third-Party APIs)

- **Authentication:** Google OAuth 2.0 API
- **Messaging & OTP:** WhatsApp Gateway API (OTP & Notifikasi Status KYC)
- **Maps & Geolocation:** Google Maps API (Geocoding, Pin Maps & Radius LBS)
- **AI Customer Service:** Groq Cloud API (LLM dengan *Function Calling* ke API Internal)
- **Payment & Disbursement:** Midtrans API / Setara (Payment Gateway, Webhook & Payout/Disbursement)
- **Logistics & Shipping:** Third-Party Logistics API (Cek Ongkir & *Instant Courier Booking*)

---

## Tim Pengembang & Pembagian Modul

Proyek ini dikembangkan oleh kelompok beranggotakan 5 orang dengan total beban kerja **12 Modul** yang mencakup **20 Functional Requirements (MVP)**:

- **I Putu Gde Aditya Stiti A**
  - Modul Eksplorasi, Pencarian LBS (Lokasi Terdekat) & Filter Produk (`FR-011`, `FR-026`)
  - Modul Payment Gateway, Sistem Escrow & Pemrosesan Pesanan Pengiriman (`FR-008`, `FR-014`)
  - Modul Master Data & Moderasi Ekosistem: Suspend Toko/Akun & Hapus Produk (`FR-018`)

- **Farid Abdurrochman A**
  - Modul Manajemen Etalase, CRUD Produk & Varian (`FR-005`)
  - Modul Dompet Digital & Penarikan Dana Otomatis / Disbursement (`FR-015`, `FR-025`)
  - Modul Asisten Virtual AI Customer Service (Groq API) & Eskalasi Live Chat (`FR-003`)

- **I Gede Putu Artha Jaya Winangun**
  - Modul Pembukaan Toko, Verifikasi KYC Penjual & Persetujuan Admin (`FR-004`, `FR-027`)
  - Modul Pembatalan Pesanan, Komplain, Resolusi Konflik Admin & Retur Barang (`FR-020`, `FR-021`, `FR-010`)

- **Muhammad Rasyid Isnain Chandra**
  - Modul Keranjang Belanja (Single-Seller), Kalkulasi Ongkir Logistik & Skema Biaya Layanan (`FR-023`, `FR-012`, `FR-009`)
  - Modul Sistem Penilaian (Rating) & Ulasan Produk (`FR-013`)

- **Daffa' Azhar**
  - Modul Autentikasi Pengguna (Google OAuth & OTP WhatsApp) & Beralih Mode (`FR-001`)
  - Modul Pengaturan Profil Pengguna & Manajemen Buku Alamat Pengiriman (`FR-024`)

### Pemetaan Lengkap Functional Requirements (FR)

- **FR-001 — Autentikasi Pengguna (Google OAuth & OTP WhatsApp)**
  - Kategori: Autentikasi & Keamanan
  - PIC: Daffa' Azhar
- **FR-003 — Asisten Virtual Layanan Pelanggan Berbasis AI (Groq API)**
  - Kategori: Fitur Pembeli & Admin
  - PIC: Farid Abdurrochman A
- **FR-004 — Pembukaan Toko & Verifikasi Identitas Penjual (KYC)**
  - Kategori: Fitur Penjual
  - PIC: I Gede Putu Artha Jaya Winangun
- **FR-005 — Manajemen Etalase & Varian Produk (CRUD)**
  - Kategori: Fitur Penjual
  - PIC: Farid Abdurrochman A
- **FR-008 — Integrasi Payment Gateway & Sistem Rekening Bersama (Escrow)**
  - Kategori: Transaksi & Pembayaran
  - PIC: I Putu Gde Aditya Stiti A
- **FR-009 — Manajemen Skema Biaya Layanan Platform**
  - Kategori: Transaksi & Admin
  - PIC: Muhammad Rasyid Isnain Chandra
- **FR-010 — Panel Admin untuk Resolusi Konflik (Komplain)**
  - Kategori: Transaksi & Admin
  - PIC: I Gede Putu Artha Jaya Winangun
- **FR-011 — Pencarian Produk/Toko Berbasis Lokasi (LBS) Terdekat**
  - Kategori: Fitur Pembeli
  - PIC: I Putu Gde Aditya Stiti A
- **FR-012 — Kalkulasi Otomatis Ongkos Kirim (Integrasi Logistik)**
  - Kategori: Fitur Pembeli
  - PIC: Muhammad Rasyid Isnain Chandra
- **FR-013 — Sistem Penilaian (Rating) dan Ulasan Produk**
  - Kategori: Fitur Pembeli
  - PIC: Muhammad Rasyid Isnain Chandra
- **FR-014 — Pemrosesan Pesanan & Input Resi Pengiriman**
  - Kategori: Fitur Penjual
  - PIC: I Putu Gde Aditya Stiti A
- **FR-015 — Penarikan Saldo Pendapatan Toko (Withdrawal)**
  - Kategori: Fitur Penjual
  - PIC: Farid Abdurrochman A
- **FR-018 — Moderasi Akun Pengguna & Produk (Suspend/Hapus)**
  - Kategori: Fitur Admin
  - PIC: I Putu Gde Aditya Stiti A
- **FR-020 — Konfirmasi Penerimaan Pesanan & Pengajuan Komplain**
  - Kategori: Transaksi & Pembeli
  - PIC: I Gede Putu Artha Jaya Winangun
- **FR-021 — Pembatalan Pesanan & Pengembalian Dana (Refund) Otomatis**
  - Kategori: Transaksi
  - PIC: I Gede Putu Artha Jaya Winangun
- **FR-023 — Manajemen Keranjang & Checkout hanya satu Toko**
  - Kategori: Fitur Pembeli
  - PIC: Muhammad Rasyid Isnain Chandra
- **FR-024 — Manajemen Buku Alamat Pengiriman Pembeli**
  - Kategori: Fitur Pembeli
  - PIC: Daffa' Azhar
- **FR-025 — Manajemen & Penarikan Saldo Refund Pembeli**
  - Kategori: Fitur Pembeli
  - PIC: Farid Abdurrochman A
- **FR-026 — Pencarian Lanjutan & Filter Produk (Kategori/Harga)**
  - Kategori: Fitur Pembeli
  - PIC: I Putu Gde Aditya Stiti A
- **FR-027 — Tinjauan & Persetujuan Verifikasi Toko Baru (Admin)**
  - Kategori: Fitur Admin
  - PIC: I Gede Putu Artha Jaya Winangun
