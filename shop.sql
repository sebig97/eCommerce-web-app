-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2020 at 08:48 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodelogin`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id_user` int(11) NOT NULL,
  `prenume` char(50) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mobile` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id_user`, `prenume`, `username`, `password`, `email`, `mobile`) VALUES
(1, 'test', 'test', 'test', 'test@test.com', '0735772748'),
(2, 'Sebastian', 'sebi', 'sebi', 'sebastian_guzulescu@yahoo.com', '0727117575'),
(4, 'Andrei', 'andrew', 'andrei', 'and@yahoo.com', '0724773432'),
(7, 'Sorin Deca', 'sorind', 'sorin', 'deca@gmail.com', '0723445432');

-- --------------------------------------------------------

--
-- Table structure for table `accounts_produse`
--

CREATE TABLE `accounts_produse` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_produs` int(11) NOT NULL,
  `cantitate` int(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `adresa`
--

CREATE TABLE `adresa` (
  `id_adresa` int(11) NOT NULL,
  `judet` varchar(50) NOT NULL,
  `oras` varchar(50) NOT NULL,
  `strada` varchar(50) NOT NULL,
  `numar` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adresa`
--

INSERT INTO `adresa` (`id_adresa`, `judet`, `oras`, `strada`, `numar`) VALUES
(1, 'Ialomita', 'Slobozia', 'Chimiei', '5'),
(2, 'Teleorman', 'Zimnicea', 'Independentei', '3'),
(3, 'Olt', 'asdas', 'Splaiul Independentei', '2'),
(4, 'Ilfov', 'Branesti', 'strada', '1');

-- --------------------------------------------------------

--
-- Table structure for table `categorie`
--

CREATE TABLE `categorie` (
  `id_categorie` int(11) NOT NULL,
  `nume_categorie` char(50) DEFAULT NULL,
  `details` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categorie`
--

INSERT INTO `categorie` (`id_categorie`, `nume_categorie`, `details`) VALUES
(1, 'Laptop, Tablete & Telefoane', 'descriere laptop, tablete si telefoane'),
(2, 'Ceasuri', 'descriere ceasuri'),
(5, 'TV', 'descriere categorie tv');

-- --------------------------------------------------------

--
-- Table structure for table `comanda`
--

CREATE TABLE `comanda` (
  `id_comanda` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `nr_confirmare` int(11) NOT NULL,
  `data` varchar(20) DEFAULT NULL,
  `id_adresa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comanda`
--

INSERT INTO `comanda` (`id_comanda`, `id_user`, `nr_confirmare`, `data`, `id_adresa`) VALUES
(30, 7, 10, '12/12/2019', 2),
(48, 2, 47, '01/16/2020', 3),
(52, 1, 77, '01/17/2020', 1);

-- --------------------------------------------------------

--
-- Table structure for table `detalii_comanda`
--

CREATE TABLE `detalii_comanda` (
  `id_detalii` int(11) NOT NULL,
  `id_comanda` int(11) NOT NULL,
  `id_produs` int(11) DEFAULT NULL,
  `cantitate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detalii_comanda`
--

INSERT INTO `detalii_comanda` (`id_detalii`, `id_comanda`, `id_produs`, `cantitate`) VALUES
(13, 48, 10, 3),
(27, 30, 15, 1),
(28, 30, 17, 1),
(33, 52, 21, 1),
(34, 52, 15, 1),
(35, 52, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `produse`
--

CREATE TABLE `produse` (
  `id_produs` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `model` varchar(15) DEFAULT NULL,
  `description` text NOT NULL,
  `stoc` varchar(255) NOT NULL,
  `firma` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `color` varchar(15) DEFAULT NULL,
  `id_categorie` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produse`
--

INSERT INTO `produse` (`id_produs`, `name`, `model`, `description`, `stoc`, `firma`, `price`, `color`, `id_categorie`) VALUES
(5, 'televizor', 'Wide', '4k', '10', 'Samsung', '4000', 'Negru', 5),
(8, 'Telefon', 'iphone 11', 'Cel mai tare telefon', '43', 'Apple', '3500', 'Negru', 1),
(10, 'Ceas', 'Chronograph', 'Ceas Fossil smartwatch', '15', 'Fossil', '700', 'Silver', 2),
(12, 'Laptop ', 'IdeaPad', '2020', '22', 'Lenovo', '1222', 'Alb', 1),
(13, 'televizor', 'W33', 'televizor full hd smart 2d', '9', 'LG', '3200', 'Alb', 5),
(14, 'Tableta', 'Pro', 'Tableta apple 2020', '18', 'Apple', '1500', 'Silver', 1),
(15, 'Ceas', 'Trent', 'Oldschool', '14', 'Tommy Hilfiger', '1700', 'Maro', 2),
(17, 'Laptop ', 'S40', 'asdasdasdasd', '12', 'ASUS', '4503', 'Silver', 1),
(21, 'Tableta', 'GT500', 'Tableta noua', '10', 'Huawei', '1488', 'Rosu', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `accounts_produse`
--
ALTER TABLE `accounts_produse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_produs` (`id_produs`);

--
-- Indexes for table `adresa`
--
ALTER TABLE `adresa`
  ADD PRIMARY KEY (`id_adresa`);

--
-- Indexes for table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id_categorie`);

--
-- Indexes for table `comanda`
--
ALTER TABLE `comanda`
  ADD PRIMARY KEY (`id_comanda`),
  ADD KEY `id_adresa` (`id_adresa`);

--
-- Indexes for table `detalii_comanda`
--
ALTER TABLE `detalii_comanda`
  ADD PRIMARY KEY (`id_detalii`),
  ADD KEY `id_comanda` (`id_comanda`),
  ADD KEY `id_produs` (`id_produs`);

--
-- Indexes for table `produse`
--
ALTER TABLE `produse`
  ADD PRIMARY KEY (`id_produs`),
  ADD KEY `id_categorie` (`id_categorie`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `accounts_produse`
--
ALTER TABLE `accounts_produse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `adresa`
--
ALTER TABLE `adresa`
  MODIFY `id_adresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id_categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `comanda`
--
ALTER TABLE `comanda`
  MODIFY `id_comanda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `detalii_comanda`
--
ALTER TABLE `detalii_comanda`
  MODIFY `id_detalii` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `produse`
--
ALTER TABLE `produse`
  MODIFY `id_produs` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts_produse`
--
ALTER TABLE `accounts_produse`
  ADD CONSTRAINT `accounts_produse_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `accounts` (`id_user`) ON UPDATE CASCADE,
  ADD CONSTRAINT `accounts_produse_ibfk_2` FOREIGN KEY (`id_produs`) REFERENCES `produse` (`id_produs`) ON UPDATE CASCADE;

--
-- Constraints for table `comanda`
--
ALTER TABLE `comanda`
  ADD CONSTRAINT `comanda_ibfk_1` FOREIGN KEY (`id_adresa`) REFERENCES `adresa` (`id_adresa`) ON UPDATE CASCADE;

--
-- Constraints for table `detalii_comanda`
--
ALTER TABLE `detalii_comanda`
  ADD CONSTRAINT `detalii_comanda_ibfk_1` FOREIGN KEY (`id_comanda`) REFERENCES `comanda` (`id_comanda`) ON UPDATE CASCADE,
  ADD CONSTRAINT `detalii_comanda_ibfk_2` FOREIGN KEY (`id_produs`) REFERENCES `produse` (`id_produs`) ON UPDATE CASCADE;

--
-- Constraints for table `produse`
--
ALTER TABLE `produse`
  ADD CONSTRAINT `produse_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
