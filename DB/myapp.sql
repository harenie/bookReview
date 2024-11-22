-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2024 at 04:54 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `name`) VALUES
(1, 'To Kill a Mockingbird'),
(2, '1984'),
(3, 'The Great Gatsby'),
(4, 'Pride and Prejudice'),
(5, 'The Catcher in the Rye'),
(6, 'Moby Dick'),
(7, 'War and Peace'),
(8, 'Jane Eyre');

-- --------------------------------------------------------

--
-- Table structure for table `bookdetails`
--

CREATE TABLE `bookdetails` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `author` varchar(100) NOT NULL,
  `img` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `bookdetails`
--

INSERT INTO `bookdetails` (`id`, `name`, `author`, `img`) VALUES
(1, 'To Kill a Mockingbird', 'Harper Lee', 'https://cdn.britannica.com/21/182021-050-666DB6B1/book-cover-To-Kill-a-Mockingbird-many-1961.jpg'),
(2, '1984', 'George Orwell', 'https://i.pinimg.com/originals/0d/2c/09/0d2c0915b3c86c8ac0680f3f6c88731d.jpg'),
(3, 'The Great Gatsby', 'F. Scott Fitzgerald', 'https://hachette.imgix.net/books/9780762498130.jpg'),
(4, 'Pride and Prejudice', 'Jane Austen', 'https://m.media-amazon.com/images/I/51bsVdt2XcL._AC_UF1000,1000_QL80_.jpg'),
(5, 'The Catcher in the Rye', 'J.D. Salinger', 'https://m.media-amazon.com/images/I/51EXPv0IXRL._AC_SY200_QL15_.jpg'),
(6, 'Moby Dick', 'Herman Melville', 'https://m.media-amazon.com/images/I/71d5wo+-MuL._AC_UF1000,1000_QL80_.jpg'),
(7, 'War and Peace', 'Leo Tolstoy', 'https://m.media-amazon.com/images/I/71wXZB-VtBL._AC_UF1000,1000_QL80_.jpg'),
(8, 'Jane Eyre', 'Charlotte Bronte', 'https://m.media-amazon.com/images/I/61F2kZtma8L._AC_UF1000,1000_QL80_.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `bookreviews`
--

CREATE TABLE `bookreviews` (
  `id` int(11) NOT NULL,
  `book_id` int(11) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `review` varchar(600) NOT NULL,
  `rating` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `bookreviews`
--

INSERT INTO `bookreviews` (`id`, `book_id`, `name`, `review`, `rating`) VALUES
(171, 1, 'To Kill a Mockingbird', 'A timeless classic exploring racial injustice.', 5),
(173, 2, '1984', 'A chilling dystopian masterpiece.', 4.8),
(174, 3, 'The Great Gatsby', 'A poignant exploration of the American Dream.', 4.7),
(175, 4, 'Pride and Prejudice', 'A witty and romantic social commentary.', 4.9),
(176, 5, 'The Catcher in the Rye', 'A deep dive into teenage alienation.', 4.3),
(177, 6, 'Moby Dick', 'A challenging but rewarding read.', 4),
(178, 7, 'War and Peace', 'A sweeping tale of history and humanity.', 4.6),
(179, 8, 'Jane Eyre', 'A powerful story of love and independence.', 4.5);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('3tgEWhwJnhBQlGXRXy3GHc2-MDZeF26t', 1889921799, '{\"cookie\":{\"originalMaxAge\":157680000000,\"expires\":\"2029-11-21T02:16:38.775Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}'),
('6_eOWYXdZv-aWUEBzHhOSFGUCzmbAp3z', 1840104935, '{\"cookie\":{\"originalMaxAge\":157680000000,\"expires\":\"2028-04-23T12:15:34.814Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}'),
('BU6qhv8EcwiiPSi608yI17MJYATWLHD8', 1840104828, '{\"cookie\":{\"originalMaxAge\":157680000000,\"expires\":\"2028-04-23T12:13:47.726Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}'),
('FeW2OKONvJGcDza_Toi74QsYQK--z5PL', 1889921557, '{\"cookie\":{\"originalMaxAge\":157680000000,\"expires\":\"2029-11-21T02:12:36.860Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}'),
('L3_rxBbnNWdSBIF6T6Q5HNEkn2dfP0hE', 1889926833, '{\"cookie\":{\"originalMaxAge\":157680000000,\"expires\":\"2029-11-21T03:40:33.156Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}'),
('LRIJOEyFUTw1NKQgIfW-Tj4PHn8EUUAH', 1840018867, '{\"cookie\":{\"originalMaxAge\":157680000000,\"expires\":\"2028-04-22T12:21:07.133Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}'),
('P3PNwrYihhmneoUzsVNyU56PmSHZn9Sr', 1840643814, '{\"cookie\":{\"originalMaxAge\":157680000000,\"expires\":\"2028-04-29T17:49:32.145Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}'),
('VJQ-iaJrgMnrbZpOwMvIBYTSbUDz-Vnu', 1889920899, '{\"cookie\":{\"originalMaxAge\":157680000000,\"expires\":\"2029-11-21T02:01:39.229Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}'),
('eUrtyob6qAcM14WhOgBnfFn9ZzuHJWoS', 1840276029, '{\"cookie\":{\"originalMaxAge\":157680000000,\"expires\":\"2028-04-25T11:47:08.908Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}'),
('g5e-nFJvvTA2RROSBdJB8Bs8hetPwdXV', 1889874137, '{\"cookie\":{\"originalMaxAge\":157680000000,\"expires\":\"2029-11-19T09:39:38.860Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}'),
('ikVCHQm_t1hdXP_-3dnM8LqmohyfeZaN', 1889921875, '{\"cookie\":{\"originalMaxAge\":157680000000,\"expires\":\"2029-11-21T02:17:55.203Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}'),
('l8CD42FgHmaOg1TIGCVNHbyVUxvqGvRJ', 1840022844, '{\"cookie\":{\"originalMaxAge\":157680000000,\"expires\":\"2028-04-22T13:27:22.817Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}'),
('melMVMU9s3CcMReY3p_c4Erm4TZu9K4U', 1840018782, '{\"cookie\":{\"originalMaxAge\":157680000000,\"expires\":\"2028-04-22T12:19:42.193Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}'),
('nt2unXoaOxt9oogHnNM_RuQq9OJ6xBOe', 1849170680, '{\"cookie\":{\"originalMaxAge\":157679999999,\"expires\":\"2028-08-06T10:28:56.975Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}'),
('r-WRKEk1uAjtltRsjKc__P2EDrbm_i3j', 1840018981, '{\"cookie\":{\"originalMaxAge\":157680000000,\"expires\":\"2028-04-22T12:23:01.489Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}'),
('rD2i0m_xFPf-fIOXKVqriAs7O_9pl3EC', 1840278112, '{\"cookie\":{\"originalMaxAge\":157680000000,\"expires\":\"2028-04-25T12:13:46.151Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}'),
('rzgtQ8p3CbGaR9S3nO-iPPCz6z6_jN-i', 1889927017, '{\"cookie\":{\"originalMaxAge\":157680000000,\"expires\":\"2029-11-21T03:43:36.746Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}'),
('yJp8Cis3rHgDVPQVADx4ezfKRaTlrVSz', 1840105226, '{\"cookie\":{\"originalMaxAge\":157680000000,\"expires\":\"2028-04-23T12:20:25.735Z\",\"httpOnly\":false,\"path\":\"/\"},\"userID\":1}');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(240) NOT NULL,
  `password` varchar(240) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(1, 'jhon', '$2b$09$oN3eP9fbt66u8AjR3XZv5ehI89VScCDgJHb9LYd0El.nuhCuNXMFa'),
(3, 'sangee', '$2b$09$oN3eP9fbt66u8AjR3XZv5ehI89VScCDgJHb9LYd0El.nuhCuNXMFa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookreviews`
--
ALTER TABLE `bookreviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `bookreviews`
--
ALTER TABLE `bookreviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=187;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
