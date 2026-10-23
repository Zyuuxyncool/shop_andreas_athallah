export type ProductCategory = "all" | "digital" | "coding";

export interface ProductItem {
  id: string;
  category: "digital" | "coding";
  name: string;
  badge?: string;
  rating: number;
  soldCount: number;
  originalPrice?: string;
  priceTag: string;
  priceNumeric: number;
  discountPercentage?: number;
  location: string;
  description: string;
  features: string[];
  techStack?: string[];
  variants?: { name: string; price: number; priceLabel: string }[];
  type: "digital" | "joki";
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "gemini-activation",
    category: "digital",
    type: "digital",
    name: "Link Aktivasi Google Gemini Advanced (Resmi & Bergaransi)",
    badge: "Star Seller",
    rating: 5.0,
    soldCount: 148,
    originalPrice: "Rp 65.000",
    priceTag: "Rp 35.000",
    priceNumeric: 35000,
    discountPercentage: 46,
    location: "Sidoarjo • Kirim Kilat",
    description: "Aktivasi resmi model AI Google Gemini 1.5 Pro & Ultra tercanggih langsung ke akun Google pribadi Anda via tautan resmi tanpa perlu memberikan password email.",
    features: [
      "Aktivasi via tautan resmi langsung ke akun Google pribadi",
      "Tanpa meminta password email (100% aman & terpercaya)",
      "Akses model AI Gemini 1.5 Pro & Ultra untuk koding & riset",
      "Proses aktivasi kilat (1-5 menit setelah pembayaran)",
      "Garansi penuh selama masa aktif langganan",
      "Dipandu sampai berhasil aktif"
    ],
    variants: [
      { name: "Paket 1 Bulan (Link Resmi)", price: 35000, priceLabel: "Rp 35.000" },
      { name: "Paket 2 Bulan (Link Resmi)", price: 65000, priceLabel: "Rp 65.000" },
    ],
  },
  {
    id: "ai-tools-bundle",
    category: "digital",
    type: "digital",
    name: "Akun & Tools AI Produktivitas (Canva Pro / Chat AI / Lisensi Digital)",
    badge: "Produk Digital",
    rating: 4.9,
    soldCount: 76,
    originalPrice: "Rp 40.000",
    priceTag: "Rp 25.000",
    priceNumeric: 25000,
    discountPercentage: 38,
    location: "Sidoarjo • Instan",
    description: "Penyediaan akses dan lisensi akun tools digital untuk pelajar, mahasiswa, dan kreator konten. Praktis, legal, dan langsung aktif.",
    features: [
      "Akses fitur premium tools desain & AI produktivitas",
      "Proses cepat dan langsung bisa digunakan",
      "Garansi penggantian baru jika terjadi kendala",
      "Bantuan panduan login dan aktivasi"
    ],
    variants: [
      { name: "Canva Pro Invite Edu / Tim (1 Tahun)", price: 25000, priceLabel: "Rp 25.000" },
      { name: "Tools AI / Request Khusus", price: 35000, priceLabel: "Rp 35.000" },
    ],
  },
  {
    id: "source-code-template",
    category: "digital",
    type: "digital",
    name: "Source Code & Template Website Modern Siap Pakai",
    badge: "Aset Digital",
    rating: 5.0,
    soldCount: 39,
    originalPrice: "Rp 120.000",
    priceTag: "Rp 50.000",
    priceNumeric: 50000,
    discountPercentage: 58,
    location: "Sidoarjo • File Siap Download",
    description: "Koleksi source code web (Landing page interaktif, CRUD PHP, Dashboard responsif) siap pakai dengan kode rapi, bebas error, dan mudah dikustomisasi.",
    features: [
      "Full Source Code bersih & terdokumentasi rapi",
      "Responsif di layar HP, tablet, dan komputer desktop",
      "Dilengkapi file README petunjuk instalasi",
      "Bebas dipakai untuk proyek pribadi maupun tugas sekolah/kuliah"
    ],
    techStack: ["HTML5", "Tailwind CSS", "PHP Native", "JavaScript"],
    variants: [
      { name: "Template Landing Page Modern", price: 50000, priceLabel: "Rp 50.000" },
      { name: "Template Web CRUD PHP + MySQL", price: 75000, priceLabel: "Rp 75.000" },
    ],
  },
  {
    id: "joki-tugas-dasar",
    category: "coding",
    type: "joki",
    name: "Joki Tugas Koding SMK RPL & Kuliah (Web Dasar, Algoritma, CRUD)",
    badge: "Garansi Nilai",
    rating: 4.9,
    soldCount: 92,
    originalPrice: "Rp 80.000",
    priceTag: "Rp 45.000",
    priceNumeric: 45000,
    discountPercentage: 44,
    location: "Sidoarjo • Pengerjaan Cepat",
    description: "Jasa pengerjaan tugas koding sekolah SMK RPL dan praktikum kuliah. Dikerjakan dengan kode bersih, bebas plagiasi, dan ada catatan penjelasan di tiap baris.",
    features: [
      "Kode orisinal, rapi, dan sesuai instruksi guru/dosen",
      "Diberi komentar (comments) penjelasan alur logika program",
      "Bebas plagiasi & anti-deteksi kesamaan kode teman",
      "Garansi revisi jika ada poin soal yang perlu disesuaikan",
      "Panduan cara menjalankan kodingan di laptop Anda"
    ],
    techStack: ["HTML & CSS", "JavaScript", "PHP Dasar", "Java", "C++", "Python", "MySQL"],
    variants: [
      { name: "Tugas Algoritma / Console Dasar", price: 45000, priceLabel: "Rp 45.000" },
      { name: "Tugas Web Dasar & Form CRUD", price: 75000, priceLabel: "Rp 75.000" },
    ],
  },
  {
    id: "joki-laravel-fullstack",
    category: "coding",
    type: "joki",
    name: "Jasa Pembuatan Web App Laravel Full-Stack (Tugas Akhir / UKK)",
    badge: "Star Seller",
    rating: 5.0,
    soldCount: 28,
    originalPrice: "Rp 400.000",
    priceTag: "Rp 250.000",
    priceNumeric: 25000,
    discountPercentage: 38,
    location: "Sidoarjo • Full Support",
    description: "Pembuatan sistem informasi berbasis web lengkap berskala produksi menggunakan framework Laravel dan MySQL. Cocok untuk UKK SMK RPL, tugas besar semester, atau skripsi.",
    features: [
      "Arsitektur MVC Laravel terstruktur, bersih, dan aman",
      "Database relasional MySQL lengkap dengan migrasi & seeder",
      "Autentikasi multi-role (Admin, Petugas, Siswa/User)",
      "Tampilan modern responsif (Bootstrap atau Tailwind CSS)",
      "File database .sql siap import & panduan setup lengkap",
      "Garansi bimbingan demonstrasi alur program"
    ],
    techStack: ["Laravel", "MySQL", "Bootstrap", "Tailwind CSS", "Blade", "AJAX"],
    variants: [
      { name: "Paket UKK SMK RPL Standar", price: 250000, priceLabel: "Rp 250.000" },
      { name: "Paket Tugas Akhir / Skripsi Lengkap", price: 450000, priceLabel: "Rp 450.000" },
    ],
  },
];
