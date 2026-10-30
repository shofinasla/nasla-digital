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
   - Masukkan `www.nasla.digital` (dan `nasla.digital` jika diinginkan). Cloudflare akan otomatis mengarahkan traffic DNS zone ke Worker Anda.

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
- **Cloudflare Pages**: Fallback SPA ditangani otomatis selama tidak ada `404.html` khusus di folder publik.
- **Vercel**: Rute client-side ditangani otomatis untuk aplikasi Vite. Jika menggunakan server Nginx atau Apache konvensional, pastikan URL rewrite diarahkan ke `index.html`.
