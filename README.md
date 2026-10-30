# Nasla Digital Business Website Template

> **Solusi Digital Untuk Masa Depan**  
> Template Website Bisnis, Profil Perusahaan, dan UMKM Profesional Siap Jual.  
> **Versi:** 1.0.0 (Stable Commercial Release)  
> **Author:** NASLA DIGITAL  

---

## 📋 Table of Contents
1. [Product Overview](#product-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Development](#development)
6. [Build](#build)
7. [Preview](#preview)
8. [Customization](#customization)
9. [Site Configuration](#site-configuration)
10. [Admin Dashboard](#admin-dashboard)
11. [Demo Login](#demo-login)
12. [Presets](#presets)
13. [Services](#services)
14. [Products](#products)
15. [Blog](#blog)
16. [WhatsApp](#whatsapp)
17. [Theme](#theme)
18. [SEO](#seo)
19. [Deployment](#deployment)
    - [Vercel](#vercel)
    - [Netlify](#netlify)
    - [Cloudflare Pages](#cloudflare-pages)
    - [Static Hosting](#static-hosting)
20. [Reset Demo Data](#reset-demo-data)
21. [Troubleshooting](#troubleshooting)
22. [Production Security](#production-security)
23. [License](#license)
24. [Support](#support)

---

## Product Overview
**NASLA DIGITAL — Business Website Template** adalah produk digital berupa source code website bisnis siap pakai dan mudah dikustomisasi. Template ini dirancang untuk dapat digunakan oleh berbagai jenis bidang usaha: UMKM, perusahaan korporat, agensi kreatif, kontraktor, kuliner & resto, kantor konsultan, maupun distributor B2B.

Template ini bekerja secara mandiri tanpa ketergantungan pada database backend yang rumit, sehingga pembeli dapat langsung menjalankan dan mendistribusikannya ke web hosting gratis seperti Vercel atau Netlify.

---

## Features
- **Multi-Page Ready:** Rute publik `/`, `/about`, `/services`, `/products`, `/blog`, `/contact`, dan `/404`.
- **Admin Demo CMS:** Panel kelola konten di `/portal` berbasis LocalStorage dengan fitur Reset Demo.
- **5 Industry Presets:** Ubah seluruh website dalam 1-klik untuk 5 industri (Agency, Kontraktor, Kuliner, Legal, Distributor).
- **Direct WhatsApp Order System:** Keranjang belanja & formulir konsultasi otomatis membuat pesan terformat rapi ke WhatsApp.
- **Modern UI/UX Design:** Palet warna Deep Navy, Dark Blue, Electric Blue, Cyan, dan Glassmorphism accents.
- **100% Responsive:** Tampilan rapi di semua resolusi layar (Mobile, Tablet, Desktop).
- **SEO Ready:** Dilengkapi OpenGraph, sitemap.xml, dan robots.txt.

---

## Tech Stack
- **Framework:** React 19 + Vite + TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Storage:** LocalStorage Service dengan fallback aman

---

## Installation
Pastikan komputer Anda telah terinstal **Node.js (versi 18+)**.

```bash
# 1. Ekstrak file ZIP template
# 2. Buka terminal di folder project
npm install
```

---

## Development
Jalankan server lokal:
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

---

## Build
Kompilasi kode ke mode produksi:
```bash
npm run build
```
Hasil build berada di folder `dist/`.

---

## Preview
Tinjau hasil build produksi secara lokal:
```bash
npm run preview
```

---

## Customization
Anda dapat mengubah konten melalui dua cara:
1. **Melalui Admin CMS (`/portal`):** Ubah teks, layanan, produk, dan preset langsung dari antarmuka visual.
2. **Langsung di Kode Sumber (`src/data/`):** Edit `src/data/initialData.ts` untuk perubahan permanen sebelum build.

---

## Site Configuration
Pusat pengaturan global berada di `src/config/site.config.ts`. Anda dapat mengganti `siteUrl`, nama template, dan kredensial demo.

---

## Admin Dashboard
Akses panel admin di alamat:
```text
http://localhost:3000/portal
```
Panel menyediakan pengelolaan modul:
- Profil Bisnis & Kontak
- Hero Banner & Teks Headline
- Layanan & Paket Harga
- Produk & Portofolio
- Artikel Blog
- Tentang Usaha, Visi Misi & Tim
- Testimoni & FAQ
- Seller Kit & Export JSON

---

## Demo Login
- **Username / Email:** `admin` / `admin@example.com`
- **Password:** `demo-admin`

> *Catatan: Autentikasi ini ditujukan untuk mode demonstrasi lokal template.*

---

## Presets
Tersedia 5 preset bawaan:
1. **Digital Agency & Tech Studio**
2. **Mitra Bangun — Contractor & Architecture**
3. **Rasa Tradisi — F&B & UMKM Kuliner**
4. **Optima Partner — Legal & Tax Consultant**
5. **Logix Supply — Distributor & B2B Supply**

---

## Services
Daftar 6 kartu layanan lengkap dengan rincian benefit, estimasi harga, dan tombol konsultasi WhatsApp.

---

## Products
Katalog produk / portofolio interaktif dengan filter kategori, live search, quick view modal, dan keranjang belanja.

---

## Blog
Halaman blog edukasi dengan filter topik, estimasi waktu baca, pembaca modal artikel, dan tombol share WhatsApp.

---

## WhatsApp
Seluruh pemesanan dan formulir kontak diformat otomatis oleh `src/utils/whatsapp.ts` dan langsung membuka aplikasi WhatsApp pengelola.

---

## Theme
Palet warna default:
- Deep Navy: `#071A3D`
- Dark Blue: `#0B3D91`
- Electric Blue: `#006EFF`
- Cyan: `#00BFFF`
- Background: `#F8FAFC` & White

---

## SEO & Custom Domain (www.nasla.digital)
Website ini telah dikonfigurasi penuh dan teroptimasi untuk domain **`www.nasla.digital`**:
- **Canonical URL:** `https://www.nasla.digital/`
- **OpenGraph & Twitter Cards:** Terhubung ke `https://www.nasla.digital/logo.png`
- **Schema.org Structured Data (JSON-LD):** Type `Organization` & `WebSite` resmi di `index.html`
- **Robots.txt:** `public/robots.txt` mengarah ke `https://www.nasla.digital/sitemap.xml`
- **Sitemap XML:** `public/sitemap.xml` berisi seluruh index rute publik
- **SPA Fallback:** `public/_redirects` memastikan refresh di semua rute (`/about`, `/services`, `/products`, `/blog`, `/contact`) berjalan lancar di Netlify & Cloudflare Pages.
- **CNAME:** `public/CNAME` siap pakai untuk custom domain hosting.

---

## Deployment & Konfigurasi DNS Domain

### 1. Vercel
1. Hubungkan repository ke [Vercel](https://vercel.com) (Framework: **Vite**).
2. Di Vercel Dashboard, masuk ke menu **Settings** > **Domains**.
3. Tambahkan domain: `www.nasla.digital` dan redirect apex `nasla.digital` ke `www.nasla.digital`.
4. Konfigurasi DNS di registrar domain Anda:
   - **CNAME Record:** Host: `www` &rarr; Target: `cname.vercel-dns.com`
   - **A Record:** Host: `@` &rarr; Target: `76.76.21.21`

### 2. Netlify
1. Masuk ke [Netlify](https://netlify.com) > **Domain Management** > **Add custom domain**.
2. Masukkan `www.nasla.digital`.
3. Konfigurasi DNS di registrar:
   - **CNAME Record:** Host: `www` &rarr; Target: `<nama-site>.netlify.app`
   - **A Record:** Host: `@` &rarr; Target: `75.2.60.5`

### 3. Cloudflare Pages & Cloudflare DNS (nasla.digital)
Website ini telah dikonfigurasi secara spesifik untuk Cloudflare Pages & Zone DNS `nasla.digital`:

- **Account ID:** `23285908b710e298116f9ce010a44035`
- **Zone ID (nasla.digital):** `d1b484ce93921036c690d193c4edccfb`
- **Custom Domain:** `www.nasla.digital`
- **Apex Domain:** `nasla.digital`

#### Cara A: Deploy Otomatis via Cloudflare Dashboard
1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com) dengan akun Anda (`Account ID: 23285908b710e298116f9ce010a44035`).
2. Masuk ke **Compute (Workers & Pages)** > **Create application** > Tab **Pages** > **Connect to Git** (atau **Direct Upload** folder `dist`).
3. Konfigurasi Build Settings:
   - **Framework Preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Setelah build selesai, buka menu **Custom Domains** pada project Pages:
   - Tambahkan domain: `www.nasla.digital`
   - Tambahkan apex domain: `nasla.digital` (pilih opsi redirect otomatis ke `www.nasla.digital`)

#### Cara B: Deploy Instan via Wrangler CLI
```bash
# 1. Build aplikasi ke production
npm run build

# 2. Deploy langsung ke Cloudflare Pages
npm run deploy:cf
```
*(Atau gunakan perintah: `npx wrangler pages deploy dist --project-name=nasla-digital`)*

#### Pengaturan DNS Cloudflare (Zone: nasla.digital)
Pada menu **DNS** > **Records** di zona `nasla.digital`:
| Type | Name | Content / Target | Proxy status | TTL |
|------|------|------------------|--------------|-----|
| CNAME | `www` | `nasla-digital.pages.dev` | Proxied (Orange Cloud) | Auto |
| CNAME | `@` | `nasla-digital.pages.dev` (atau gunakan Rule redirect) | Proxied (Orange Cloud) | Auto |

File `public/_redirects` dan `public/_headers` sudah disertakan di dalam folder `dist/` untuk memastikan routing SPA dan HTTP caching berjalan maksimal.

### 4. Hosting cPanel / Apache / Nginx
1. Jalankan `npm run build`.
2. Upload seluruh isi folder `dist/` ke folder `public_html` domain `www.nasla.digital`.
3. File `_redirects` atau `.htaccess` memastikan rewrite SPA ke `index.html`.

---

## Reset Demo Data
Untuk mengembalikan seluruh data ke default awal, klik tombol **"Reset Demo"** di bagian atas Admin Portal.

---

## Troubleshooting
- Jika port 3000 terpakai, Vite akan otomatis menggunakan port lain.
- Pastikan versi Node.js minimal 18.0.0 jika mengalami kendala instalasi dependensi.

---

## Production Security
Admin authentication bawaan pada template ini berbasis `LocalStorage` untuk mempermudah demonstrasi mandiri. Untuk deployment skala produksi dengan database multi-pengguna, hubungkan antarmuka ini dengan server backend authentication resmi Anda.

---

## License
Template ini dilindungi oleh **Single Project License**. Detail lisensi lengkap terdapat pada file `LICENSE.txt`.

---

## Support
Dibuat dengan dedikasi tinggi oleh **NASLA DIGITAL** — *Solusi Digital Untuk Masa Depan*.  
Distribusi resmi melalui [Lynk.id](https://lynk.id).
