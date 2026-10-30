# Panduan Kustomisasi Konten & Tampilan

Terdapat dua cara mudah untuk menyesuaikan konten template ini:

---

## Cara 1: Melalui Admin Demo CMS (Tanpa Koding)

1. Buka browser dan ketik alamat: `http://localhost:3000/portal`
2. Masukkan kredensial login:
   - **Username:** `admin` (atau `admin@example.com`)
   - **Password:** `demo-admin`
3. Di panel CMS, Anda dapat mengubah:
   - Nama bisnis, nomor WhatsApp, email, dan alamat
   - Teks Hero Banner & Headline
   - Layanan, harga, dan deliverables
   - Produk, foto/ikon, dan harga
   - Artikel blog & edukasi
   - Testimoni klien & FAQ
4. Klik **"Simpan Perubahan"**. Data akan langsung tersimpan di LocalStorage browser.
5. Gunakan menu **"Seller Kit & Export JSON"** untuk menyalin data JSON jika ingin menyimpannya secara permanen di kode sumber.

---

## Cara 2: Langsung di Kode Sumber (`src/data/`)

Untuk menyimpan konfigurasi secara permanen sebelum build ke production:

1. Buka file `src/config/site.config.ts`:
   - Ubah `siteUrl` dengan domain resmi Anda (contoh: `https://bisnisanda.com`).
2. Buka file `src/data/initialData.ts`:
   - Ubah `initialBusinessConfig` untuk profil usaha.
   - Ubah `initialHeroConfig` untuk headline banner.
   - Ubah `initialServices` untuk daftar layanan.
   - Ubah `initialProducts` untuk produk & portofolio.
   - Ubah `initialBlogPosts` untuk artikel.
3. Simpan file, lalu jalankan `npm run build`.
