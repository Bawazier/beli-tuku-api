-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 17 Okt 2020 pada 18.57
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `totalPrice` int(30) NOT NULL,
  `isCheck` tinyint(1) NOT NULL,
  `status` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_id`, `quantity`, `totalPrice`, `isCheck`, `status`) VALUES
(20, 36, 7, 1, 1426000000, 0, 'IN'),
(21, 36, 10, 1, 602000000, 0, 'OUT'),
(22, 36, 8, 2, 1204000000, 0, 'OUT'),
(23, 36, 9, 1, 1250000000, 0, 'OUT'),
(24, 36, 9, 1, 1250000000, 0, 'OUT'),
(25, 36, 9, 2, 25000000, 1, 'OUT'),
(26, 39, 9, 2, 25000000, 1, 'OUT'),
(27, 39, 8, 1, 2740000, 0, 'IN');

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `picture` varchar(80) DEFAULT NULL,
  `color` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `name`, `picture`, `color`) VALUES
(29, 'Accessories', NULL, '#D85050'),
(30, 'Formal suit', NULL, '#50D8AF'),
(31, 'T-Shirt', NULL, '#CC0B04'),
(32, 'Shorts', NULL, '#1C3391'),
(33, 'Jacket', NULL, '#F67B02'),
(34, 'Pants', NULL, '#E31F51'),
(35, 'Shoes', NULL, '#57CD9E'),
(36, 'Handbag', NULL, '#50C8D8'),
(37, 'Socks', NULL, '#AC50D8'),
(38, 'Tie', NULL, '#D8BA50'),
(39, 'Cap', NULL, '#53D850');

-- --------------------------------------------------------

--
-- Struktur dari tabel `conditions`
--

CREATE TABLE `conditions` (
  `id` int(11) NOT NULL,
  `status` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `conditions`
--

INSERT INTO `conditions` (`id`, `status`) VALUES
(3, 'New'),
(4, 'Older');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `conditions_id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `user_id`, `category_id`, `conditions_id`, `name`, `price`, `stock`, `created_at`, `updated_at`, `description`) VALUES
(7, 34, 30, 3, 'Alexander Amosu Vanquish II Bespoke', 14260000, 4, '2020-10-03', '2020-10-03', 'Jas mewah yang masuk dalam deretan harga jas termahal di dunia, salah satunya adalah produksi dari seorang desainer kelas atas, yakni Alexender Amosu. Ia membutuhkan waktu kurang lebih 80 jam untuk menyelesaikan sebuah setelan jas megah.\r\n\r\nAda sekitar 5.000 jahitan, 9 buah kancing bertahta emas 18 karat dan permata yang menjadikan jas ini sangat mewah. Tidak hanya itu, wol yang digunakan sebagai bahan jas ini adalah jenis langka, yakni vicuna dan qiviuk.\r\n\r\nDan, Alexender Amosu hanya membuat satu setelan jas untuk satu pelanggan saja. Nilai untuk satu setelan jas ini adalah US$ 101.860 atau sekitar Rp 1.426.000.000 yang nantinya jas mahal ini akan dikirim menggunakan mobil van anti peluru. '),
(8, 34, 30, 3, 'World Wood Record Challenge Cup Suits', 2740000, 12, '2020-10-03', '2020-10-03', 'Jas Loro Piana ini merupakan setelan jas mewah terbaik pada tahun 2012 karena terbuat dari bahan wol berkualitas tinggi. Diameter benang wol yang digunakan untuk membuat jas ini adalah 11 mikron'),
(9, 34, 30, 3, 'Stuart Hughes Diamond Edition ', 12500000, 2, '2020-10-03', '2020-10-03', 'Pembuatan jas mewah ini memakan waktu sekitar 600 jam. Bahan yang digunakan untuk membuat jas ini berkualitas terbaik dan dipadukan dengan tahta permata sejumlah 480 buah.\r\n\r\nTotal semua permata yang digunakan pada jas ini jumlahnya 240 karat. Ukuran permata yang digunakan adalah 0,5 cts berkualitas VS2 berwarna G. Jas mewah produksi desainer ternama ini hanya ada 3 potong yang dijual senilai US$ 892.500 atau setara Rp 12.500.000.000. '),
(10, 34, 30, 3, 'Brioni Vanquish II', 6020000, 34, '2020-10-03', '2020-10-03', 'Brioni Vanquish II, merupakan koleksi jas dari desainer pakaian mewah asal Italia yang sudah memproduksi jas sejak 1945. Pada tahun 2008 perusahaan ini mulai membuat setelan jas mahal dan mewah yang mampu membuat semua orang tercengang.\r\n\r\nJas buatannya terbuat dari serat paling langka di dunia, yakni qiviuk, meruakan serat alami yang tak biasa dan vicuna yang hanya dicukur 3 tahun sekali. Letak kemewahan pada jas ini adalah jahitannya yang berlapis emas putih. Harga untuk satu setelan jas ini adalah senilai US$ 43.000 atau sekitar Rp 602.000.000. ');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_colors`
--

CREATE TABLE `product_colors` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `hexa` varchar(15) NOT NULL,
  `status` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product_colors`
--

INSERT INTO `product_colors` (`id`, `product_id`, `name`, `hexa`, `status`) VALUES
(7, 7, 'black', '#000000', 'available'),
(8, 7, 'white', '#ffffff', 'available'),
(9, 8, 'black', '#000000', 'available'),
(10, 8, 'white', '#ffffff', 'available'),
(11, 9, 'black', '#000000', 'available'),
(12, 9, 'white', '#ffffff', 'available');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `picture` text NOT NULL,
  `isPrimary` tinyint(1) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `picture`, `isPrimary`, `created_at`, `updated_at`) VALUES
(9, 7, 'assets/uploads/1600856373790-code.png', 1, '2020-10-03', '2020-10-03'),
(10, 7, 'assets/uploads/1600856373790-code.png', 0, '2020-10-03', '2020-10-03'),
(11, 8, 'assets/uploads/1600856373790-code.png', 1, '2020-10-03', '2020-10-03'),
(12, 8, 'assets/uploads/1600856373790-code.png', 0, '2020-10-03', '2020-10-03'),
(13, 9, 'assets/uploads/1600856373790-code.png', 1, '2020-10-03', '2020-10-03'),
(14, 9, 'assets/uploads/1600856373790-code.png', 0, '2020-10-03', '2020-10-03');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_ratings`
--

CREATE TABLE `product_ratings` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product_ratings`
--

INSERT INTO `product_ratings` (`id`, `product_id`, `user_id`, `rating`, `comment`, `created_at`, `updated_at`) VALUES
(4, 7, 35, 2, 'Very Good', '2020-10-03', '2020-10-03'),
(5, 8, 35, 4, 'good', '2020-10-04', '2020-10-04'),
(6, 9, 35, 3, 'good enough', '2020-10-04', '2020-10-05'),
(7, 9, 36, 5, 'isGood', '2020-10-05', '2020-10-05');

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `role`) VALUES
(1, 'Admin'),
(2, 'Saller'),
(3, 'Customer');

-- --------------------------------------------------------

--
-- Struktur dari tabel `store`
--

CREATE TABLE `store` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `roles_id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(80) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `gender` varchar(15) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `picture` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `roles_id`, `name`, `email`, `password`, `phone`, `gender`, `dateOfBirth`, `picture`) VALUES
(34, 2, 'PT Makmur Jaya', 'ptmakmurjaya@gmail.com', 'Ilove3000', NULL, NULL, NULL, NULL),
(35, 3, 'Eko Mahes', 'eko@gmail.com', 'masukPakEko', NULL, NULL, NULL, NULL),
(36, 3, 'Cleo', 'ecoshape@gmail.com', '$2b$10$rtIXPHO5vKCwKwgQoQFTf.5bC0OTWgYk7bJSl/s.wvLfgeNqRRJGm', '89278952245', 'male', '2012-12-12', 'assets/uploads/1601803750370-christian.png'),
(37, 2, 'Magnum', 'magnum74@gmail.com', '$2b$10$l/NvducSmMpBJW4GHUayCuiI9txZpAv9xj5xGDh9whiX/Rsuf856e', NULL, NULL, NULL, NULL),
(38, 3, 'Cleo', 'ecosphape@gmail.com', '$2b$10$IN/hZaE1h5QkYhW.6wqg3.QGzgO3rTo/P3mEkSwsBQEKBmOb2Uzzy', NULL, NULL, NULL, NULL),
(39, 3, 'Sania', 'sania@gmail.com', '$2b$10$mRqsDq1lBtxJJWzL6w.mHOcfTFMY7dKJMCE1AXRV83FEsCwG8SKpq', NULL, 'male', NULL, 'assets/uploads/1602680589181-christian.png'),
(40, 3, 'Sania', 'sania25@gmail.com', '$2b$10$1NwbL4eZzZX7rUdmdGItAOc6frPWBv8IWAzx0pxjtg4y4ZOGqq08u', NULL, NULL, NULL, NULL),
(41, 3, 'Bawazier', 'ba@wazieer.com', '$2b$10$WTBALKOVEkUMBtltblBXGu2CdUMPl7RPsBAbSMyPPbo1wSyzZzsXK', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_address`
--

CREATE TABLE `user_address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `recipient_name` varchar(80) NOT NULL,
  `recipient_tlp` int(15) NOT NULL,
  `address` text NOT NULL,
  `region` varchar(80) NOT NULL,
  `postal_code` int(11) NOT NULL,
  `isPrimary` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_address`
--

INSERT INTO `user_address` (`id`, `user_id`, `name`, `recipient_name`, `recipient_tlp`, `address`, `region`, `postal_code`, `isPrimary`) VALUES
(6, 36, 'Sister House', 'Milea', 214593, 'pondok indah', 'jakarta', 21111, 1),
(7, 36, 'Dad House', 'Dady', 2500, 'pondok gede', 'jakarta', 20001, 0),
(8, 39, 'Dad House', 'Dady', 2500, 'pondok gede', 'jakarta', 20001, 0),
(9, 39, 'Mom House', 'Momy', 8967832, 'Bahagia', 'Cirebon', 45121, 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `conditions`
--
ALTER TABLE `conditions`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `product_colors`
--
ALTER TABLE `product_colors`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `product_ratings`
--
ALTER TABLE `product_ratings`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT untuk tabel `conditions`
--
ALTER TABLE `conditions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `product_colors`
--
ALTER TABLE `product_colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `product_ratings`
--
ALTER TABLE `product_ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `store`
--
ALTER TABLE `store`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT untuk tabel `user_address`
--
ALTER TABLE `user_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
