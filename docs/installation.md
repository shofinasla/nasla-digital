# Panduan Instalasi — NASLA DIGITAL Business Website Template

Dokumen ini menjelaskan langkah-langkah instalasi dan cara menjalankan template di komputer lokal Anda.

---

## 1. Prasyarat Sistem

Sebelum memulai, pastikan komputer Anda telah terinstal:
- **Node.js**: Versi 18.0.0 atau yang lebih baru (Disarankan versi LTS dari [nodejs.org](https://nodejs.org))
- **NPM** atau **Yarn** atau **PNPM** (sudah terinstal bersama Node.js)
- **Code Editor**: Disarankan menggunakan [Visual Studio Code](https://code.visualstudio.com/)

---

## 2. Langkah Instalasi

1. **Ekstrak File ZIP**
   Ekstrak file ZIP yang telah Anda unduh dari Lynk.id ke direktori komputer Anda.

2. **Buka Terminal**
   Buka folder hasil ekstrak di VS Code, lalu buka Integrated Terminal (`Ctrl + ~` atau `Cmd + ~`).

3. **Install Dependensi**
   Jalankan perintah berikut:
   ```bash
   npm install
   ```
   Tunggu hingga seluruh paket selesai diunduh.

4. **Jalankan Development Server**
   Jalankan perintah:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`. Buka alamat tersebut di browser Anda.

---

## 3. Skrip Perintah Tersedia

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server lokal pengembangan (port 3000) |
| `npm run build` | Melakukan build production ke dalam folder `dist/` |
| `npm run preview` | Meninjau hasil build production secara lokal |
| `npm run lint` | Melakukan pengecekan tipe data TypeScript |
