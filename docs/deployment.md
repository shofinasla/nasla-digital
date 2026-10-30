# Panduan Deployment ke Hosting Gratis

Setelah selesai menyesuaikan konten, Anda dapat mempublikasikan website ke internet secara gratis menggunakan layanan hosting modern.

---

## Langkah 1: Build Production
Buka terminal dan jalankan:
```bash
npm run build
```
Perintah ini akan mengompilasi dan mengoptimasi seluruh kode ke dalam folder `dist/`.

---

## Langkah 2: Deploy ke Vercel (Rekomendasi)

1. Buat akun di [vercel.com](https://vercel.com) (Gratis).
2. Install Vercel CLI dengan `npm i -g vercel` ATAU hubungkan repository GitHub Anda.
3. Klik **"Add New Project"** -> Pilih repository project Anda.
4. Framework Preset akan otomatis terdeteksi sebagai **Vite**.
5. Klik **"Deploy"**. Website Anda langsung aktif di domain `https://nama-proyek.vercel.app` atau hubungkan custom domain Anda.

---

## Langkah 3: Deploy ke Netlify

1. Buat akun di [netlify.com](https://netlify.com).
2. Masuk ke tab **Sites** -> **Add new site** -> **Deploy manually**.
3. Cukup seret (drag and drop) folder `dist` hasil build ke area upload browser.
4. Website Anda langsung live dalam beberapa detik!

---

## Konfigurasi SPA Fallback (Agar Refresh Tidak 404)
Untuk Netlify atau Vercel, seluruh rute client-side (`/about`, `/services`, dll.) otomatis diarahkan ke `index.html`. Jika menggunakan server Nginx atau Apache konvensional, pastikan URL rewrite diarahkan ke `index.html`.
