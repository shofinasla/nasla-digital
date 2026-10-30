# Panduan Admin Demo CMS & Keamanan

## Tentang Admin Demo CMS
Dashboard Admin yang disertakan di rute `/portal` dirancang sebagai **Local Demo CMS** berbasis `LocalStorage`. Fitur ini memudahkan pembeli untuk melakukan preview interaktif, menguji coba pengubahan konten, dan mengekspor konfigurasi JSON.

### Kredensial Demo Default
- **Username / Email:** `admin` / `admin@example.com`
- **Password:** `demo-admin`

---

## Catatan Keamanan Penting (Security Notice)
> **PERINGATAN KEAMANAN:**  
> Sistem autentikasi ini menggunakan penyimpanan sisi klien (`LocalStorage`) untuk keperluan demonstrasi lokal template. Sistem ini **BUKAN** sistem autentikasi produksi berbasis server (seperti OAuth, JWT, atau Firebase Auth).  
> Jika Anda hendak meluncurkan panel admin ke publik untuk pengelolaan database multi-user secara real-time, disarankan menghubungkan antarmuka ini dengan backend authentication provider resmi Anda.
