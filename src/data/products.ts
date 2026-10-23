export type ProductCategory = "all" | "coding" | "ai";

export interface ProductItem {
  id: string;
  category: "coding" | "ai";
  name: string;
  badge?: string;
  priceTag: string;
  priceNote?: string;
  description: string;
  features: string[];
  techStack?: string[];
  popular?: boolean;
  type: "joki" | "gemini";
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "gemini-activation",
    category: "ai",
    type: "gemini",
    name: "Link Aktivasi Google Gemini Advanced",
    badge: "Terlaris • Proses Kilat",
    priceTag: "Mulai Rp 35.000",
    priceNote: "Aktivasi via link resmi tanpa password",
    description: "Akses resmi ke model AI Gemini 1.5 Pro & Ultra tercanggih dari Google dengan jendela konteks besar, kemampuan penalaran coding presisi, dan analisis dokumen kompleks.",
    features: [
      "Aktivasi via tautan resmi langsung ke akun Google pribadi Anda",
      "Tanpa meminta password email (100% aman & terpercaya)",
      "Akses model AI Gemini Advanced tercanggih untuk koding & riset",
      "Proses instan (1-5 menit setelah konfirmasi pembayaran)",
      "Garansi penuh sesuai durasi langganan",
      "Panduan aktivasi step-by-step sampai berhasil"
    ],
    popular: true,
  },
  {
    id: "joki-tugas-dasar",
    category: "coding",
    type: "joki",
    name: "Joki Tugas Koding SMK RPL & Kuliah Dasar",
    badge: "Ramah Pelajar",
    priceTag: "Mulai Rp 45.000",
    priceNote: "Disesuaikan tingkat kerumitan soal",
    description: "Bantuan penyelesaian tugas praktikum dan pemrograman dasar untuk siswa SMK RPL atau mahasiswa tingkat awal. Kode terstruktur rapi dan disertai komentar penjelasan.",
    features: [
      "Kode orisinal, rapi, dan sesuai instruksi guru/dosen",
      "Dilengkapi komentar (comments) penjelasan alur logika program",
      "Bebas plagiasi & aman dari kesamaan kode teman",
      "Garansi revisi jika ada poin soal yang perlu disesuaikan",
      "Panduan cara menjalankan kodingan di laptop Anda"
    ],
    techStack: ["HTML & CSS", "JavaScript", "PHP Dasar", "Java", "C++", "Python", "MySQL"],
  },
  {
    id: "joki-laravel-fullstack",
    category: "coding",
    type: "joki",
    name: "Pembuatan Web App Laravel Full-Stack",
    badge: "Tugas Akhir / UKK / Skripsi",
    priceTag: "Mulai Rp 250.000",
    priceNote: "Sesuai jumlah modul & kompleksitas sistem",
    description: "Pembuatan sistem informasi berbasis web lengkap berskala produksi menggunakan framework Laravel dan MySQL. Cocok untuk UKK SMK, tugas besar semester, atau proyek aplikasi siap pakai.",
    features: [
      "Arsitektur MVC Laravel terstruktur, bersih, dan aman",
      "Database relasional MySQL lengkap dengan file migrasi & seeder",
      "Autentikasi multi-role (Admin, Petugas, Siswa/User)",
      "Tampilan modern responsif (Bootstrap atau Tailwind CSS)",
      "File database .sql siap import & panduan setup lengkap",
      "Garansi bimbingan demonstrasi alur program"
    ],
    techStack: ["Laravel", "MySQL", "Bootstrap", "Tailwind CSS", "Blade", "AJAX"],
    popular: true,
  },
];
