-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 26, 2024 at 06:14 AM
-- Server version: 8.0.27
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `glttchedarchives`
--

-- --------------------------------------------------------

--
-- Table structure for table `annotation`
--

DROP TABLE IF EXISTS `annotation`;
CREATE TABLE IF NOT EXISTS `annotation` (
  `annotationId` int NOT NULL AUTO_INCREMENT,
  `manhwaId` int NOT NULL,
  `annotation` text NOT NULL,
  PRIMARY KEY (`annotationId`),
  KEY `manhwaId` (`manhwaId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `artist`
--

DROP TABLE IF EXISTS `artist`;
CREATE TABLE IF NOT EXISTS `artist` (
  `artistId` int NOT NULL AUTO_INCREMENT,
  `artistName` varchar(255) NOT NULL,
  PRIMARY KEY (`artistId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
CREATE TABLE IF NOT EXISTS `author` (
  `authorId` int NOT NULL AUTO_INCREMENT,
  `authorName` varchar(255) NOT NULL,
  PRIMARY KEY (`authorId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `category` varchar(100) NOT NULL,
  PRIMARY KEY (`categoryId`),
  UNIQUE KEY `category` (`category`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryId`, `category`) VALUES
(1, 'Smut'),
(2, 'Omegaverse'),
(3, 'Straight'),
(4, 'Short'),
(5, 'BL'),
(6, 'Finished'),
(7, 'Green Flag'),
(8, 'Red Flag');

-- --------------------------------------------------------

--
-- Table structure for table `manhwa`
--

DROP TABLE IF EXISTS `manhwa`;
CREATE TABLE IF NOT EXISTS `manhwa` (
  `manhwaId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `authorId` int NOT NULL,
  `artistId` int NOT NULL,
  `numOfChapters` int DEFAULT '0',
  `cover` blob,
  PRIMARY KEY (`manhwaId`),
  KEY `idx_manhwa_author` (`authorId`),
  KEY `idx_manhwa_artist` (`artistId`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `manhwa`
--

INSERT INTO `manhwa` (`manhwaId`, `title`, `authorId`, `artistId`, `numOfChapters`, `cover`) VALUES
(2, 'test', 1, 1, 1, NULL),
(3, 'test2', 1, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `manhwa_category`
--

DROP TABLE IF EXISTS `manhwa_category`;
CREATE TABLE IF NOT EXISTS `manhwa_category` (
  `manhwaId` int NOT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`manhwaId`,`categoryId`),
  KEY `idx_manhwa_category` (`categoryId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
CREATE TABLE IF NOT EXISTS `rating` (
  `ratingId` int NOT NULL AUTO_INCREMENT,
  `manhwaId` int NOT NULL,
  `stars` tinyint NOT NULL,
  PRIMARY KEY (`ratingId`),
  KEY `idx_rating_manhwa` (`manhwaId`)
) ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
