# Simulation: Vanilla FE + Supabase BE Integration

Simulasi ini dibuat untuk **Pertemuan 7** kelas Web Development. Tujuannya adalah menunjukkan bagaimana aplikasi Frontend (Vanilla JS) berinteraksi dengan Backend/Database nyata (Supabase) melalui API.

## 🚀 Cara Menjalankan

1. **Setup Supabase Project:**
   - Buka [supabase.com](https://supabase.com) dan buat project baru.
   - Pergi ke **Table Editor** > **New Table**.
   - Nama Table: `todos`
   - Kolom yang dibutuhkan:
     - `id`: int8, Primary Key, Is Identity (Default)
     - `created_at`: timestamptz (Default `now()`)
     - `task`: text (Isikan deskripsi tugas)
   - Klik **Save**.

2. **Setup Konfigurasi:**
   - Pergi ke **Project Settings** > **API**.
   - Salin **Project URL** dan **anon public key**.
   - Buka file `script.js` dan tempelkan ke variabel `SUPABASE_URL` dan `SUPABASE_KEY`.

3. **Buka Aplikasi:**
   - Jalankan `index.html` menggunakan Live Server atau buka langsung di browser.

## 🧠 Konsep yang Dipelajari

1. **Client-Side Rendering (CSR):** Browser merender list tugas secara dinamis setelah mengambil data dari database.
2. **Asynchronous JavaScript:** Penggunaan `async/await` untuk menangani request ke server tanpa membekukan (freezing) UI.
3. **Database CRUD:**
   - **Create:** Menambah baris baru ke table `todos`.
   - **Read:** Mengambil semua data dari table `todos`.
   - **Delete:** Menghapus data berdasarkan ID yang unik.
4. **API Interaction:** Bagaimana `supabase-js` library bertindak sebagai jembatan antara Frontend dan Backend API.

---
*Created for Sintech 2026 Web Development Class*
# planets
