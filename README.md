# Prediksi Harga Rumah Berdasarkan Luas Bangunan

## Deskripsi
Aplikasi web sederhana yang memperkirakan harga rumah di King County (Washington, USA) berdasarkan luas bangunan (`sqft_living`).

- Backend: **Flask**
- Frontend: **HTML**, **Bootstrap 5**, **CSS**, **JavaScript**
- Model: Linear Regression yang sudah dilatih sebelumnya (`house_price_model.pkl`).
- Tidak ada database, hanya satu input dan satu output.

## Struktur Proyek
```
house-price-prediction/
├── app.py                     # kode Flask utama
├── house_price_model.pkl      # model terlatih (harus disediakan)
├── requirements.txt           # dependensi Python
├── README.md                  # (ini) petunjuk penggunaan
├── templates/
│   └── index.html            # halaman utama
└── static/
    ├── css/
    │   └── style.css         # styling khusus
    ├── js/
    │   └── script.js         # validasi input (opsional)
    └── images/
        └── hero.jpg          # foto rumah (opsional, contoh)
```

## Prasyarat
- Sistem operasi **Windows** (dengan PowerShell) atau Linux/macOS.
- **Python 3.9+** terinstal dan dapat diakses via `python`.
- **Git** (opsional, untuk meng-clone repository).

## Langkah Instalasi
1. **Buka terminal di VS Code** (atau PowerShell/CMD).
2. **Buat virtual environment**
   ```powershell
   python -m venv venv
   .\venv\Scripts\activate   # Windows
   # source venv/bin/activate   # Linux/macOS
   ```
3. **Instal dependensi**
   ```powershell
   pip install -r requirements.txt
   ```
4. **Siapkan model**
   - Tempatkan file `house_price_model.pkl` ke dalam root project (`house-price-prediction/`).
   - Jika file belum ada, aplikasi akan menampilkan pesan error yang menjelaskan cara menambahkannya.

## Menjalankan Aplikasi
```powershell
python app.py
```
Aplikasi akan berjalan pada `http://127.0.0.1:5000/`. Buka browser dan akses URL tersebut.

## Pengujian Manual
1. Masukkan nilai **luas bangunan** (contoh: `2000`).
2. Klik **Prediksi Harga**.
3. Hasil estimasi, persamaan model, dan metrik akan ditampilkan.

## Catatan Penting
- Model hanya menggunakan satu variabel (`sqft_living`). Prediksi merupakan **estimasi** dan tidak memperhitungkan faktor lain seperti lokasi, kondisi rumah, atau tahun dibangun.
- Nilai input yang sangat kecil atau sangat besar di luar rentang dataset (≈ 300 – 15 000 sqft) akan ditolak dengan pesan validasi.
- Jika prediksi menghasilkan nilai negatif, aplikasi akan memberi tahu bahwa model tidak dapat memberikan estimasi yang masuk akal.

## Pengembangan Lanjutan
- Tambahkan variabel lain (mis. `bedrooms`, `bathrooms`) untuk meningkatkan akurasi.
- Integrasikan peta interaktif atau pencarian alamat.
- Deploy ke layanan cloud (Heroku, Render, dll.).

