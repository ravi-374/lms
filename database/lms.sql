-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 16, 2021 at 11:20 AM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Table structure for table `about_us_cards`
--

CREATE TABLE `about_us_cards` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(10) UNSIGNED NOT NULL,
  `owner_id` int(11) NOT NULL,
  `owner_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_1` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_2` text COLLATE utf8mb4_unicode_ci,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zip` int(11) NOT NULL,
  `country_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `first_name`, `last_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Ernest', 'Hemingway', 'Ernest Miller Hemingway was an American journalist, novelist, short-story writer, and sportsman.', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(2, 'Stephen', 'King', 'Stephen Edwin King is an American author of horror, supernatural fiction, suspense, science fiction, and fantasy novels.', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(3, 'J. K.', 'Rowling', 'Joanne Rowling CH, OBE, FRSL, FRCPE, FRSE, better known by her pen names J. K. Rowling and Robert Galbraith, is a British novelist, screenwriter, producer, and philanthropist.', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(4, 'Jeff', 'Goins', 'Jeff Goins is an American author, blogger, and speaker. He is the founder of Tribe Writers, an online community for writers.', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(5, 'Arundhati', 'Roy', 'Suzanna Arundhati Roy is an Indian author best known for her novel The God of Small Things, which won the Man Booker Prize for Fiction in 1997 and became the biggest-selling book by a non-expatriate Indian author.', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(6, 'Chetan', 'Bhagat', 'Chetan Bhagat is a screenwriter, television personality and motivational speaker, known for his Indian-English novels about young urban middle class Indians.', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(7, 'Durjoy', 'Datta', 'Durjoy Datta is an Indian screenwriter and entrepreneur known for his novels about the romantic life of young Indians.', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(8, 'Hua', 'Yu', 'Yu Hua is a Chinese author, born April 3, 1960 in Hangzhou, Zhejiang province. Shortly after his debut as a fiction writer in 1983, Yu Hua was regarded as a promising avant-garde or post-New Wave writer.', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(9, 'Yukio', 'Mishima', 'Yukio Mishima is the pen name of Kimitake Hiraoka, a Japanese author, poet, playwright, actor, model, film director, nationalist, and founder of the Tatenokai.', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(10, 'Danielle', 'Steel', 'Danielle Fernandes Dominique Schuelein-Steel is an American writer, best known for her romance novels.', '2021-02-16 05:50:15', '2021-02-16 05:50:15');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `published_on` datetime DEFAULT NULL,
  `isbn` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `book_authors`
--

CREATE TABLE `book_authors` (
  `id` int(10) UNSIGNED NOT NULL,
  `book_id` int(10) UNSIGNED NOT NULL,
  `author_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `book_genres`
--

CREATE TABLE `book_genres` (
  `id` int(10) UNSIGNED NOT NULL,
  `book_id` int(10) UNSIGNED NOT NULL,
  `genre_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `book_items`
--

CREATE TABLE `book_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `book_id` int(10) UNSIGNED NOT NULL,
  `book_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `edition` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `format` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double DEFAULT NULL,
  `publisher_id` int(10) UNSIGNED DEFAULT NULL,
  `language_id` int(10) UNSIGNED NOT NULL,
  `file_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `book_languages`
--

CREATE TABLE `book_languages` (
  `id` int(10) UNSIGNED NOT NULL,
  `language_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `book_languages`
--

INSERT INTO `book_languages` (`id`, `language_name`, `language_code`, `created_at`, `updated_at`) VALUES
(1, 'English', 'EN', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(2, 'Gujarati', 'GJ', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(3, 'Marathi', 'MR', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(4, 'Urdu', 'UR', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(5, 'Spanish', 'ES', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(6, 'Portuguese', 'PT', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(7, 'French', 'FR', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(8, 'German', 'DE', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(9, 'Chinese', 'ZH', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(10, 'Italian', 'IT', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(11, 'Norwegian', 'NO', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(12, 'Russian', 'RU', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(13, 'Dutch', 'NL', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(14, 'Swedish', 'SV', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(15, 'Arabic', 'AR', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(16, 'Greek', 'EL', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(17, 'Japanese', 'JA', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(18, 'Korean', 'KO', '2021-02-16 05:50:14', '2021-02-16 05:50:14');

-- --------------------------------------------------------

--
-- Table structure for table `book_requests`
--

CREATE TABLE `book_requests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `member_id` int(10) UNSIGNED NOT NULL,
  `book_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isbn` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `edition` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `format` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `book_series`
--

CREATE TABLE `book_series` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `book_tags`
--

CREATE TABLE `book_tags` (
  `id` int(10) UNSIGNED NOT NULL,
  `book_id` int(10) UNSIGNED NOT NULL,
  `tag_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `code`, `created_at`, `updated_at`) VALUES
(1, 'Afghanistan', 'AF', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(2, 'Albania', 'AL', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(3, 'Algeria', 'DZ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(4, 'American Samoa', 'AS', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(5, 'Andorra', 'AD', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(6, 'Angola', 'AO', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(7, 'Anguilla', 'AI', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(8, 'Antarctica', 'AQ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(9, 'Antigua and Barbuda', 'AG', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(10, 'Argentina', 'AR', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(11, 'Armenia', 'AM', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(12, 'Aruba', 'AW', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(13, 'Australia', 'AU', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(14, 'Austria', 'AT', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(15, 'Azerbaijan', 'AZ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(16, 'Bahamas', 'BS', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(17, 'Bahrain', 'BH', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(18, 'Bangladesh', 'BD', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(19, 'Barbados', 'BB', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(20, 'Belarus', 'BY', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(21, 'Belgium', 'BE', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(22, 'Belize', 'BZ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(23, 'Benin', 'BJ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(24, 'Bermuda', 'BM', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(25, 'Bhutan', 'BT', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(26, 'Bolivia (Plurinational State of)', 'BO', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(27, 'Bonaire, Sint Eustatius and Saba', 'BQ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(28, 'Bosnia and Herzegovina', 'BA', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(29, 'Botswana', 'BW', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(30, 'Bouvet Island', 'BV', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(31, 'Brazil', 'BR', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(32, 'British Indian Ocean Territory', 'IO', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(33, 'United States Minor Outlying Islands', 'UM', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(34, 'Virgin Islands (British)', 'VG', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(35, 'Virgin Islands (U.S.)', 'VI', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(36, 'Brunei Darussalam', 'BN', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(37, 'Bulgaria', 'BG', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(38, 'Burkina Faso', 'BF', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(39, 'Burundi', 'BI', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(40, 'Cambodia', 'KH', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(41, 'Cameroon', 'CM', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(42, 'Canada', 'CA', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(43, 'Cabo Verde', 'CV', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(44, 'Cayman Islands', 'KY', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(45, 'Central African Republic', 'CF', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(46, 'Chad', 'TD', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(47, 'Chile', 'CL', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(48, 'China', 'CN', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(49, 'Christmas Island', 'CX', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(50, 'Cocos (Keeling) Islands', 'CC', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(51, 'Colombia', 'CO', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(52, 'Comoros', 'KM', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(53, 'Congo', 'CG', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(54, 'Congo (Democratic Republic of the)', 'CD', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(55, 'Cook Islands', 'CK', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(56, 'Costa Rica', 'CR', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(57, 'Croatia', 'HR', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(58, 'Cuba', 'CU', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(59, 'Curaçao', 'CW', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(60, 'Cyprus', 'CY', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(61, 'Czech Republic', 'CZ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(62, 'Denmark', 'DK', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(63, 'Djibouti', 'DJ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(64, 'Dominica', 'DM', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(65, 'Dominican Republic', 'DO', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(66, 'Ecuador', 'EC', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(67, 'Egypt', 'EG', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(68, 'El Salvador', 'SV', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(69, 'Equatorial Guinea', 'GQ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(70, 'Eritrea', 'ER', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(71, 'Estonia', 'EE', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(72, 'Ethiopia', 'ET', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(73, 'Falkland Islands (Malvinas)', 'FK', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(74, 'Faroe Islands', 'FO', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(75, 'Fiji', 'FJ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(76, 'Finland', 'FI', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(77, 'France', 'FR', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(78, 'French Guiana', 'GF', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(79, 'French Polynesia', 'PF', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(80, 'French Southern Territories', 'TF', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(81, 'Gabon', 'GA', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(82, 'Gambia', 'GM', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(83, 'Georgia', 'GE', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(84, 'Germany', 'DE', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(85, 'Ghana', 'GH', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(86, 'Gibraltar', 'GI', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(87, 'Greece', 'GR', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(88, 'Greenland', 'GL', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(89, 'Grenada', 'GD', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(90, 'Guadeloupe', 'GP', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(91, 'Guam', 'GU', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(92, 'Guatemala', 'GT', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(93, 'Guernsey', 'GG', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(94, 'Guinea', 'GN', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(95, 'Guinea-Bissau', 'GW', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(96, 'Guyana', 'GY', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(97, 'Haiti', 'HT', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(98, 'Heard Island and McDonald Islands', 'HM', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(99, 'Holy See', 'VA', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(100, 'Honduras', 'HN', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(101, 'Hong Kong', 'HK', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(102, 'Hungary', 'HU', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(103, 'Iceland', 'IS', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(104, 'India', 'IN', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(105, 'Indonesia', 'ID', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(106, 'Iran (Islamic Republic of)', 'IR', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(107, 'Iraq', 'IQ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(108, 'Ireland', 'IE', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(109, 'Isle of Man', 'IM', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(110, 'Israel', 'IL', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(111, 'Italy', 'IT', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(112, 'Jamaica', 'JM', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(113, 'Japan', 'JP', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(114, 'Jersey', 'JE', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(115, 'Jordan', 'JO', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(116, 'Kazakhstan', 'KZ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(117, 'Kenya', 'KE', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(118, 'Kiribati', 'KI', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(119, 'Kuwait', 'KW', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(120, 'Kyrgyzstan', 'KG', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(121, 'Lao People\'s Democratic Republic', 'LA', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(122, 'Latvia', 'LV', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(123, 'Lebanon', 'LB', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(124, 'Lesotho', 'LS', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(125, 'Liberia', 'LR', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(126, 'Libya', 'LY', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(127, 'Liechtenstein', 'LI', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(128, 'Lithuania', 'LT', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(129, 'Luxembourg', 'LU', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(130, 'Macao', 'MO', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(131, 'Macedonia (the former Yugoslav Republic of)', 'MK', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(132, 'Madagascar', 'MG', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(133, 'Malawi', 'MW', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(134, 'Malaysia', 'MY', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(135, 'Maldives', 'MV', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(136, 'Mali', 'ML', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(137, 'Malta', 'MT', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(138, 'Marshall Islands', 'MH', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(139, 'Martinique', 'MQ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(140, 'Mauritania', 'MR', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(141, 'Mauritius', 'MU', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(142, 'Mayotte', 'YT', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(143, 'Mexico', 'MX', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(144, 'Micronesia (Federated States of)', 'FM', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(145, 'Moldova (Republic of)', 'MD', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(146, 'Monaco', 'MC', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(147, 'Mongolia', 'MN', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(148, 'Montenegro', 'ME', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(149, 'Montserrat', 'MS', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(150, 'Morocco', 'MA', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(151, 'Mozambique', 'MZ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(152, 'Myanmar', 'MM', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(153, 'Namibia', 'NA', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(154, 'Nauru', 'NR', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(155, 'Nepal', 'NP', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(156, 'Netherlands', 'NL', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(157, 'New Caledonia', 'NC', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(158, 'New Zealand', 'NZ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(159, 'Nicaragua', 'NI', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(160, 'Niger', 'NE', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(161, 'Nigeria', 'NG', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(162, 'Niue', 'NU', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(163, 'Norfolk Island', 'NF', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(164, 'Korea (Democratic People\'s Republic of)', 'KP', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(165, 'Northern Mariana Islands', 'MP', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(166, 'Norway', 'NO', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(167, 'Oman', 'OM', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(168, 'Pakistan', 'PK', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(169, 'Palau', 'PW', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(170, 'Palestine, State of', 'PS', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(171, 'Panama', 'PA', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(172, 'Papua New Guinea', 'PG', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(173, 'Paraguay', 'PY', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(174, 'Peru', 'PE', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(175, 'Philippines', 'PH', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(176, 'Pitcairn', 'PN', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(177, 'Poland', 'PL', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(178, 'Portugal', 'PT', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(179, 'Puerto Rico', 'PR', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(180, 'Qatar', 'QA', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(181, 'Republic of Kosovo', 'XK', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(182, 'Romania', 'RO', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(183, 'Russian Federation', 'RU', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(184, 'Rwanda', 'RW', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(185, 'Saint Helena, Ascension and Tristan da Cunha', 'SH', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(186, 'Saint Kitts and Nevis', 'KN', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(187, 'Saint Lucia', 'LC', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(188, 'Saint Martin (French part)', 'MF', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(189, 'Saint Pierre and Miquelon', 'PM', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(190, 'Saint Vincent and the Grenadines', 'VC', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(191, 'Samoa', 'WS', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(192, 'San Marino', 'SM', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(193, 'Sao Tome and Principe', 'ST', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(194, 'Saudi Arabia', 'SA', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(195, 'Senegal', 'SN', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(196, 'Serbia', 'RS', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(197, 'Seychelles', 'SC', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(198, 'Sierra Leone', 'SL', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(199, 'Singapore', 'SG', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(200, 'Sint Maarten (Dutch part)', 'SX', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(201, 'Slovakia', 'SK', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(202, 'Slovenia', 'SI', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(203, 'Solomon Islands', 'SB', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(204, 'Somalia', 'SO', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(205, 'South Africa', 'ZA', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(206, 'South Georgia and the South Sandwich Islands', 'GS', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(207, 'Korea (Republic of)', 'KR', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(208, 'South Sudan', 'SS', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(209, 'Spain', 'ES', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(210, 'Sri Lanka', 'LK', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(211, 'Sudan', 'SD', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(212, 'Suriname', 'SR', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(213, 'Svalbard and Jan Mayen', 'SJ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(214, 'Swaziland', 'SZ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(215, 'Sweden', 'SE', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(216, 'Switzerland', 'CH', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(217, 'Syrian Arab Republic', 'SY', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(218, 'Taiwan', 'TW', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(219, 'Tajikistan', 'TJ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(220, 'Tanzania, United Republic of', 'TZ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(221, 'Thailand', 'TH', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(222, 'Timor-Leste', 'TL', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(223, 'Togo', 'TG', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(224, 'Tokelau', 'TK', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(225, 'Tonga', 'TO', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(226, 'Trinidad and Tobago', 'TT', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(227, 'Tunisia', 'TN', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(228, 'Turkey', 'TR', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(229, 'Turkmenistan', 'TM', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(230, 'Turks and Caicos Islands', 'TC', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(231, 'Tuvalu', 'TV', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(232, 'Uganda', 'UG', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(233, 'Ukraine', 'UA', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(234, 'United Arab Emirates', 'AE', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(235, 'United Kingdom of Great Britain and Northern Ireland', 'GB', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(236, 'United States of America', 'US', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(237, 'Uruguay', 'UY', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(238, 'Uzbekistan', 'UZ', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(239, 'Vanuatu', 'VU', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(240, 'Venezuela (Bolivarian Republic of)', 'VE', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(241, 'Viet Nam', 'VN', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(242, 'Wallis and Futuna', 'WF', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(243, 'Western Sahara', 'EH', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(244, 'Yemen', 'YE', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(245, 'Zambia', 'ZM', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(246, 'Zimbabwe', 'ZW', '2021-02-16 05:50:15', '2021-02-16 05:50:15');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `show_on_landing_page` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `name`, `description`, `created_at`, `updated_at`, `show_on_landing_page`) VALUES
(1, 'Art', 'Books that showcase particular types of art.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(2, 'Biography', 'A biography (from the Greek words bios meaning \"life\", and graphos meaning \"write\") is a non-fictional account of a person\'s life. Biographies are written by an author who is not the subject/focus of the book. ', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(3, 'Business', 'A business (also known as enterprise or firm) is an organization engaged in the trade of goods, services, or both to consumers.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(4, 'Comics', 'A comic book or comicbook, also called comic magazine or simply comic, is a publication that consists of comic art in the form of sequential juxtaposed panels that represent individual scenes.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(5, 'Contemporary', 'Contemporary fiction creates imaginary characters and situations that depict our world\nand society. It focuses on themes of growing up and confronting personal and social problems. ', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(6, 'Crime', 'Crime fiction is the literary genre that fictionalises crimes, their detection, criminals and their motives.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(7, 'Fantasy', 'Fantasy is a genre that uses magic and other supernatural forms as a primary element of plot, theme, and/or setting. Fantasy is generally distinguished from science fiction and horror by the expectation that it steers clear of technological and macabre themes, respectively, though there is a great deal of overlap between the three (collectively known as speculative fiction or science fiction/fantasy).', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(8, 'Fiction', 'Fiction is the telling of stories which are not real. More specifically, fiction is an imaginative form of narrative, one of the four basic rhetorical modes.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(9, 'Novels', '', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(10, 'History', 'History (from Greek ἱστορία - historia, meaning \"inquiry, knowledge acquired by investigation\") is the discovery, collection, organization, and presentation of information about past events. History can also mean the period of time after writing was invented.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(11, 'Horror', 'Horror fiction is fiction in any medium intended to scare, unsettle, or horrify the audience. Historically, the cause of the \"horror\" experience has often been the intrusion of a supernatural element into everyday human experience.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(12, 'Humor and Comedy', '', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(13, 'Music', 'Books about music history, music genres and musicians.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(14, 'Mystery', 'The mystery genre is a type of fiction in which a detective, or other professional, solves a crime or series of crimes. It can take the form of a novel or short story.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(15, 'Nonfiction', 'Nonfiction is an account or representation of a subject which is presented as fact. This presentation may be accurate or not; that is, it can give either a true or a false account of the subject in question. ', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(16, 'Philosophy', 'Philosophy is the study of general problems concerning matters such as existence, knowledge, truth, beauty, justice, validity, mind, and language. ', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(17, 'Poetry', 'Poetry is a form of literary art in which language is used for its aesthetic and evocative qualities in addition to, or in lieu of, its apparent meaning.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(18, 'Psychology', 'Books that involve psychology; the study of mental processes and human behavior.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(19, 'Religion', 'Religion is a cultural system that establishes symbols that relate humanity to spirituality and moral values. Many religions have narratives, symbols, traditions and sacred histories that are intended to give meaning to life or to explain the origin of life or the universe.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(20, 'Romance', 'According to the Romance Writers of America, \"Two basic elements comprise every romance novel: a central love story and an emotionally-satisfying and optimistic ending.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(21, 'Science', 'Science (from the Latin scientia, meaning “knowledge”) is the effort to discover, and increase human understanding of how the physical world works.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(22, 'Self Help', 'Self-help, or self-improvement, is a self-guided improvement[1]—economically, intellectually, or emotionally—often with a substantial psychological basis.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(23, 'Suspense', 'Suspense is the element of both fiction and some nonfiction that makes the reader uncertain about the outcome.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(24, 'Spirituality', 'Spirituality may refer to almost any kind of meaningful activity, personal growth, or blissful experience.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(25, 'Sports', 'Sports : engagement in physical activity intended to create a benefit to the participant. Ranging from Amateur to Professional, from incompetent to proficient, for all levels of ability, all nations, all creeds, all genders. As James Joyce said \"I am, a stride at a time\"', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(26, 'Thriller', 'Thrillers are characterized by fast pacing, frequent action, and resourceful heroes who must thwart the plans of more-powerful and better-equipped villains.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(27, 'Travel', 'Travel is the movement of people or objects (such as airplanes, boats, trains and other conveyances) between relatively distant geographical locations.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(28, 'Economics', 'Economics is a social science concerned with the factors that determine the production, distribution, and consumption of goods and services.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0),
(29, 'Politics', 'Politics (from Greek πολιτικός, \"of, for, or relating to citizens\"), is a process by which groups of people make collective decisions.', '2021-02-16 05:50:14', '2021-02-16 05:50:14', 0);

-- --------------------------------------------------------

--
-- Table structure for table `homepage_settings`
--

CREATE TABLE `homepage_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `homepage_settings`
--

INSERT INTO `homepage_settings` (`id`, `key`, `value`, `display_name`, `created_at`, `updated_at`) VALUES
(1, 'facebook', 'https://www.facebook.com/infyom', 'Facebook link', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(2, 'github', 'https://github.com/InfyOmLabs', 'Github link', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(3, 'linkedin', 'https://in.linkedin.com/company/infyom-technologies', 'Linkedin link', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(4, 'twitter', 'infyom', 'Twitter link', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(5, 'contact_email', 'contact@infyom.in', 'Contact Email', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(6, 'contact_phone', '7096336561', 'Contact Phone', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(7, 'website', 'http://www.infyom.com', 'Website', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(8, 'company_description', 'Leading Laravel Development Company Of India.', 'Company Description', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(9, 'hero_image_title', 'Hero image title 1', 'Hero Image Title', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(10, 'hero_image_description', 'This is Hero image Description.', 'Hero Image Description', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(11, 'about_us_text', 'An About Us page helps your company make a good first impression, and is critical for building customer trust and loyalty.', 'About us Text', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(12, 'genres_text', 'Art', 'Genres Text', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(13, 'popular_books_text', 'Innovation ', 'Popular Books Text', '2021-02-16 05:50:15', '2021-02-16 05:50:15');

-- --------------------------------------------------------

--
-- Table structure for table `issued_books`
--

CREATE TABLE `issued_books` (
  `id` int(10) UNSIGNED NOT NULL,
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
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(10) UNSIGNED NOT NULL,
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
  `email_verified_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `member_id`, `first_name`, `last_name`, `email`, `password`, `membership_plan_id`, `phone`, `image`, `is_active`, `activation_code`, `created_at`, `updated_at`, `email_verified_at`) VALUES
(1, '602baa6f945a0', 'LMS', 'Member', 'member@lms.com', '$2y$10$G3GwIOIrfOHCjEiNr9x8v.yYtcdnw8ysHpoMWBwDtfRY4ZX.dKjyy', 1, NULL, NULL, 1, NULL, '2021-02-16 05:50:15', '2021-02-16 05:50:15', '2021-02-16 11:20:15');

-- --------------------------------------------------------

--
-- Table structure for table `membership_plans`
--

CREATE TABLE `membership_plans` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double(8,2) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `frequency` int(11) NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_plan_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `membership_plans`
--

INSERT INTO `membership_plans` (`id`, `name`, `price`, `description`, `frequency`, `slug`, `stripe_plan_id`, `created_at`, `updated_at`) VALUES
(1, 'Silver', 300.00, 'Borrow 2 books at a time.', 1, 'silver', NULL, '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(2, 'Golden', 400.00, 'Borrow 4 books at a time.', 1, 'golden', NULL, '2021-02-16 05:50:15', '2021-02-16 05:50:15');

-- --------------------------------------------------------

--
-- Table structure for table `member_settings`
--

CREATE TABLE `member_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `default_value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `member_settings`
--

INSERT INTO `member_settings` (`id`, `key`, `default_value`, `display_name`, `created_at`, `updated_at`) VALUES
(1, 'current_language', 'en', 'Current Language', '2021-02-16 05:50:15', '2021-02-16 05:50:15');

-- --------------------------------------------------------

--
-- Table structure for table `member_settings_values`
--

CREATE TABLE `member_settings_values` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `member_id` int(10) UNSIGNED NOT NULL,
  `setting_id` bigint(20) UNSIGNED NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_06_17_111046_create_genres_table', 1),
(4, '2019_06_18_041744_create_authors_table', 1),
(5, '2019_06_19_051749_create_publishers_table', 1),
(6, '2019_06_19_060058_create_tags_table', 1),
(7, '2019_06_19_094902_create_book_languages_table', 1),
(8, '2019_06_19_120625_create_books_table', 1),
(9, '2019_06_19_130589_create_countries_table', 1),
(10, '2019_06_20_073240_create_addresses_table', 1),
(11, '2019_06_24_045413_create_book_tags_table', 1),
(12, '2019_06_24_050246_create_book_genres_table', 1),
(13, '2019_06_24_094343_create_book_items_table', 1),
(14, '2019_06_24_104225_create_membership_plans_table', 1),
(15, '2019_06_24_115700_create_members_table', 1),
(16, '2019_06_25_052422_create_issued_books_table', 1),
(17, '2019_06_25_103633_create_book_series_table', 1),
(18, '2019_06_25_110455_create_series_books_table', 1),
(19, '2019_07_11_052338_create_book_authors_table', 1),
(20, '2019_07_12_122450_create_settings_table', 1),
(21, '2019_09_11_115425_create_permission_tables', 1),
(22, '2019_10_21_112403_create_book_requests_table', 1),
(23, '2019_10_23_070035_create_homepage_settings_table', 1),
(24, '2019_11_29_044349_add_email_verified_at_column_into_members_table', 1),
(25, '2019_11_29_070906_make_existing_users_and_member_email_verified', 1),
(26, '2019_12_06_114550_create_testimonials_table', 1),
(27, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(28, '2020_01_07_052507_make_book_item_price_nullable', 1),
(29, '2020_02_04_070051_create_member_settings_table', 1),
(30, '2020_02_04_071801_create_member_setting_values_table', 1),
(31, '2020_02_10_095747_create_penalties_table', 1),
(32, '2020_03_03_092343_add_deleted_at_column_into_issued_books_table', 1),
(33, '2020_07_10_061355_create_add_filename_to_book_items_table', 1),
(34, '2020_09_16_043210_add_show_on_landing_page_to_genres_table', 1),
(35, '2020_09_16_063553_create_about_us_cards_table', 1),
(36, '2021_02_13_061139_remove_penalties_where_book_item_id_and_collected_by_null', 1),
(37, '2021_02_15_093832_remove_penalties_where_member_id_null', 1);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` int(10) UNSIGNED NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` int(10) UNSIGNED NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
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

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penalties`
--

CREATE TABLE `penalties` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `member_id` int(10) UNSIGNED DEFAULT NULL,
  `book_item_id` int(10) UNSIGNED DEFAULT NULL,
  `issued_book_id` int(10) UNSIGNED DEFAULT NULL,
  `actual_penalty` double NOT NULL,
  `collected_penalty` double NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `collected_at` datetime NOT NULL,
  `collected_by` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'manage_books', 'web', 'Can Manage Books', 'Create/Update/Delete Books, Book Series, Book Languages, Authors, Publishers, Tags', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(2, 'issue_books', 'web', 'Can Manage Issue Books', 'Can Manage Issue Books', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(3, 'manage_members', 'web', 'Can Manage Members', 'Create/Update/Delete Members', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(4, 'manage_finance', 'web', 'Can Manage Finance', 'Manage Membership Plans, Payments', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(5, 'manage_settings', 'web', 'Can Manage Settings', 'Manage Settings', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(6, 'manage_roles', 'web', 'Can Manage Roles', 'Manage Roles', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(7, 'manage_authors', 'web', 'Can Manage Authors', 'Manage Authors', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(8, 'manage_publishers', 'web', 'Can Manage Publishers', 'Manage Publishers', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(9, 'manage_book_series', 'web', 'Can Manage Book Series', 'Manage Book Series', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(10, 'manage_users', 'web', 'Can Manage Users', 'Manage Users', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(11, 'manage_book_languages', 'web', 'Can Manage Book Languages', 'Manage Book Languages', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(12, 'manage_plans', 'web', 'Can Manage Plans', 'Manage Plans', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(13, 'manage_tags', 'web', 'Can Manage Tags', 'Manage Tags', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(14, 'manage_genres', 'web', 'Can Manage Genres', 'Manage Genres', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(15, 'manage_book_requests', 'web', 'Can Manage Book Requests', 'Manage Book Requests', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(16, 'manage_penalties', 'web', 'Can Manage Penalties', 'Manage Penalties', '2021-02-16 05:50:14', '2021-02-16 05:50:14');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `publishers`
--

CREATE TABLE `publishers` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `publishers`
--

INSERT INTO `publishers` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Penguin Random House', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(2, 'McGraw-Hill Education', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(3, 'HarperCollins', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(4, 'Egmont Books', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(5, 'Shueisha', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(6, 'Kodansha', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(7, 'Pearson Education', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(8, 'Egmont Group', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(9, 'Klett', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(10, 'Jaico Publishing House', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(11, 'Westland Publications', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(12, 'Hachette Livre', '2021-02-16 05:50:15', '2021-02-16 05:50:15');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `display_name`, `description`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'Library Admin', 'Library Admin', 'web', '2021-02-16 05:50:14', '2021-02-16 05:50:14'),
(2, 'librarian', 'Librarian', 'Librarian', 'web', '2021-02-16 05:50:14', '2021-02-16 05:50:14');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
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
(16, 1),
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
(15, 2),
(16, 2);

-- --------------------------------------------------------

--
-- Table structure for table `series_books`
--

CREATE TABLE `series_books` (
  `id` int(10) UNSIGNED NOT NULL,
  `series_id` int(10) UNSIGNED NOT NULL,
  `book_id` int(10) UNSIGNED NOT NULL,
  `sequence` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `display_name`, `created_at`, `updated_at`) VALUES
(1, 'currency', 'INR', 'Indian Rupee', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(2, 'return_due_days', '15', 'Return Due Days', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(3, 'reserve_due_days', '5', 'Reserve Due Days', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(4, 'library_name', 'My Library', 'My Library', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(5, 'library_logo', 'logo-blue-black.png', 'Library Logo', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(6, 'language', 'en', 'English', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(7, 'favicon_icon', 'favicon.ico', 'Icon', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(8, 'reserve_books_limit', '5', 'Maximum reserve books limit', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(9, 'issue_books_limit', '5', 'Maximum issue books limit', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(10, 'penalty_per_day', '10', 'Penalty amount per day', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(11, 'book_due_reminder_before_days', '2', 'Book Due Reminder Before Days', '2021-02-16 05:50:15', '2021-02-16 05:50:15');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Family', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(2, 'Animal', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(3, 'Fiction', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(4, 'Science', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(5, 'History', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(6, 'Biopic', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(7, 'Art', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(8, 'Horror', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(9, 'Comedy', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(10, 'Nature', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(11, 'Popular', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(12, 'Sports', '2021-02-16 05:50:15', '2021-02-16 05:50:15'),
(13, 'Entertainment', '2021-02-16 05:50:15', '2021-02-16 05:50:15');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `occupation` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
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
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `email_verified_at`, `password`, `phone`, `image`, `is_active`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'LMS', 'Admin', 'admin@lms.com', '2021-02-16 05:50:15', '$2y$10$t/PS9Zs5NCXt4F5gK2cqhuEzWcvdVefWYCAXRHa2s0Zma6QZZT8Oy', NULL, NULL, 1, NULL, '2021-02-16 05:50:15', '2021-02-16 05:50:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_us_cards`
--
ALTER TABLE `about_us_cards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addresses_country_id_foreign` (`country_id`);

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `book_authors`
--
ALTER TABLE `book_authors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_authors_book_id_foreign` (`book_id`),
  ADD KEY `book_authors_author_id_foreign` (`author_id`);

--
-- Indexes for table `book_genres`
--
ALTER TABLE `book_genres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_genres_book_id_foreign` (`book_id`),
  ADD KEY `book_genres_genre_id_foreign` (`genre_id`);

--
-- Indexes for table `book_items`
--
ALTER TABLE `book_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `book_items_book_code_unique` (`book_code`),
  ADD KEY `book_items_publisher_id_foreign` (`publisher_id`),
  ADD KEY `book_items_language_id_foreign` (`language_id`);

--
-- Indexes for table `book_languages`
--
ALTER TABLE `book_languages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `book_languages_language_name_unique` (`language_name`);

--
-- Indexes for table `book_requests`
--
ALTER TABLE `book_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `book_series`
--
ALTER TABLE `book_series`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `book_series_title_unique` (`title`);

--
-- Indexes for table `book_tags`
--
ALTER TABLE `book_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_tags_book_id_foreign` (`book_id`),
  ADD KEY `book_tags_tag_id_foreign` (`tag_id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `countries_name_unique` (`name`),
  ADD UNIQUE KEY `countries_code_unique` (`code`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homepage_settings`
--
ALTER TABLE `homepage_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `issued_books`
--
ALTER TABLE `issued_books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issued_books_book_item_id_foreign` (`book_item_id`),
  ADD KEY `issued_books_member_id_foreign` (`member_id`),
  ADD KEY `issued_books_issuer_id_foreign` (`issuer_id`),
  ADD KEY `issued_books_returner_id_foreign` (`returner_id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `members_member_id_unique` (`member_id`),
  ADD UNIQUE KEY `members_email_unique` (`email`);

--
-- Indexes for table `membership_plans`
--
ALTER TABLE `membership_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member_settings`
--
ALTER TABLE `member_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member_settings_values`
--
ALTER TABLE `member_settings_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_settings_values_member_id_foreign` (`member_id`),
  ADD KEY `member_settings_values_setting_id_foreign` (`setting_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `penalties`
--
ALTER TABLE `penalties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `penalties_issued_book_id_foreign` (`issued_book_id`),
  ADD KEY `penalties_book_item_id_foreign` (`book_item_id`),
  ADD KEY `penalties_collected_by_foreign` (`collected_by`),
  ADD KEY `penalties_member_id_foreign` (`member_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_unique` (`name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `publishers`
--
ALTER TABLE `publishers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `series_books`
--
ALTER TABLE `series_books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `series_books_series_id_foreign` (`series_id`),
  ADD KEY `series_books_book_id_foreign` (`book_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_us_cards`
--
ALTER TABLE `about_us_cards`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `book_authors`
--
ALTER TABLE `book_authors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `book_genres`
--
ALTER TABLE `book_genres`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `book_items`
--
ALTER TABLE `book_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `book_languages`
--
ALTER TABLE `book_languages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `book_requests`
--
ALTER TABLE `book_requests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `book_series`
--
ALTER TABLE `book_series`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `book_tags`
--
ALTER TABLE `book_tags`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=247;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `homepage_settings`
--
ALTER TABLE `homepage_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `issued_books`
--
ALTER TABLE `issued_books`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `membership_plans`
--
ALTER TABLE `membership_plans`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `member_settings`
--
ALTER TABLE `member_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `member_settings_values`
--
ALTER TABLE `member_settings_values`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `penalties`
--
ALTER TABLE `penalties`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `publishers`
--
ALTER TABLE `publishers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `series_books`
--
ALTER TABLE `series_books`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
-- Constraints for table `member_settings_values`
--
ALTER TABLE `member_settings_values`
  ADD CONSTRAINT `member_settings_values_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `member_settings_values_setting_id_foreign` FOREIGN KEY (`setting_id`) REFERENCES `member_settings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `penalties`
--
ALTER TABLE `penalties`
  ADD CONSTRAINT `penalties_book_item_id_foreign` FOREIGN KEY (`book_item_id`) REFERENCES `book_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `penalties_collected_by_foreign` FOREIGN KEY (`collected_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `penalties_issued_book_id_foreign` FOREIGN KEY (`issued_book_id`) REFERENCES `issued_books` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `penalties_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
