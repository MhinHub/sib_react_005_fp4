[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FMhinHub%2Fsib_react_005_fp4&count_bg=%23050505&title_bg=%23555555&icon=&icon_color=%23B4B4B4&title=hits&edge_flat=true)](https://hits.seeyoufarm.com)

<div align="center">
<img src="public/icon-512x512.png" alt="logo" width="200" height="auto" />
  <h1>Mouvee</h1>
  <p><b>Final project 4 - Kelompok 1</b></p>
  <p>Website ini merupakan Final projek akhir dari Hacktiv8 kelas React. Aplikasi yang dibuat pada Final project ini adalah website Film dikembangkan dengan menggunakan framework NextJS dan TailwindCSS serta Zustand dan Firebase sebagai state/backend management-nya. Kemudian Website ini dibuat dengan sistem desain Glassmorphism, dan sudah berbasis PWA.
</p>
</div>
<br/>

----

## Panduan Aplikasi dari Sisi Pengguna (User Guide) 📒
Halaman berikut hanya bisa diakses oleh user yang sudah login. Jika belum login, maka akan diarahkan ke halaman login. 

Pada halaman login, pengguna dapat login dengan mengisi form login dengan email dan password.

    // Dapat menggunakan akun dibawah ini
    email: user@mouvee.com
    password: user123


Jika pengguna belum memiliki akun, maka pengguna dapat mendaftar dengan mengisi form register dengan email dan password.

<div align="center"> 
<img src="https://i.postimg.cc/Vv1qyykP/chrome-capture-fxhgfx-11-14.png" alt="Typescript" width="80%"/>
<img src="https://i.postimg.cc/QMt3TWtK/mobile-7.png" width="18%"/>
</div>

***

### 1. Halaman Utama (Home) 🏠

Halaman utama adalah halaman yang pertama kali muncul ketika pengguna membuka aplikasi. Halaman ini berisi Welcome Hero Section, Top Product Bestseller, Category, dan CTA card section berdasakan kategory. Pengguna dapat melihat melihat detail produk, dan menambahkan produk ke keranjang belanja dengan ketentuan harus login sebagai user terlebih dahulu.

<div align="left"> 
<img src="https://i.postimg.cc/DzL6RPPs/chrome-capture-2022-11-14.png" alt="Home" width="80%"/>
<img src="https://i.postimg.cc/0bdWrZgK/mobile-1.png" width="18%"/>
</div>

### 2. Halaman Kategori (Category) 🗒️
Secara default halaman ini akan menampilkan daftar film dengan kategori Action. Pengguna dapat mengubah kategori film yang ditampilkan dengan mengklik salah satu kategori yang ada di Header Tab. Terdapat juga pagination untuk menampilkan daftar film yang lebih banyak.

<div align="left"> 
<img src="https://i.postimg.cc/W1M5hPhC/sjbsdf.png" alt="Category" width="80%"/>
<img src="https://i.postimg.cc/x19kBgxr/mobile-8.png" width="18%"/>
</div>

### 3. Halaman Detail Film (Movie Detail) 📜
Halaman ini muncul ketika pengguna mengklik salah satu film pada icon link detail Card Item. Halaman ini berisi informasi mengenai film yang dipilih beserta film sejenis. 

<div align="left"> 
<img src="https://i.postimg.cc/GmQFsP1J/hjgcjhg.png" alt="Movie Detail page" width="80%"/>
<img src="https://i.postimg.cc/wymFzQcv/mobile-4.png" width="18%"/>
</div>


### 4. Halaman/Modal Film (Movie modal) 🛒
Halaman/Modal ini muncul ketika tombol Play pada Card Item diklik. Halaman ini berisi informasi mengenai film yang dipilih termasuk Trailer dan Deskripsi. Pengguna dapat menambahkan film ke Watchlist dengan mengklik icon-nya.

<div align="left"> 
<img src="https://i.postimg.cc/wTHvSSSF/f8d0a729-abc0-4af2-a8ad-6c7c98562207.png" alt="Modal" width="80%"/>
<img src="https://i.postimg.cc/d7D4HYhG/mobile-5.png" width="18%"/>
</div>

### 5. Halaman Watchlist (Watchlist) 🗄️
Halaman ini muncul ketika tombol Watchlist di navbar diklik. Halaman ini berisi daftar film yang telah ditambahkan ke Watchlist. Pengguna dapat menghapus film dari Watchlist dengan mengklik icon-nya.

<div align="left"> 
<img src="https://i.postimg.cc/7Z3Nx866/screencapture-mouvee-vercel-app-watchlist-2022-12-14-16-47-41.png" alt="Modal" width="80%"/>
<img src="https://i.postimg.cc/HrYSM5HZ/mobile-2.png" width="18%"/>
</div>

### 6. Halaman Hasil Pencarian (Search Result) 🔍
Halaman ini muncul ketika pengguna melakukan pencarian film. Halaman ini berisi daftar film yang sesuai dengan kata kunci pencarian.

<div align="left">
<img src="https://i.postimg.cc/nczCnMKr/dgdgd.png" alt="Search Result" width="80%"/>
<img src="https://i.postimg.cc/PCSSQx5t/mobile-3.png" width="18%"/>


### 7. Halaman About Dev (About Dev) 👨‍💻 
Halaman ini berada di footer web app. Halaman ini berisi informasi mengenai developer dan info secara singkat pada proses management pengembangan web.

![sc about-dev](./README-ASSET/page/about-dev.png)

### 8. Halaman Tidak Ditemukan (404) 🚫
Halaman ini muncul ketika pengguna mengakses halaman yang tidak ada. Halaman ini berisi informasi mengenai halaman yang tidak ditemukan.

<div align="left"> 
<img src="https://i.postimg.cc/rw2YM988/chrome-capture-2022-11-14.png" alt="404" width="80%"/>
<img src="https://i.postimg.cc/RFqNhKMF/mobile.png" width="18%"/>
</div>


* Note: *Kedepannya akan dilakukan pengembangan lebih lanjut terkait project web app ini. Terima kasih.*

[Silahkan lihat panduan terkhusus bagi Reviewer dan Developer di link ini](./docs)



