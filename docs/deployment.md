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

## Langkah 2: Deploy ke Cloudflare Workers (Static Assets)

Website NASLA DIGITAL telah dikonfigurasi penuh untuk **Cloudflare Workers Static Assets** melalui file `wrangler.jsonc`.

Perintah deploy membaca `CLOUDFLARE_API_TOKEN` dari file `.env` lokal menggunakan Node.js. Buat `.env` berdasarkan `.env.example` jika belum ada, lalu isi token Cloudflare dengan izin yang diperlukan untuk deploy Workers. File `.env` sudah diabaikan Git; jangan menaruh token di source code, `wrangler.jsonc`, atau mengirimkannya ke repository.

1. **Jalankan Build dan Deploy via Script:**
   ```bash
   npm run deploy
   ```
   *Perintah ini secara otomatis menjalankan `npm run build` dan memanggil `wrangler deploy --config wrangler.jsonc`.*

2. **Atau jalankan perintah manual:**
   ```bash
   npm run build
   npx wrangler deploy --config wrangler.jsonc
   ```

3. **Cloudflare Dashboard & Custom Domain (`www.nasla.digital`):**
   - Setelah deploy berhasil, buka Cloudflare Dashboard -> **Compute (Workers & Pages)** -> pilih Worker `nasla-digital`.
   - Masuk ke tab **Settings** -> **Domains & Routes** -> klik **Add** -> pilih **Custom Domain**.
   - Masukkan `www.nasla.digital`. Cloudflare akan membuat record DNS untuk custom domain Worker.

### Konfigurasi domain apex dan HTTPS

Pemeriksaan DNS publik saat ini tidak menemukan record A/AAAA untuk `nasla.digital`. Record apex perlu dibuat di Cloudflare Dashboard sebelum permintaan ke domain tersebut dapat mencapai Cloudflare:

1. Buka zona `nasla.digital` -> **DNS** -> **Records**. Tambahkan atau perbarui record berikut:
   - **Type:** CNAME
   - **Name:** `@`
   - **Target:** `www.nasla.digital`
   - **Proxy status:** Proxied (orange cloud)
   - **TTL:** Auto
   Cloudflare akan melakukan CNAME flattening untuk domain apex. Jangan arahkan record apex ke alamat IP yang ditebak.
2. Buka **Rules** -> **Redirect Rules** -> **Create rule**. Atur:
   - **If incoming requests match:** Custom filter expression `http.host eq "nasla.digital"`.
   - **Target URL:** Dynamic expression `concat("https://www.nasla.digital", http.request.uri.path)`.
   - **Status code:** `301`.
   - Aktifkan **Preserve query string** agar parameter seperti `?source=instagram` tetap dibawa.
3. Buka **SSL/TLS** -> **Edge Certificates**, pastikan sertifikat Universal SSL aktif untuk domain apex dan `www`, lalu aktifkan **Always Use HTTPS**. Redirect Rule di atas mengarahkan permintaan apex langsung ke HTTPS; pengaturan HTTPS otomatis mencakup domain `www`.

Langkah ini harus diterapkan di Dashboard Cloudflare dan tidak dapat dilakukan hanya dengan mengubah file source. Jangan tambahkan `nasla.digital` sebagai Custom Domain Worker jika maksudnya domain apex selalu dialihkan ke `www`.

---

## Langkah 3: Deploy ke Vercel

1. Buat akun di [vercel.com](https://vercel.com) (Gratis).
2. Install Vercel CLI dengan `npm i -g vercel` ATAU hubungkan repository GitHub Anda.
3. Klik **"Add New Project"** -> Pilih repository project Anda.
4. Framework Preset akan otomatis terdeteksi sebagai **Vite**.
5. Klik **"Deploy"**. Website Anda langsung aktif di domain `https://nama-proyek.vercel.app` atau hubungkan custom domain Anda.

---

## Konfigurasi SPA Fallback (Agar Refresh Tidak 404)
- **Cloudflare Workers**: Sudah ditangani otomatis oleh `"not_found_handling": "single-page-application"` di `wrangler.jsonc`.
- **Vercel**: Rute client-side ditangani otomatis untuk aplikasi Vite. Jika menggunakan server Nginx atau Apache konvensional, pastikan URL rewrite diarahkan ke `index.html`.
