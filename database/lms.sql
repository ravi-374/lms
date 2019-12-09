-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 06, 2019 at 06:58 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.5

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
(1, 'Ernest', 'Hemingway', 'Ernest Miller Hemingway was an American journalist, novelist, short-story writer, and sportsman.', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(2, 'Stephen', 'King', 'Stephen Edwin King is an American author of horror, supernatural fiction, suspense, science fiction, and fantasy novels.', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(3, 'J. K.', 'Rowling', 'Joanne Rowling CH, OBE, FRSL, FRCPE, FRSE, better known by her pen names J. K. Rowling and Robert Galbraith, is a British novelist, screenwriter, producer, and philanthropist.', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(4, 'Jeff', 'Goins', 'Jeff Goins is an American author, blogger, and speaker. He is the founder of Tribe Writers, an online community for writers.', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(5, 'Arundhati', 'Roy', 'Suzanna Arundhati Roy is an Indian author best known for her novel The God of Small Things, which won the Man Booker Prize for Fiction in 1997 and became the biggest-selling book by a non-expatriate Indian author.', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(6, 'Chetan', 'Bhagat', 'Chetan Bhagat is a screenwriter, television personality and motivational speaker, known for his Indian-English novels about young urban middle class Indians.', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(7, 'Durjoy', 'Datta', 'Durjoy Datta is an Indian screenwriter and entrepreneur known for his novels about the romantic life of young Indians.', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(8, 'Hua', 'Yu', 'Yu Hua is a Chinese author, born April 3, 1960 in Hangzhou, Zhejiang province. Shortly after his debut as a fiction writer in 1983, Yu Hua was regarded as a promising avant-garde or post-New Wave writer.', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(9, 'Yukio', 'Mishima', 'Yukio Mishima is the pen name of Kimitake Hiraoka, a Japanese author, poet, playwright, actor, model, film director, nationalist, and founder of the Tatenokai.', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(10, 'Danielle', 'Steel', 'Danielle Fernandes Dominique Schuelein-Steel is an American writer, best known for her romance novels.', '2019-12-06 01:27:29', '2019-12-06 01:27:29');

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
  `price` double(8,2) NOT NULL,
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
(1, 'English', 'EN', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(2, 'Gujarati', 'GJ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(3, 'Marathi', 'MR', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(4, 'Urdu', 'UR', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(5, 'Spanish', 'ES', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(6, 'Portuguese', 'PT', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(7, 'French', 'FR', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(8, 'German', 'DE', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(9, 'Chinese', 'ZH', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(10, 'Italian', 'IT', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(11, 'Norwegian', 'NO', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(12, 'Russian', 'RU', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(13, 'Dutch', 'NL', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(14, 'Swedish', 'SV', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(15, 'Arabic', 'AR', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(16, 'Greek', 'EL', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(17, 'Japanese', 'JA', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(18, 'Korean', 'KO', '2019-12-06 01:27:28', '2019-12-06 01:27:28');

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
(1, 'Afghanistan', 'AF', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(2, 'Albania', 'AL', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(3, 'Algeria', 'DZ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(4, 'American Samoa', 'AS', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(5, 'Andorra', 'AD', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(6, 'Angola', 'AO', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(7, 'Anguilla', 'AI', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(8, 'Antarctica', 'AQ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(9, 'Antigua and Barbuda', 'AG', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(10, 'Argentina', 'AR', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(11, 'Armenia', 'AM', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(12, 'Aruba', 'AW', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(13, 'Australia', 'AU', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(14, 'Austria', 'AT', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(15, 'Azerbaijan', 'AZ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(16, 'Bahamas', 'BS', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(17, 'Bahrain', 'BH', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(18, 'Bangladesh', 'BD', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(19, 'Barbados', 'BB', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(20, 'Belarus', 'BY', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(21, 'Belgium', 'BE', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(22, 'Belize', 'BZ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(23, 'Benin', 'BJ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(24, 'Bermuda', 'BM', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(25, 'Bhutan', 'BT', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(26, 'Bolivia (Plurinational State of)', 'BO', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(27, 'Bonaire, Sint Eustatius and Saba', 'BQ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(28, 'Bosnia and Herzegovina', 'BA', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(29, 'Botswana', 'BW', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(30, 'Bouvet Island', 'BV', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(31, 'Brazil', 'BR', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(32, 'British Indian Ocean Territory', 'IO', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(33, 'United States Minor Outlying Islands', 'UM', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(34, 'Virgin Islands (British)', 'VG', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(35, 'Virgin Islands (U.S.)', 'VI', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(36, 'Brunei Darussalam', 'BN', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(37, 'Bulgaria', 'BG', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(38, 'Burkina Faso', 'BF', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(39, 'Burundi', 'BI', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(40, 'Cambodia', 'KH', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(41, 'Cameroon', 'CM', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(42, 'Canada', 'CA', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(43, 'Cabo Verde', 'CV', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(44, 'Cayman Islands', 'KY', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(45, 'Central African Republic', 'CF', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(46, 'Chad', 'TD', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(47, 'Chile', 'CL', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(48, 'China', 'CN', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(49, 'Christmas Island', 'CX', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(50, 'Cocos (Keeling) Islands', 'CC', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(51, 'Colombia', 'CO', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(52, 'Comoros', 'KM', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(53, 'Congo', 'CG', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(54, 'Congo (Democratic Republic of the)', 'CD', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(55, 'Cook Islands', 'CK', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(56, 'Costa Rica', 'CR', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(57, 'Croatia', 'HR', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(58, 'Cuba', 'CU', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(59, 'Curaçao', 'CW', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(60, 'Cyprus', 'CY', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(61, 'Czech Republic', 'CZ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(62, 'Denmark', 'DK', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(63, 'Djibouti', 'DJ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(64, 'Dominica', 'DM', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(65, 'Dominican Republic', 'DO', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(66, 'Ecuador', 'EC', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(67, 'Egypt', 'EG', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(68, 'El Salvador', 'SV', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(69, 'Equatorial Guinea', 'GQ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(70, 'Eritrea', 'ER', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(71, 'Estonia', 'EE', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(72, 'Ethiopia', 'ET', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(73, 'Falkland Islands (Malvinas)', 'FK', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(74, 'Faroe Islands', 'FO', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(75, 'Fiji', 'FJ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(76, 'Finland', 'FI', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(77, 'France', 'FR', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(78, 'French Guiana', 'GF', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(79, 'French Polynesia', 'PF', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(80, 'French Southern Territories', 'TF', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(81, 'Gabon', 'GA', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(82, 'Gambia', 'GM', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(83, 'Georgia', 'GE', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(84, 'Germany', 'DE', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(85, 'Ghana', 'GH', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(86, 'Gibraltar', 'GI', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(87, 'Greece', 'GR', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(88, 'Greenland', 'GL', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(89, 'Grenada', 'GD', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(90, 'Guadeloupe', 'GP', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(91, 'Guam', 'GU', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(92, 'Guatemala', 'GT', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(93, 'Guernsey', 'GG', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(94, 'Guinea', 'GN', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(95, 'Guinea-Bissau', 'GW', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(96, 'Guyana', 'GY', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(97, 'Haiti', 'HT', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(98, 'Heard Island and McDonald Islands', 'HM', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(99, 'Holy See', 'VA', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(100, 'Honduras', 'HN', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(101, 'Hong Kong', 'HK', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(102, 'Hungary', 'HU', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(103, 'Iceland', 'IS', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(104, 'India', 'IN', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(105, 'Indonesia', 'ID', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(106, 'Iran (Islamic Republic of)', 'IR', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(107, 'Iraq', 'IQ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(108, 'Ireland', 'IE', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(109, 'Isle of Man', 'IM', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(110, 'Israel', 'IL', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(111, 'Italy', 'IT', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(112, 'Jamaica', 'JM', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(113, 'Japan', 'JP', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(114, 'Jersey', 'JE', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(115, 'Jordan', 'JO', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(116, 'Kazakhstan', 'KZ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(117, 'Kenya', 'KE', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(118, 'Kiribati', 'KI', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(119, 'Kuwait', 'KW', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(120, 'Kyrgyzstan', 'KG', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(121, 'Lao People\'s Democratic Republic', 'LA', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(122, 'Latvia', 'LV', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(123, 'Lebanon', 'LB', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(124, 'Lesotho', 'LS', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(125, 'Liberia', 'LR', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(126, 'Libya', 'LY', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(127, 'Liechtenstein', 'LI', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(128, 'Lithuania', 'LT', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(129, 'Luxembourg', 'LU', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(130, 'Macao', 'MO', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(131, 'Macedonia (the former Yugoslav Republic of)', 'MK', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(132, 'Madagascar', 'MG', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(133, 'Malawi', 'MW', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(134, 'Malaysia', 'MY', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(135, 'Maldives', 'MV', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(136, 'Mali', 'ML', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(137, 'Malta', 'MT', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(138, 'Marshall Islands', 'MH', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(139, 'Martinique', 'MQ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(140, 'Mauritania', 'MR', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(141, 'Mauritius', 'MU', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(142, 'Mayotte', 'YT', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(143, 'Mexico', 'MX', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(144, 'Micronesia (Federated States of)', 'FM', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(145, 'Moldova (Republic of)', 'MD', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(146, 'Monaco', 'MC', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(147, 'Mongolia', 'MN', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(148, 'Montenegro', 'ME', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(149, 'Montserrat', 'MS', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(150, 'Morocco', 'MA', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(151, 'Mozambique', 'MZ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(152, 'Myanmar', 'MM', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(153, 'Namibia', 'NA', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(154, 'Nauru', 'NR', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(155, 'Nepal', 'NP', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(156, 'Netherlands', 'NL', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(157, 'New Caledonia', 'NC', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(158, 'New Zealand', 'NZ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(159, 'Nicaragua', 'NI', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(160, 'Niger', 'NE', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(161, 'Nigeria', 'NG', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(162, 'Niue', 'NU', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(163, 'Norfolk Island', 'NF', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(164, 'Korea (Democratic People\'s Republic of)', 'KP', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(165, 'Northern Mariana Islands', 'MP', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(166, 'Norway', 'NO', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(167, 'Oman', 'OM', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(168, 'Pakistan', 'PK', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(169, 'Palau', 'PW', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(170, 'Palestine, State of', 'PS', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(171, 'Panama', 'PA', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(172, 'Papua New Guinea', 'PG', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(173, 'Paraguay', 'PY', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(174, 'Peru', 'PE', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(175, 'Philippines', 'PH', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(176, 'Pitcairn', 'PN', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(177, 'Poland', 'PL', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(178, 'Portugal', 'PT', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(179, 'Puerto Rico', 'PR', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(180, 'Qatar', 'QA', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(181, 'Republic of Kosovo', 'XK', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(182, 'Romania', 'RO', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(183, 'Russian Federation', 'RU', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(184, 'Rwanda', 'RW', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(185, 'Saint Helena, Ascension and Tristan da Cunha', 'SH', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(186, 'Saint Kitts and Nevis', 'KN', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(187, 'Saint Lucia', 'LC', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(188, 'Saint Martin (French part)', 'MF', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(189, 'Saint Pierre and Miquelon', 'PM', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(190, 'Saint Vincent and the Grenadines', 'VC', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(191, 'Samoa', 'WS', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(192, 'San Marino', 'SM', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(193, 'Sao Tome and Principe', 'ST', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(194, 'Saudi Arabia', 'SA', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(195, 'Senegal', 'SN', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(196, 'Serbia', 'RS', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(197, 'Seychelles', 'SC', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(198, 'Sierra Leone', 'SL', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(199, 'Singapore', 'SG', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(200, 'Sint Maarten (Dutch part)', 'SX', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(201, 'Slovakia', 'SK', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(202, 'Slovenia', 'SI', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(203, 'Solomon Islands', 'SB', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(204, 'Somalia', 'SO', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(205, 'South Africa', 'ZA', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(206, 'South Georgia and the South Sandwich Islands', 'GS', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(207, 'Korea (Republic of)', 'KR', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(208, 'South Sudan', 'SS', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(209, 'Spain', 'ES', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(210, 'Sri Lanka', 'LK', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(211, 'Sudan', 'SD', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(212, 'Suriname', 'SR', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(213, 'Svalbard and Jan Mayen', 'SJ', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(214, 'Swaziland', 'SZ', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(215, 'Sweden', 'SE', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(216, 'Switzerland', 'CH', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(217, 'Syrian Arab Republic', 'SY', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(218, 'Taiwan', 'TW', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(219, 'Tajikistan', 'TJ', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(220, 'Tanzania, United Republic of', 'TZ', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(221, 'Thailand', 'TH', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(222, 'Timor-Leste', 'TL', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(223, 'Togo', 'TG', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(224, 'Tokelau', 'TK', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(225, 'Tonga', 'TO', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(226, 'Trinidad and Tobago', 'TT', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(227, 'Tunisia', 'TN', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(228, 'Turkey', 'TR', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(229, 'Turkmenistan', 'TM', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(230, 'Turks and Caicos Islands', 'TC', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(231, 'Tuvalu', 'TV', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(232, 'Uganda', 'UG', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(233, 'Ukraine', 'UA', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(234, 'United Arab Emirates', 'AE', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(235, 'United Kingdom of Great Britain and Northern Ireland', 'GB', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(236, 'United States of America', 'US', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(237, 'Uruguay', 'UY', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(238, 'Uzbekistan', 'UZ', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(239, 'Vanuatu', 'VU', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(240, 'Venezuela (Bolivarian Republic of)', 'VE', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(241, 'Viet Nam', 'VN', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(242, 'Wallis and Futuna', 'WF', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(243, 'Western Sahara', 'EH', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(244, 'Yemen', 'YE', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(245, 'Zambia', 'ZM', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(246, 'Zimbabwe', 'ZW', '2019-12-06 01:27:29', '2019-12-06 01:27:29');

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
(1, 'Art', 'Books that showcase particular types of art.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(2, 'Biography', 'A biography (from the Greek words bios meaning \"life\", and graphos meaning \"write\") is a non-fictional account of a person\'s life. Biographies are written by an author who is not the subject/focus of the book. ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(3, 'Business', 'A business (also known as enterprise or firm) is an organization engaged in the trade of goods, services, or both to consumers.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(4, 'Comics', 'A comic book or comicbook, also called comic magazine or simply comic, is a publication that consists of comic art in the form of sequential juxtaposed panels that represent individual scenes.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(5, 'Contemporary', 'Contemporary fiction creates imaginary characters and situations that depict our world\r\nand society. It focuses on themes of growing up and confronting personal and social problems. ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(6, 'Crime', 'Crime fiction is the literary genre that fictionalises crimes, their detection, criminals and their motives.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(7, 'Fantasy', 'Fantasy is a genre that uses magic and other supernatural forms as a primary element of plot, theme, and/or setting. Fantasy is generally distinguished from science fiction and horror by the expectation that it steers clear of technological and macabre themes, respectively, though there is a great deal of overlap between the three (collectively known as speculative fiction or science fiction/fantasy).', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(8, 'Fiction', 'Fiction is the telling of stories which are not real. More specifically, fiction is an imaginative form of narrative, one of the four basic rhetorical modes.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(9, 'Novels', '', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(10, 'History', 'History (from Greek ἱστορία - historia, meaning \"inquiry, knowledge acquired by investigation\") is the discovery, collection, organization, and presentation of information about past events. History can also mean the period of time after writing was invented.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(11, 'Horror', 'Horror fiction is fiction in any medium intended to scare, unsettle, or horrify the audience. Historically, the cause of the \"horror\" experience has often been the intrusion of a supernatural element into everyday human experience.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(12, 'Humor and Comedy', '', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(13, 'Music', 'Books about music history, music genres and musicians.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(14, 'Mystery', 'The mystery genre is a type of fiction in which a detective, or other professional, solves a crime or series of crimes. It can take the form of a novel or short story.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(15, 'Nonfiction', 'Nonfiction is an account or representation of a subject which is presented as fact. This presentation may be accurate or not; that is, it can give either a true or a false account of the subject in question. ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(16, 'Philosophy', 'Philosophy is the study of general problems concerning matters such as existence, knowledge, truth, beauty, justice, validity, mind, and language. ', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(17, 'Poetry', 'Poetry is a form of literary art in which language is used for its aesthetic and evocative qualities in addition to, or in lieu of, its apparent meaning.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(18, 'Psychology', 'Books that involve psychology; the study of mental processes and human behavior.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(19, 'Religion', 'Religion is a cultural system that establishes symbols that relate humanity to spirituality and moral values. Many religions have narratives, symbols, traditions and sacred histories that are intended to give meaning to life or to explain the origin of life or the universe.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(20, 'Romance', 'According to the Romance Writers of America, \"Two basic elements comprise every romance novel: a central love story and an emotionally-satisfying and optimistic ending.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(21, 'Science', 'Science (from the Latin scientia, meaning “knowledge”) is the effort to discover, and increase human understanding of how the physical world works.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(22, 'Self Help', 'Self-help, or self-improvement, is a self-guided improvement[1]—economically, intellectually, or emotionally—often with a substantial psychological basis.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(23, 'Suspense', 'Suspense is the element of both fiction and some nonfiction that makes the reader uncertain about the outcome.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(24, 'Spirituality', 'Spirituality may refer to almost any kind of meaningful activity, personal growth, or blissful experience.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(25, 'Sports', 'Sports : engagement in physical activity intended to create a benefit to the participant. Ranging from Amateur to Professional, from incompetent to proficient, for all levels of ability, all nations, all creeds, all genders. As James Joyce said \"I am, a stride at a time\"', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(26, 'Thriller', 'Thrillers are characterized by fast pacing, frequent action, and resourceful heroes who must thwart the plans of more-powerful and better-equipped villains.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(27, 'Travel', 'Travel is the movement of people or objects (such as airplanes, boats, trains and other conveyances) between relatively distant geographical locations.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(28, 'Economics', 'Economics is a social science concerned with the factors that determine the production, distribution, and consumption of goods and services.', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(29, 'Politics', 'Politics (from Greek πολιτικός, \"of, for, or relating to citizens\"), is a process by which groups of people make collective decisions.', '2019-12-06 01:27:28', '2019-12-06 01:27:28');

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
(1, 'facebook', 'https://www.facebook.com/infyom', 'Facebook link', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(2, 'github', 'https://github.com/InfyOmLabs', 'Github link', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(3, 'linkedin', 'https://in.linkedin.com/company/infyom-technologies', 'Linkedin link', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(4, 'twitter', 'infyom', 'Twitter link', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(5, 'contact_email', 'contact@infyom.in', 'Contact Email', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(6, 'contact_phone', '7096336561', 'Contact Phone', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(7, 'website', 'http://www.infyom.com', 'Website', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(8, 'company_description', 'Leading Laravel Development Company Of India.', 'Company Description', '2019-12-06 01:27:29', '2019-12-06 01:27:29');

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
(1, '5de9fbd957d12', 'LMS', 'Member', 'member@lms.com', '$2y$10$Zkm0N6tea4YCqopX45bqWemYWROGO5ZDj3Txam3c/whefSy8eeq5G', 1, NULL, NULL, 1, NULL, '2019-12-06 01:27:29', '2019-12-06 01:27:29', '2019-12-06 06:57:29');

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
(1, 'Silver', 300.00, 'Borrow 2 books at a time.', 1, 'silver', NULL, '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(2, 'Golden', 400.00, 'Borrow 4 books at a time.', 1, 'golden', NULL, '2019-12-06 01:27:29', '2019-12-06 01:27:29');

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
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(76, '2014_10_12_000000_create_users_table', 1),
(77, '2014_10_12_100000_create_password_resets_table', 1),
(78, '2019_06_17_111046_create_genres_table', 1),
(79, '2019_06_18_041744_create_authors_table', 1),
(80, '2019_06_19_051749_create_publishers_table', 1),
(81, '2019_06_19_060058_create_tags_table', 1),
(82, '2019_06_19_094902_create_book_languages_table', 1),
(83, '2019_06_19_120625_create_books_table', 1),
(84, '2019_06_19_130589_create_countries_table', 1),
(85, '2019_06_20_073240_create_addresses_table', 1),
(86, '2019_06_24_045413_create_book_tags_table', 1),
(87, '2019_06_24_050246_create_book_genres_table', 1),
(88, '2019_06_24_094343_create_book_items_table', 1),
(89, '2019_06_24_104225_create_membership_plans_table', 1),
(90, '2019_06_24_115700_create_members_table', 1),
(91, '2019_06_25_052422_create_issued_books_table', 1),
(92, '2019_06_25_103633_create_book_series_table', 1),
(93, '2019_06_25_110455_create_series_books_table', 1),
(94, '2019_07_11_052338_create_book_authors_table', 1),
(95, '2019_07_12_122450_create_settings_table', 1),
(96, '2019_09_11_115425_create_permission_tables', 1),
(97, '2019_10_21_112403_create_book_requests_table', 1),
(98, '2019_10_23_070035_create_homepage_settings_table', 1),
(99, '2019_11_26_062402_create_testimonials_table', 1),
(100, '2019_11_29_044349_add_email_verified_at_column_into_members_table', 1),
(101, '2019_11_29_070906_make_existing_users_and_member_email_verified', 1);

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
(1, 'manage_books', 'web', 'Can Manage Books', 'Create/Update/Delete Books, Book Series, Book Languages, Authors, Publishers, Tags', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(2, 'issue_books', 'web', 'Can Manage Issue Books', 'Can Manage Issue Books', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(3, 'manage_members', 'web', 'Can Manage Members', 'Create/Update/Delete Members', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(4, 'manage_finance', 'web', 'Can Manage Finance', 'Manage Membership Plans, Payments', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(5, 'manage_settings', 'web', 'Can Manage Settings', 'Manage Settings', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(6, 'manage_roles', 'web', 'Can Manage Roles', 'Manage Roles', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(7, 'manage_authors', 'web', 'Can Manage Authors', 'Manage Authors', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(8, 'manage_publishers', 'web', 'Can Manage Publishers', 'Manage Publishers', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(9, 'manage_book_series', 'web', 'Can Manage Book Series', 'Manage Book Series', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(10, 'manage_users', 'web', 'Can Manage Users', 'Manage Users', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(11, 'manage_book_languages', 'web', 'Can Manage Book Languages', 'Manage Book Languages', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(12, 'manage_plans', 'web', 'Can Manage Plans', 'Manage Plans', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(13, 'manage_tags', 'web', 'Can Manage Tags', 'Manage Tags', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(14, 'manage_genres', 'web', 'Can Manage Genres', 'Manage Genres', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(15, 'manage_book_requests', 'web', 'Can Manage Book Requests', 'Manage Book Requests', '2019-12-06 01:27:28', '2019-12-06 01:27:28');

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
(1, 'Penguin Random House', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(2, 'McGraw-Hill Education', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(3, 'HarperCollins', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(4, 'Egmont Books', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(5, 'Shueisha', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(6, 'Kodansha', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(7, 'Pearson Education', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(8, 'Egmont Group', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(9, 'Klett', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(10, 'Jaico Publishing House', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(11, 'Westland Publications', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(12, 'Hachette Livre', '2019-12-06 01:27:29', '2019-12-06 01:27:29');

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
(1, 'admin', 'Library Admin', 'Library Admin', 'web', '2019-12-06 01:27:28', '2019-12-06 01:27:28'),
(2, 'librarian', 'Librarian', 'Librarian', 'web', '2019-12-06 01:27:28', '2019-12-06 01:27:28');

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
(1, 'currency', 'INR', 'Indian Rupee', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(2, 'return_due_days', '15', 'Return Due Days', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(3, 'reserve_due_days', '5', 'Reserve Due Days', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(4, 'library_name', 'My Library', 'My Library', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(5, 'library_logo', 'logo-blue-black.png', 'Library Logo', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(6, 'language', 'en', 'English', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(7, 'favicon_icon', 'favicon.ico', 'Icon', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(8, 'reserve_books_limit', '5', 'Maximum reserve books limit', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(9, 'issue_books_limit', '5', 'Maximum issue books limit', '2019-12-06 01:27:29', '2019-12-06 01:27:29');

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
(1, 'Family', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(2, 'Animal', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(3, 'Fiction', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(4, 'Science', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(5, 'History', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(6, 'Biopic', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(7, 'Art', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(8, 'Horror', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(9, 'Comedy', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(10, 'Nature', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(11, 'Popular', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(12, 'Sports', '2019-12-06 01:27:29', '2019-12-06 01:27:29'),
(13, 'Entertainment', '2019-12-06 01:27:29', '2019-12-06 01:27:29');

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
(1, 'LMS', 'Admin', 'admin@lms.com', '2019-12-06 01:27:28', '$2y$10$LqSx3O8ZG76ggOnd2tmcO.RLgwF6CV//nDDLvJJy0/.TgWOJzHVTC', NULL, NULL, 1, NULL, '2019-12-06 01:27:28', '2019-12-06 01:27:28');

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
