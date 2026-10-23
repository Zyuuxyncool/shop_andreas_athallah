export type ProductCategory = "all" | "digital" | "coding";

export interface ProductItem {
  id: string;
  category: "digital" | "coding";
  name: string;
  priceTag: string;
  priceNumeric: number;
  description: string;
  features: string[];
  techStack?: string[];
  variants?: { name: string; price: number; priceLabel: string }[];
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "gemini-activation",
    category: "digital",
    name: "Aktivasi Google Gemini Pro (18 Bulan)",
    priceTag: "Rp 25.000",
    priceNumeric: 25000,
    description: "Akses resmi Google Gemini Pro dengan durasi panjang 18 bulan langsung ke akun Google pribadi via link resmi tanpa perlu memberikan password email.",
    features: [
      "Masa aktif panjang 18 Bulan",
      "Aktivasi via tautan resmi langsung ke akun pribadi",
      "Tanpa meminta password email (100% aman & terpercaya)",
      "Akses model AI Gemini Pro untuk koding, tugas, & riset",
      "Garansi penuh selama masa aktif",
      "Dipandu langsung sampai berhasil aktif"
    ],
    variants: [
      { name: "Paket 18 Bulan (Resmi)", price: 25000, priceLabel: "Rp 25.000" },
    ],
  },
  {
    id: "ai-tools-bundle",
    category: "digital",
    name: "Akun & Tools AI Produktivitas",
    priceTag: "Rp 25.000",
    priceNumeric: 25000,
    description: "Penyediaan akses dan lisensi akun tools digital untuk pelajar, mahasiswa, dan kreator konten. Praktis, legal, dan langsung aktif.",
    features: [
      "Akses fitur premium tools desain & AI",
      "Proses cepat dan langsung bisa digunakan",
      "Garansi penggantian baru jika berkendala",
      "Bantuan panduan login dan aktivasi"
    ],
    variants: [
      { name: "Canva Pro Invite Edu / Tim", price: 25000, priceLabel: "Rp 25.000" },
      { name: "Tools AI / Request Khusus", price: 35000, priceLabel: "Rp 35.000" },
    ],
  },
  {
    id: "source-code-template",
    category: "digital",
    name: "Source Code & Template Website Siap Pakai",
    priceTag: "Rp 50.000",
    priceNumeric: 50000,
    description: "Koleksi source code web (Landing page interaktif, CRUD PHP, Dashboard responsif) siap pakai dengan kode rapi dan bebas error.",
    features: [
      "Full source code bersih & terdokumentasi",
      "Responsif di layar HP, tablet, dan desktop",
      "File README petunjuk instalasi lengkap",
      "Bebas digunakan untuk tugas atau proyek pribadi"
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
    name: "Joki Tugas Koding SMK RPL & Kuliah",
    priceTag: "Rp 45.000",
    priceNumeric: 45000,
    description: "Jasa pengerjaan tugas koding sekolah SMK RPL dan praktikum kuliah. Dikerjakan dengan kode bersih, bebas plagiasi, dan ada penjelasan logika program.",
    features: [
      "Kode orisinal sesuai instruksi guru/dosen",
      "Diberi komentar penjelasan alur logika di setiap fungsi",
      "Bebas plagiasi & anti-deteksi kesamaan kode",
      "Garansi revisi jika ada poin tugas yang perlu disesuaikan",
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
    name: "Pembuatan Web App Laravel Full-Stack",
    priceTag: "Rp 250.000",
    priceNumeric: 250000,
    description: "Pembuatan sistem informasi berbasis web lengkap berskala produksi menggunakan Laravel dan MySQL. Cocok untuk UKK SMK RPL, tugas besar, atau skripsi.",
    features: [
      "Arsitektur MVC Laravel terstruktur & bersih",
      "Database MySQL lengkap dengan file migrasi & seeder",
      "Autentikasi multi-role (Admin, Petugas, User)",
      "Tampilan modern responsif (Bootstrap / Tailwind)",
      "File database .sql siap import & panduan setup",
      "Garansi bimbingan demonstrasi alur program"
    ],
    techStack: ["Laravel", "MySQL", "Bootstrap", "Tailwind CSS", "Blade", "AJAX"],
    variants: [
      { name: "Paket UKK SMK RPL Standar", price: 250000, priceLabel: "Rp 250.000" },
      { name: "Paket Tugas Akhir / Skripsi Lengkap", price: 450000, priceLabel: "Rp 450.000" },
    ],
  },
];
