# Panduan Lengkap Deploy Dheluwang Undangan ke Vercel

Konfigurasi resmi untuk Vercel telah dibuat pada berkas **`vercel.json`**. Anda dapat mempublikasikan website ini ke Vercel dengan domain gratis `.vercel.app` atau menghubungkan custom domain Anda sendiri (contoh: `dheluwangundangan.com`).

---

## Opsi 1: Deploy Otomatis via GitHub (Paling Direkomendasikan & Termudah)

1. **Upload / Push Proyek ke GitHub**:
   - Buat repositori baru di akun GitHub Anda (misal: `dheluwang-undangan`).
   - Push seluruh berkas proyek ini ke repositori tersebut. Pastikan berkas `firebase-applet-config.json` dan `vercel.json` ikut ter-upload.

2. **Hubungkan ke Vercel**:
   - Buka [vercel.com](https://vercel.com) dan login menggunakan akun GitHub Anda.
   - Klik tombol **"Add New..."** lalu pilih **"Project"**.
   - Pilih repositori `dheluwang-undangan` Anda dan klik **"Import"**.

3. **Verifikasi Pengaturan Proyek**:
   - **Framework Preset**: `Vite` (terdeteksi otomatis).
   - **Root Directory**: `./` (default).
   - **Build Command**: `vite build` (otomatis dari `vercel.json`).
   - **Output Directory**: `dist` (otomatis).
   - **Install Command**: `npm install`.

4. **Klik "Deploy"**:
   - Tunggu sekitar 30 - 60 detik. Website Anda akan langsung online dengan domain seperti `dheluwang-undangan.vercel.app`.

---

## Opsi 2: Deploy Cepat via Terminal (Vercel CLI)

Jika Anda memiliki akses terminal atau command line:

1. Jalankan perintah:
   ```bash
   npx vercel
   ```
2. Ikuti instruksi di layar:
   - *Set up and deploy?* Ketik **`y`** dan tekan Enter.
   - *Which scope?* Pilih akun Vercel Anda.
   - *Link to existing project?* Ketik **`n`**.
   - *What's your project's name?* Ketik **`dheluwang-undangan`**.
   - *In which directory is your code located?* Tekan Enter (`./`).
3. Untuk rilis ke produksi (production domain):
   ```bash
   npx vercel --prod
   ```

---

## Konfigurasi Domain Kustom (Opsional)
Jika Anda ingin menggunakan domain Anda sendiri:
1. Masuk ke dashboard proyek di Vercel.
2. Buka menu **Settings** > **Domains**.
3. Masukkan domain Anda (misal: `dheluwangundangan.com`) dan ikuti instruksi DNS (menambahkan CNAME / A Record di penyedia domain Anda).

---

## Catatan Koneksi Firebase
- Karena website ini langsung membaca konfigurasi dari `firebase-applet-config.json` yang disertakan di dalam proyek, database Firestore akan **langsung terhubung secara otomatis** saat di-deploy ke Vercel tanpa perlu pengaturan tambahan.
