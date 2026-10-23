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
    priceNote: "Tergantung promo durasi / paket",
    description: "Dapatkan akses resmi ke model AI tercanggih Google (Gemini 1.5 Pro / Ultra 2.0) dengan integrasi workspace, kuota konteks hingga jutaan token, dan fitur penalaran tinggi.",
    features: [
      "Aktivasi via Link Resmi (Tidak perlu serahkan password email)",
      "Akses Model AI Gemini Advanced tercanggih",
      "Konteks jendela besar untuk analisis dokumen, koding, & naskah",
      "Proses aktivasi kilat (1-5 menit setelah konfirmasi)",
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
    priceNote: "Sesuai tingkat kerumitan soal",
    description: "Bantuan penyelesaian tugas pemrograman dasar untuk siswa SMK jurusan RPL/TKJ atau mahasiswa semester awal. Dilengkapi penjelasan alur kode agar Anda siap saat ditanya guru atau dosen.",
    features: [
      "Kode rapi & bersih sesuai standar penulisan akademis",
      "Diberi komentar penjelasan (comments) di setiap fungsi utama",
      "Bebas plagiasi & anti-deteksi kesamaan kode teman",
      "Garansi revisi jika ada instruksi soal yang belum terpenuhi",
      "Konsultasi singkat cara menjalankan kodingan di laptop Anda"
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
    priceNote: "Disesuaikan jumlah tabel & modul sistem",
    description: "Pengerjaan sistem informasi web lengkap berskala produksi menggunakan framework Laravel dan MySQL. Cocok untuk Uji Kompetensi Keahlian (UKK), tugas besar semester, maupun prototipe bisnis.",
    features: [
      "Arsitektur MVC Laravel terstruktur & aman dari serangan XSS/SQL Injection",
      "Manajemen database relasional MySQL lengkap dengan file migrasi & seeder",
      "Autentikasi multi-role (Admin, Petugas, User/Siswa)",
      "Antarmuka responsif menggunakan Bootstrap atau Tailwind CSS",
      "Dilengkapi file database .sql siap import & instruksi instalasi lengkap",
      "Video panduan singkat demonstrasi alur program"
    ],
    techStack: ["Laravel", "MySQL", "Bootstrap", "Tailwind CSS", "Blade", "AJAX"],
    popular: true,
  },
  {
    id: "joki-android-kotlin",
    category: "coding",
    type: "joki",
    name: "Pengembangan Aplikasi Android (Kotlin)",
    badge: "Aplikasi Mobile",
    priceTag: "Mulai Rp 300.000",
    priceNote: "Disesuaikan dengan fitur & API",
    description: "Pembuatan aplikasi Android native menggunakan bahasa Kotlin modern di Android Studio. Mendukung integrasi RESTful API, database lokal SQLite/Room, dan arsitektur MVVM.",
    features: [
      "Native Android modern menggunakan Kotlin & Android Studio",
      "Integrasi API (Retrofit) ke backend web Laravel / Node.js",
      "Penyimpanan lokal dengan Room Database / SharedPreferences",
      "Disediakan file project utuh + file .APK siap pasang di HP Anda",
      "Garansi build sukses & bebas error Gradle"
    ],
    techStack: ["Kotlin", "Android Studio", "Retrofit", "REST API", "Room DB"],
  },
  {
    id: "bug-fixing",
    category: "coding",
    type: "joki",
    name: "Jasa Bug Fixing & Perbaikan Error Koding",
    badge: "Penyelamat Deadline",
    priceTag: "Mulai Rp 30.000",
    priceNote: "Tergantung tingkat kesulitan bug",
    description: "Kodingan Anda macet, muncul error merah yang membingungkan, atau deadline tinggal hitungan jam? Saya bantu telusuri dan selesaikan masalahnya hingga berjalan normal.",
    features: [
      "Perbaikan error PHP / Laravel (Error 500, Route not found, Migration fail)",
      "Perbaikan query MySQL & relasi foreign key database yang rusak",
      "Perbaikan tampilan CSS / layout responsif yang berantakan di layar HP",
      "Penyelesaian error build Gradle pada project Android Studio",
      "Penjelasan penyebab error agar Anda tahu letak kesalahannya"
    ],
    techStack: ["Laravel", "PHP", "MySQL", "JavaScript", "Kotlin", "CSS"],
  },
];
