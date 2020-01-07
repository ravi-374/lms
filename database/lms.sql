-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Jan 07, 2020 at 06:12 AM
-- Server version: 8.0.18
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) NOT NULL,
  `owner_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_1` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_2` text COLLATE utf8mb4_unicode_ci,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zip` int(11) NOT NULL,
  `country_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `addresses_country_id_foreign` (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
CREATE TABLE IF NOT EXISTS `authors` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `first_name`, `last_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Ernest', 'Hemingway', 'Ernest Miller Hemingway was an American journalist, novelist, short-story writer, and sportsman.', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(2, 'Stephen', 'King', 'Stephen Edwin King is an American author of horror, supernatural fiction, suspense, science fiction, and fantasy novels.', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(3, 'J. K.', 'Rowling', 'Joanne Rowling CH, OBE, FRSL, FRCPE, FRSE, better known by her pen names J. K. Rowling and Robert Galbraith, is a British novelist, screenwriter, producer, and philanthropist.', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(4, 'Jeff', 'Goins', 'Jeff Goins is an American author, blogger, and speaker. He is the founder of Tribe Writers, an online community for writers.', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(5, 'Arundhati', 'Roy', 'Suzanna Arundhati Roy is an Indian author best known for her novel The God of Small Things, which won the Man Booker Prize for Fiction in 1997 and became the biggest-selling book by a non-expatriate Indian author.', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(6, 'Chetan', 'Bhagat', 'Chetan Bhagat is a screenwriter, television personality and motivational speaker, known for his Indian-English novels about young urban middle class Indians.', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(7, 'Durjoy', 'Datta', 'Durjoy Datta is an Indian screenwriter and entrepreneur known for his novels about the romantic life of young Indians.', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(8, 'Hua', 'Yu', 'Yu Hua is a Chinese author, born April 3, 1960 in Hangzhou, Zhejiang province. Shortly after his debut as a fiction writer in 1983, Yu Hua was regarded as a promising avant-garde or post-New Wave writer.', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(9, 'Yukio', 'Mishima', 'Yukio Mishima is the pen name of Kimitake Hiraoka, a Japanese author, poet, playwright, actor, model, film director, nationalist, and founder of the Tatenokai.', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(10, 'Danielle', 'Steel', 'Danielle Fernandes Dominique Schuelein-Steel is an American writer, best known for her romance novels.', '2020-01-07 00:41:31', '2020-01-07 00:41:31');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
CREATE TABLE IF NOT EXISTS `books` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `published_on` datetime DEFAULT NULL,
  `isbn` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `book_authors`
--

DROP TABLE IF EXISTS `book_authors`;
CREATE TABLE IF NOT EXISTS `book_authors` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `book_id` int(10) UNSIGNED NOT NULL,
  `author_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `book_authors_book_id_foreign` (`book_id`),
  KEY `book_authors_author_id_foreign` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `book_genres`
--

DROP TABLE IF EXISTS `book_genres`;
CREATE TABLE IF NOT EXISTS `book_genres` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `book_id` int(10) UNSIGNED NOT NULL,
  `genre_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `book_genres_book_id_foreign` (`book_id`),
  KEY `book_genres_genre_id_foreign` (`genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `book_items`
--

DROP TABLE IF EXISTS `book_items`;
CREATE TABLE IF NOT EXISTS `book_items` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `book_id` int(10) UNSIGNED NOT NULL,
  `book_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `edition` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `format` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double DEFAULT NULL,
  `publisher_id` int(10) UNSIGNED DEFAULT NULL,
  `language_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `book_items_book_code_unique` (`book_code`),
  KEY `book_items_publisher_id_foreign` (`publisher_id`),
  KEY `book_items_language_id_foreign` (`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `book_languages`
--

DROP TABLE IF EXISTS `book_languages`;
CREATE TABLE IF NOT EXISTS `book_languages` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `language_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `book_languages_language_name_unique` (`language_name`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `book_languages`
--

INSERT INTO `book_languages` (`id`, `language_name`, `language_code`, `created_at`, `updated_at`) VALUES
(1, 'English', 'EN', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(2, 'Gujarati', 'GJ', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(3, 'Marathi', 'MR', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(4, 'Urdu', 'UR', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(5, 'Spanish', 'ES', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(6, 'Portuguese', 'PT', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(7, 'French', 'FR', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(8, 'German', 'DE', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(9, 'Chinese', 'ZH', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(10, 'Italian', 'IT', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(11, 'Norwegian', 'NO', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(12, 'Russian', 'RU', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(13, 'Dutch', 'NL', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(14, 'Swedish', 'SV', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(15, 'Arabic', 'AR', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(16, 'Greek', 'EL', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(17, 'Japanese', 'JA', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(18, 'Korean', 'KO', '2020-01-07 00:41:30', '2020-01-07 00:41:30');

-- --------------------------------------------------------

--
-- Table structure for table `book_requests`
--

DROP TABLE IF EXISTS `book_requests`;
CREATE TABLE IF NOT EXISTS `book_requests` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `member_id` int(10) UNSIGNED NOT NULL,
  `book_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isbn` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `edition` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `format` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `book_series`
--

DROP TABLE IF EXISTS `book_series`;
CREATE TABLE IF NOT EXISTS `book_series` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `book_series_title_unique` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `book_tags`
--

DROP TABLE IF EXISTS `book_tags`;
CREATE TABLE IF NOT EXISTS `book_tags` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `book_id` int(10) UNSIGNED NOT NULL,
  `tag_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `book_tags_book_id_foreign` (`book_id`),
  KEY `book_tags_tag_id_foreign` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
CREATE TABLE IF NOT EXISTS `countries` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `countries_name_unique` (`name`),
  UNIQUE KEY `countries_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=247 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `code`, `created_at`, `updated_at`) VALUES
(1, 'Afghanistan', 'AF', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(2, 'Albania', 'AL', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(3, 'Algeria', 'DZ', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(4, 'American Samoa', 'AS', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(5, 'Andorra', 'AD', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(6, 'Angola', 'AO', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(7, 'Anguilla', 'AI', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(8, 'Antarctica', 'AQ', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(9, 'Antigua and Barbuda', 'AG', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(10, 'Argentina', 'AR', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(11, 'Armenia', 'AM', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(12, 'Aruba', 'AW', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(13, 'Australia', 'AU', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(14, 'Austria', 'AT', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(15, 'Azerbaijan', 'AZ', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(16, 'Bahamas', 'BS', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(17, 'Bahrain', 'BH', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(18, 'Bangladesh', 'BD', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(19, 'Barbados', 'BB', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(20, 'Belarus', 'BY', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(21, 'Belgium', 'BE', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(22, 'Belize', 'BZ', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(23, 'Benin', 'BJ', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(24, 'Bermuda', 'BM', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(25, 'Bhutan', 'BT', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(26, 'Bolivia (Plurinational State of)', 'BO', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(27, 'Bonaire, Sint Eustatius and Saba', 'BQ', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(28, 'Bosnia and Herzegovina', 'BA', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(29, 'Botswana', 'BW', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(30, 'Bouvet Island', 'BV', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(31, 'Brazil', 'BR', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(32, 'British Indian Ocean Territory', 'IO', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(33, 'United States Minor Outlying Islands', 'UM', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(34, 'Virgin Islands (British)', 'VG', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(35, 'Virgin Islands (U.S.)', 'VI', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(36, 'Brunei Darussalam', 'BN', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(37, 'Bulgaria', 'BG', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(38, 'Burkina Faso', 'BF', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(39, 'Burundi', 'BI', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(40, 'Cambodia', 'KH', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(41, 'Cameroon', 'CM', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(42, 'Canada', 'CA', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(43, 'Cabo Verde', 'CV', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(44, 'Cayman Islands', 'KY', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(45, 'Central African Republic', 'CF', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(46, 'Chad', 'TD', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(47, 'Chile', 'CL', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(48, 'China', 'CN', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(49, 'Christmas Island', 'CX', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(50, 'Cocos (Keeling) Islands', 'CC', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(51, 'Colombia', 'CO', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(52, 'Comoros', 'KM', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(53, 'Congo', 'CG', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(54, 'Congo (Democratic Republic of the)', 'CD', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(55, 'Cook Islands', 'CK', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(56, 'Costa Rica', 'CR', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(57, 'Croatia', 'HR', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(58, 'Cuba', 'CU', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(59, 'Curaçao', 'CW', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(60, 'Cyprus', 'CY', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(61, 'Czech Republic', 'CZ', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(62, 'Denmark', 'DK', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(63, 'Djibouti', 'DJ', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(64, 'Dominica', 'DM', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(65, 'Dominican Republic', 'DO', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(66, 'Ecuador', 'EC', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(67, 'Egypt', 'EG', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(68, 'El Salvador', 'SV', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(69, 'Equatorial Guinea', 'GQ', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(70, 'Eritrea', 'ER', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(71, 'Estonia', 'EE', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(72, 'Ethiopia', 'ET', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(73, 'Falkland Islands (Malvinas)', 'FK', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(74, 'Faroe Islands', 'FO', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(75, 'Fiji', 'FJ', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(76, 'Finland', 'FI', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(77, 'France', 'FR', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(78, 'French Guiana', 'GF', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(79, 'French Polynesia', 'PF', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(80, 'French Southern Territories', 'TF', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(81, 'Gabon', 'GA', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(82, 'Gambia', 'GM', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(83, 'Georgia', 'GE', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(84, 'Germany', 'DE', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(85, 'Ghana', 'GH', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(86, 'Gibraltar', 'GI', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(87, 'Greece', 'GR', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(88, 'Greenland', 'GL', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(89, 'Grenada', 'GD', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(90, 'Guadeloupe', 'GP', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(91, 'Guam', 'GU', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(92, 'Guatemala', 'GT', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(93, 'Guernsey', 'GG', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(94, 'Guinea', 'GN', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(95, 'Guinea-Bissau', 'GW', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(96, 'Guyana', 'GY', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(97, 'Haiti', 'HT', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(98, 'Heard Island and McDonald Islands', 'HM', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(99, 'Holy See', 'VA', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(100, 'Honduras', 'HN', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(101, 'Hong Kong', 'HK', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(102, 'Hungary', 'HU', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(103, 'Iceland', 'IS', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(104, 'India', 'IN', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(105, 'Indonesia', 'ID', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(106, 'Iran (Islamic Republic of)', 'IR', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(107, 'Iraq', 'IQ', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(108, 'Ireland', 'IE', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(109, 'Isle of Man', 'IM', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(110, 'Israel', 'IL', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(111, 'Italy', 'IT', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(112, 'Jamaica', 'JM', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(113, 'Japan', 'JP', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(114, 'Jersey', 'JE', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(115, 'Jordan', 'JO', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(116, 'Kazakhstan', 'KZ', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(117, 'Kenya', 'KE', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(118, 'Kiribati', 'KI', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(119, 'Kuwait', 'KW', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(120, 'Kyrgyzstan', 'KG', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(121, 'Lao People\'s Democratic Republic', 'LA', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(122, 'Latvia', 'LV', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(123, 'Lebanon', 'LB', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(124, 'Lesotho', 'LS', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(125, 'Liberia', 'LR', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(126, 'Libya', 'LY', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(127, 'Liechtenstein', 'LI', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(128, 'Lithuania', 'LT', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(129, 'Luxembourg', 'LU', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(130, 'Macao', 'MO', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(131, 'Macedonia (the former Yugoslav Republic of)', 'MK', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(132, 'Madagascar', 'MG', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(133, 'Malawi', 'MW', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(134, 'Malaysia', 'MY', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(135, 'Maldives', 'MV', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(136, 'Mali', 'ML', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(137, 'Malta', 'MT', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(138, 'Marshall Islands', 'MH', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(139, 'Martinique', 'MQ', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(140, 'Mauritania', 'MR', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(141, 'Mauritius', 'MU', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(142, 'Mayotte', 'YT', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(143, 'Mexico', 'MX', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(144, 'Micronesia (Federated States of)', 'FM', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(145, 'Moldova (Republic of)', 'MD', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(146, 'Monaco', 'MC', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(147, 'Mongolia', 'MN', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(148, 'Montenegro', 'ME', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(149, 'Montserrat', 'MS', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(150, 'Morocco', 'MA', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(151, 'Mozambique', 'MZ', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(152, 'Myanmar', 'MM', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(153, 'Namibia', 'NA', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(154, 'Nauru', 'NR', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(155, 'Nepal', 'NP', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(156, 'Netherlands', 'NL', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(157, 'New Caledonia', 'NC', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(158, 'New Zealand', 'NZ', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(159, 'Nicaragua', 'NI', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(160, 'Niger', 'NE', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(161, 'Nigeria', 'NG', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(162, 'Niue', 'NU', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(163, 'Norfolk Island', 'NF', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(164, 'Korea (Democratic People\'s Republic of)', 'KP', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(165, 'Northern Mariana Islands', 'MP', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(166, 'Norway', 'NO', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(167, 'Oman', 'OM', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(168, 'Pakistan', 'PK', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(169, 'Palau', 'PW', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(170, 'Palestine, State of', 'PS', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(171, 'Panama', 'PA', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(172, 'Papua New Guinea', 'PG', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(173, 'Paraguay', 'PY', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(174, 'Peru', 'PE', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(175, 'Philippines', 'PH', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(176, 'Pitcairn', 'PN', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(177, 'Poland', 'PL', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(178, 'Portugal', 'PT', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(179, 'Puerto Rico', 'PR', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(180, 'Qatar', 'QA', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(181, 'Republic of Kosovo', 'XK', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(182, 'Romania', 'RO', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(183, 'Russian Federation', 'RU', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(184, 'Rwanda', 'RW', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(185, 'Saint Helena, Ascension and Tristan da Cunha', 'SH', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(186, 'Saint Kitts and Nevis', 'KN', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(187, 'Saint Lucia', 'LC', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(188, 'Saint Martin (French part)', 'MF', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(189, 'Saint Pierre and Miquelon', 'PM', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(190, 'Saint Vincent and the Grenadines', 'VC', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(191, 'Samoa', 'WS', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(192, 'San Marino', 'SM', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(193, 'Sao Tome and Principe', 'ST', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(194, 'Saudi Arabia', 'SA', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(195, 'Senegal', 'SN', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(196, 'Serbia', 'RS', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(197, 'Seychelles', 'SC', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(198, 'Sierra Leone', 'SL', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(199, 'Singapore', 'SG', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(200, 'Sint Maarten (Dutch part)', 'SX', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(201, 'Slovakia', 'SK', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(202, 'Slovenia', 'SI', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(203, 'Solomon Islands', 'SB', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(204, 'Somalia', 'SO', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(205, 'South Africa', 'ZA', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(206, 'South Georgia and the South Sandwich Islands', 'GS', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(207, 'Korea (Republic of)', 'KR', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(208, 'South Sudan', 'SS', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(209, 'Spain', 'ES', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(210, 'Sri Lanka', 'LK', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(211, 'Sudan', 'SD', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(212, 'Suriname', 'SR', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(213, 'Svalbard and Jan Mayen', 'SJ', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(214, 'Swaziland', 'SZ', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(215, 'Sweden', 'SE', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(216, 'Switzerland', 'CH', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(217, 'Syrian Arab Republic', 'SY', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(218, 'Taiwan', 'TW', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(219, 'Tajikistan', 'TJ', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(220, 'Tanzania, United Republic of', 'TZ', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(221, 'Thailand', 'TH', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(222, 'Timor-Leste', 'TL', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(223, 'Togo', 'TG', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(224, 'Tokelau', 'TK', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(225, 'Tonga', 'TO', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(226, 'Trinidad and Tobago', 'TT', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(227, 'Tunisia', 'TN', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(228, 'Turkey', 'TR', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(229, 'Turkmenistan', 'TM', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(230, 'Turks and Caicos Islands', 'TC', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(231, 'Tuvalu', 'TV', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(232, 'Uganda', 'UG', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(233, 'Ukraine', 'UA', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(234, 'United Arab Emirates', 'AE', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(235, 'United Kingdom of Great Britain and Northern Ireland', 'GB', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(236, 'United States of America', 'US', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(237, 'Uruguay', 'UY', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(238, 'Uzbekistan', 'UZ', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(239, 'Vanuatu', 'VU', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(240, 'Venezuela (Bolivarian Republic of)', 'VE', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(241, 'Viet Nam', 'VN', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(242, 'Wallis and Futuna', 'WF', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(243, 'Western Sahara', 'EH', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(244, 'Yemen', 'YE', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(245, 'Zambia', 'ZM', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(246, 'Zimbabwe', 'ZW', '2020-01-07 00:41:31', '2020-01-07 00:41:31');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
CREATE TABLE IF NOT EXISTS `genres` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Art', 'Books that showcase particular types of art.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(2, 'Biography', 'A biography (from the Greek words bios meaning \"life\", and graphos meaning \"write\") is a non-fictional account of a person\'s life. Biographies are written by an author who is not the subject/focus of the book. ', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(3, 'Business', 'A business (also known as enterprise or firm) is an organization engaged in the trade of goods, services, or both to consumers.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(4, 'Comics', 'A comic book or comicbook, also called comic magazine or simply comic, is a publication that consists of comic art in the form of sequential juxtaposed panels that represent individual scenes.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(5, 'Contemporary', 'Contemporary fiction creates imaginary characters and situations that depict our world\r\nand society. It focuses on themes of growing up and confronting personal and social problems. ', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(6, 'Crime', 'Crime fiction is the literary genre that fictionalises crimes, their detection, criminals and their motives.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(7, 'Fantasy', 'Fantasy is a genre that uses magic and other supernatural forms as a primary element of plot, theme, and/or setting. Fantasy is generally distinguished from science fiction and horror by the expectation that it steers clear of technological and macabre themes, respectively, though there is a great deal of overlap between the three (collectively known as speculative fiction or science fiction/fantasy).', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(8, 'Fiction', 'Fiction is the telling of stories which are not real. More specifically, fiction is an imaginative form of narrative, one of the four basic rhetorical modes.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(9, 'Novels', '', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(10, 'History', 'History (from Greek ἱστορία - historia, meaning \"inquiry, knowledge acquired by investigation\") is the discovery, collection, organization, and presentation of information about past events. History can also mean the period of time after writing was invented.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(11, 'Horror', 'Horror fiction is fiction in any medium intended to scare, unsettle, or horrify the audience. Historically, the cause of the \"horror\" experience has often been the intrusion of a supernatural element into everyday human experience.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(12, 'Humor and Comedy', '', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(13, 'Music', 'Books about music history, music genres and musicians.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(14, 'Mystery', 'The mystery genre is a type of fiction in which a detective, or other professional, solves a crime or series of crimes. It can take the form of a novel or short story.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(15, 'Nonfiction', 'Nonfiction is an account or representation of a subject which is presented as fact. This presentation may be accurate or not; that is, it can give either a true or a false account of the subject in question. ', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(16, 'Philosophy', 'Philosophy is the study of general problems concerning matters such as existence, knowledge, truth, beauty, justice, validity, mind, and language. ', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(17, 'Poetry', 'Poetry is a form of literary art in which language is used for its aesthetic and evocative qualities in addition to, or in lieu of, its apparent meaning.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(18, 'Psychology', 'Books that involve psychology; the study of mental processes and human behavior.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(19, 'Religion', 'Religion is a cultural system that establishes symbols that relate humanity to spirituality and moral values. Many religions have narratives, symbols, traditions and sacred histories that are intended to give meaning to life or to explain the origin of life or the universe.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(20, 'Romance', 'According to the Romance Writers of America, \"Two basic elements comprise every romance novel: a central love story and an emotionally-satisfying and optimistic ending.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(21, 'Science', 'Science (from the Latin scientia, meaning “knowledge”) is the effort to discover, and increase human understanding of how the physical world works.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(22, 'Self Help', 'Self-help, or self-improvement, is a self-guided improvement[1]—economically, intellectually, or emotionally—often with a substantial psychological basis.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(23, 'Suspense', 'Suspense is the element of both fiction and some nonfiction that makes the reader uncertain about the outcome.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(24, 'Spirituality', 'Spirituality may refer to almost any kind of meaningful activity, personal growth, or blissful experience.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(25, 'Sports', 'Sports : engagement in physical activity intended to create a benefit to the participant. Ranging from Amateur to Professional, from incompetent to proficient, for all levels of ability, all nations, all creeds, all genders. As James Joyce said \"I am, a stride at a time\"', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(26, 'Thriller', 'Thrillers are characterized by fast pacing, frequent action, and resourceful heroes who must thwart the plans of more-powerful and better-equipped villains.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(27, 'Travel', 'Travel is the movement of people or objects (such as airplanes, boats, trains and other conveyances) between relatively distant geographical locations.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(28, 'Economics', 'Economics is a social science concerned with the factors that determine the production, distribution, and consumption of goods and services.', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(29, 'Politics', 'Politics (from Greek πολιτικός, \"of, for, or relating to citizens\"), is a process by which groups of people make collective decisions.', '2020-01-07 00:41:30', '2020-01-07 00:41:30');

-- --------------------------------------------------------

--
-- Table structure for table `homepage_settings`
--

DROP TABLE IF EXISTS `homepage_settings`;
CREATE TABLE IF NOT EXISTS `homepage_settings` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `homepage_settings`
--

INSERT INTO `homepage_settings` (`id`, `key`, `value`, `display_name`, `created_at`, `updated_at`) VALUES
(1, 'facebook', 'https://www.facebook.com/infyom', 'Facebook link', '2020-01-07 00:41:32', '2020-01-07 00:41:32'),
(2, 'github', 'https://github.com/InfyOmLabs', 'Github link', '2020-01-07 00:41:32', '2020-01-07 00:41:32'),
(3, 'linkedin', 'https://in.linkedin.com/company/infyom-technologies', 'Linkedin link', '2020-01-07 00:41:32', '2020-01-07 00:41:32'),
(4, 'twitter', 'infyom', 'Twitter link', '2020-01-07 00:41:32', '2020-01-07 00:41:32'),
(5, 'contact_email', 'contact@infyom.in', 'Contact Email', '2020-01-07 00:41:32', '2020-01-07 00:41:32'),
(6, 'contact_phone', '7096336561', 'Contact Phone', '2020-01-07 00:41:32', '2020-01-07 00:41:32'),
(7, 'website', 'http://www.infyom.com', 'Website', '2020-01-07 00:41:32', '2020-01-07 00:41:32'),
(8, 'company_description', 'Leading Laravel Development Company Of India.', 'Company Description', '2020-01-07 00:41:32', '2020-01-07 00:41:32');

-- --------------------------------------------------------

--
-- Table structure for table `issued_books`
--

DROP TABLE IF EXISTS `issued_books`;
CREATE TABLE IF NOT EXISTS `issued_books` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `book_item_id` int(10) UNSIGNED NOT NULL,
  `member_id` int(10) UNSIGNED NOT NULL,
  `reserve_date` datetime DEFAULT NULL,
  `issued_on` datetime DEFAULT NULL,
  `return_due_date` datetime DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `return_date` datetime DEFAULT NULL,
  `status` int(11) NOT NULL,
  `issuer_id` bigint(20) UNSIGNED DEFAULT NULL,
  `returner_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `issued_books_book_item_id_foreign` (`book_item_id`),
  KEY `issued_books_member_id_foreign` (`member_id`),
  KEY `issued_books_issuer_id_foreign` (`issuer_id`),
  KEY `issued_books_returner_id_foreign` (`returner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
CREATE TABLE IF NOT EXISTS `members` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `member_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `membership_plan_id` int(10) UNSIGNED NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `activation_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `email_verified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `members_member_id_unique` (`member_id`),
  UNIQUE KEY `members_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `member_id`, `first_name`, `last_name`, `email`, `password`, `membership_plan_id`, `phone`, `image`, `is_active`, `activation_code`, `created_at`, `updated_at`, `email_verified_at`) VALUES
(1, '5e1421140a8ae', 'LMS', 'Member', 'member@lms.com', '$2y$10$f/s4WDcLJOYfx48kaAJICu7K0vOU9JpDNE5/F18icWbm8i0XFDAj.', 1, NULL, NULL, 1, NULL, '2020-01-07 00:41:32', '2020-01-07 00:41:32', '2020-01-07 06:11:32');

-- --------------------------------------------------------

--
-- Table structure for table `membership_plans`
--

DROP TABLE IF EXISTS `membership_plans`;
CREATE TABLE IF NOT EXISTS `membership_plans` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double(8,2) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `frequency` int(11) NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_plan_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `membership_plans`
--

INSERT INTO `membership_plans` (`id`, `name`, `price`, `description`, `frequency`, `slug`, `stripe_plan_id`, `created_at`, `updated_at`) VALUES
(1, 'Silver', 300.00, 'Borrow 2 books at a time.', 1, 'silver', NULL, '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(2, 'Golden', 400.00, 'Borrow 4 books at a time.', 1, 'golden', NULL, '2020-01-07 00:41:31', '2020-01-07 00:41:31');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(107, '2014_10_12_000000_create_users_table', 1),
(108, '2014_10_12_100000_create_password_resets_table', 1),
(109, '2019_06_17_111046_create_genres_table', 1),
(110, '2019_06_18_041744_create_authors_table', 1),
(111, '2019_06_19_051749_create_publishers_table', 1),
(112, '2019_06_19_060058_create_tags_table', 1),
(113, '2019_06_19_094902_create_book_languages_table', 1),
(114, '2019_06_19_120625_create_books_table', 1),
(115, '2019_06_19_130589_create_countries_table', 1),
(116, '2019_06_20_073240_create_addresses_table', 1),
(117, '2019_06_24_045413_create_book_tags_table', 1),
(118, '2019_06_24_050246_create_book_genres_table', 1),
(119, '2019_06_24_094343_create_book_items_table', 1),
(120, '2019_06_24_104225_create_membership_plans_table', 1),
(121, '2019_06_24_115700_create_members_table', 1),
(122, '2019_06_25_052422_create_issued_books_table', 1),
(123, '2019_06_25_103633_create_book_series_table', 1),
(124, '2019_06_25_110455_create_series_books_table', 1),
(125, '2019_07_11_052338_create_book_authors_table', 1),
(126, '2019_07_12_122450_create_settings_table', 1),
(127, '2019_09_11_115425_create_permission_tables', 1),
(128, '2019_10_21_112403_create_book_requests_table', 1),
(129, '2019_10_23_070035_create_homepage_settings_table', 1),
(130, '2019_11_29_044349_add_email_verified_at_column_into_members_table', 1),
(131, '2019_11_29_070906_make_existing_users_and_member_email_verified', 1),
(132, '2019_12_06_114550_create_testimonials_table', 1),
(133, '2020_01_07_052507_make_book_item_price_nullable', 1);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
CREATE TABLE IF NOT EXISTS `model_has_permissions` (
  `permission_id` int(10) UNSIGNED NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
CREATE TABLE IF NOT EXISTS `model_has_roles` (
  `role_id` int(10) UNSIGNED NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\User', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'manage_books', 'web', 'Can Manage Books', 'Create/Update/Delete Books, Book Series, Book Languages, Authors, Publishers, Tags', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(2, 'issue_books', 'web', 'Can Manage Issue Books', 'Can Manage Issue Books', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(3, 'manage_members', 'web', 'Can Manage Members', 'Create/Update/Delete Members', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(4, 'manage_finance', 'web', 'Can Manage Finance', 'Manage Membership Plans, Payments', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(5, 'manage_settings', 'web', 'Can Manage Settings', 'Manage Settings', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(6, 'manage_roles', 'web', 'Can Manage Roles', 'Manage Roles', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(7, 'manage_authors', 'web', 'Can Manage Authors', 'Manage Authors', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(8, 'manage_publishers', 'web', 'Can Manage Publishers', 'Manage Publishers', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(9, 'manage_book_series', 'web', 'Can Manage Book Series', 'Manage Book Series', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(10, 'manage_users', 'web', 'Can Manage Users', 'Manage Users', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(11, 'manage_book_languages', 'web', 'Can Manage Book Languages', 'Manage Book Languages', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(12, 'manage_plans', 'web', 'Can Manage Plans', 'Manage Plans', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(13, 'manage_tags', 'web', 'Can Manage Tags', 'Manage Tags', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(14, 'manage_genres', 'web', 'Can Manage Genres', 'Manage Genres', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(15, 'manage_book_requests', 'web', 'Can Manage Book Requests', 'Manage Book Requests', '2020-01-07 00:41:30', '2020-01-07 00:41:30');

-- --------------------------------------------------------

--
-- Table structure for table `publishers`
--

DROP TABLE IF EXISTS `publishers`;
CREATE TABLE IF NOT EXISTS `publishers` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `publishers`
--

INSERT INTO `publishers` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Penguin Random House', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(2, 'McGraw-Hill Education', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(3, 'HarperCollins', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(4, 'Egmont Books', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(5, 'Shueisha', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(6, 'Kodansha', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(7, 'Pearson Education', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(8, 'Egmont Group', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(9, 'Klett', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(10, 'Jaico Publishing House', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(11, 'Westland Publications', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(12, 'Hachette Livre', '2020-01-07 00:41:31', '2020-01-07 00:41:31');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `display_name`, `description`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'Library Admin', 'Library Admin', 'web', '2020-01-07 00:41:30', '2020-01-07 00:41:30'),
(2, 'librarian', 'Librarian', 'Librarian', 'web', '2020-01-07 00:41:30', '2020-01-07 00:41:30');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
CREATE TABLE IF NOT EXISTS `role_has_permissions` (
  `permission_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(1, 2),
(2, 2),
(3, 2),
(5, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 2),
(11, 2),
(13, 2),
(14, 2),
(15, 2);

-- --------------------------------------------------------

--
-- Table structure for table `series_books`
--

DROP TABLE IF EXISTS `series_books`;
CREATE TABLE IF NOT EXISTS `series_books` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `series_id` int(10) UNSIGNED NOT NULL,
  `book_id` int(10) UNSIGNED NOT NULL,
  `sequence` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `series_books_series_id_foreign` (`series_id`),
  KEY `series_books_book_id_foreign` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `display_name`, `created_at`, `updated_at`) VALUES
(1, 'currency', 'INR', 'Indian Rupee', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(2, 'return_due_days', '15', 'Return Due Days', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(3, 'reserve_due_days', '5', 'Reserve Due Days', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(4, 'library_name', 'My Library', 'My Library', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(5, 'library_logo', 'logo-blue-black.png', 'Library Logo', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(6, 'language', 'en', 'English', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(7, 'favicon_icon', 'favicon.ico', 'Icon', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(8, 'reserve_books_limit', '5', 'Maximum reserve books limit', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(9, 'issue_books_limit', '5', 'Maximum issue books limit', '2020-01-07 00:41:31', '2020-01-07 00:41:31');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Family', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(2, 'Animal', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(3, 'Fiction', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(4, 'Science', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(5, 'History', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(6, 'Biopic', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(7, 'Art', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(8, 'Horror', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(9, 'Comedy', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(10, 'Nature', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(11, 'Popular', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(12, 'Sports', '2020-01-07 00:41:31', '2020-01-07 00:41:31'),
(13, 'Entertainment', '2020-01-07 00:41:31', '2020-01-07 00:41:31');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `occupation` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `email_verified_at`, `password`, `phone`, `image`, `is_active`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'LMS', 'Admin', 'admin@lms.com', '2020-01-07 00:41:30', '$2y$10$Rw9L8GNoSPPLiFi/uGu3iemmavYSCfKvX/7JjZnKXcuCbYwSArrFy', NULL, NULL, 1, NULL, '2020-01-07 00:41:30', '2020-01-07 00:41:30');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `book_authors`
--
ALTER TABLE `book_authors`
  ADD CONSTRAINT `book_authors_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_authors_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `book_genres`
--
ALTER TABLE `book_genres`
  ADD CONSTRAINT `book_genres_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_genres_genre_id_foreign` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `book_items`
--
ALTER TABLE `book_items`
  ADD CONSTRAINT `book_items_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `book_languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_items_publisher_id_foreign` FOREIGN KEY (`publisher_id`) REFERENCES `publishers` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `book_tags`
--
ALTER TABLE `book_tags`
  ADD CONSTRAINT `book_tags_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `issued_books`
--
ALTER TABLE `issued_books`
  ADD CONSTRAINT `issued_books_book_item_id_foreign` FOREIGN KEY (`book_item_id`) REFERENCES `book_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `issued_books_issuer_id_foreign` FOREIGN KEY (`issuer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `issued_books_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `issued_books_returner_id_foreign` FOREIGN KEY (`returner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `series_books`
--
ALTER TABLE `series_books`
  ADD CONSTRAINT `series_books_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `series_books_series_id_foreign` FOREIGN KEY (`series_id`) REFERENCES `book_series` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
