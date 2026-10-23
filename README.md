# Andreas Shop • Toko Digital & Jasa Koding
Website resmi toko digital **Andreas Athallah** yang beralamat di [shop.andreas-athallah.web.id](https://shop.andreas-athallah.web.id/). Dibangun dengan **React 19**, **Vite 6**, dan **Tailwind CSS**, dirancang khusus untuk konversi tinggi, kecepatan akses maksimal, serta pengalaman pengguna yang nyaman di mobile maupun desktop.

---

## 🌟 Fitur Utama
1. **Katalog Produk & Jasa Interaktif**:
   - Filter Kategori: *Semua*, *Jasa Koding & Joki Tugas*, dan *Aktivasi Gemini AI*.
   - Kartu penawaran lengkap dengan estimasi harga, rincian fasilitas, tech stack, dan status ketersediaan.
2. **Formulir Pemesanan Otomatis (WhatsApp Direct)**:
   - Dialog pemesanan interaktif (`OrderModal`) yang menyesuaikan input berdasarkan jenis pesanan (nama, deadline, bahasa pemrograman, catatan tugas).
   - Menghasilkan tautan pesan WhatsApp dengan format order yang rapi langsung ke nomor **0857-7330-1211**.
3. **Penyedia Link Aktivasi Google Gemini Advanced**:
   - Menjual aktivasi resmi model Gemini 1.5 Pro / Ultra 2.0 tanpa meminta password email pelanggan (aman & bergaransi).
4. **Alur Pemesanan 3 Langkah Transparan**:
   - Panduan cara order mulai dari konsultasi soal hingga penyerahan kode dan garansi revisi.
5. **Tema Gelap & Terang (Dark/Light Mode)**:
   - Pilihan tema dengan palet warna modern (Emerald/Teal) yang ramah mata.
6. **Integrasi Kembali ke Portofolio**:
   - Navigasi cepat kembali ke portofolio utama [andreas-athallah.web.id](https://andreas-athallah.web.id/).

---

## 🚀 Menjalankan Proyek Secara Lokal

Pastikan Node.js (v18+) sudah terpasang di komputer Anda.

```bash
# 1. Pindah ke direktori proyek
cd /Users/macbookpro/Sites/shop_andreas_athallah

# 2. Pasang dependensi
npm install

# 3. Jalankan server lokal
npm run dev
```

Buka peramban di `http://localhost:3001` untuk melihat tampilan website.

---

## 🌐 Panduan Deploy ke Vercel & Setting Subdomain

### 1. Inisialisasi Git & Push ke GitHub
```bash
git init
git add .
git commit -m "feat: initial release of Andreas Digital Shop"
# Buat repositori baru di GitHub (misal: shop_andreas_athallah), lalu push:
git remote add origin https://github.com/Zyuuxyncool/shop_andreas_athallah.git
git branch -M main
git push -u origin main
```

### 2. Hubungkan ke Vercel
1. Buka dashboard [vercel.com](https://vercel.com/) dan klik **Add New... > Project**.
2. Pilih repositori `shop_andreas_athallah`.
3. Biarkan framework preset terdeteksi sebagai **Vite**.
4. Klik **Deploy**.

### 3. Tambahkan Domain di Vercel
1. Pada project settings di Vercel, buka menu **Settings > Domains**.
2. Masukkan nama domain: `shop.andreas-athallah.web.id`.
3. Vercel akan memberikan petunjuk DNS:
   - **Type**: `CNAME`
   - **Name**: `shop`
   - **Value**: `cname.vercel-dns.com`

### 4. Tambahkan DNS di Provider Domain Anda
1. Masuk ke dashboard DNS penyedia domain (Niagahoster, Hostinger, DomaiNesia, atau Cloudflare).
2. Tambahkan record DNS berikut:
   | Tipe | Nama / Host | Nilai / Target | TTL |
   | --- | --- | --- | --- |
   | **CNAME** | `shop` | `cname.vercel-dns.com` | Otomatis / 3600 |
3. Tunggu proses propagasi DNS (biasanya 5–15 menit).
4. Toko digital Anda di `https://shop.andreas-athallah.web.id` akan aktif dengan sertifikat SSL (HTTPS) gratis dari Vercel!
