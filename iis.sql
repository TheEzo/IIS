/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE IF NOT EXISTS `iis` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_czech_ci */;
USE `iis`;

CREATE TABLE IF NOT EXISTS `alembic_version` (
  `version_num` varchar(32) COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

/*!40000 ALTER TABLE `alembic_version` DISABLE KEYS */;
REPLACE INTO `alembic_version` (`version_num`) VALUES
	('2e3e21eadeaa');
/*!40000 ALTER TABLE `alembic_version` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `barva` (
  `barva` varchar(20) COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`barva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

/*!40000 ALTER TABLE `barva` DISABLE KEYS */;
REPLACE INTO `barva` (`barva`) VALUES
	('černá'),
	('červená'),
	('zelená');
/*!40000 ALTER TABLE `barva` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `barva_kostym` (
  `kostym_id` int(11) NOT NULL,
  `barva` varchar(20) COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`kostym_id`,`barva`),
  KEY `barva` (`barva`),
  CONSTRAINT `barva_kostym_ibfk_1` FOREIGN KEY (`barva`) REFERENCES `barva` (`barva`) ON DELETE CASCADE,
  CONSTRAINT `barva_kostym_ibfk_2` FOREIGN KEY (`kostym_id`) REFERENCES `kostym` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

/*!40000 ALTER TABLE `barva_kostym` DISABLE KEYS */;
REPLACE INTO `barva_kostym` (`kostym_id`, `barva`) VALUES
	(42, 'zelená');
/*!40000 ALTER TABLE `barva_kostym` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `doplnek` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazev` varchar(128) COLLATE utf8_czech_ci NOT NULL,
  `popis_vyuziti` varchar(512) COLLATE utf8_czech_ci NOT NULL,
  `datum_vyroby` date DEFAULT NULL,
  `velikost` enum('S','M','L','XL','XXL','XXXL') COLLATE utf8_czech_ci DEFAULT NULL,
  `typ` varchar(45) COLLATE utf8_czech_ci DEFAULT NULL,
  `material` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  `pocet` int(11) DEFAULT NULL,
  `opotrebeni` enum('nove','stare','zanovni') COLLATE utf8_czech_ci DEFAULT NULL,
  `cena` int(11) NOT NULL,
  `vyrobce` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  `obrazek` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

/*!40000 ALTER TABLE `doplnek` DISABLE KEYS */;
REPLACE INTO `doplnek` (`id`, `nazev`, `popis_vyuziti`, `datum_vyroby`, `velikost`, `typ`, `material`, `pocet`, `opotrebeni`, `cena`, `vyrobce`, `obrazek`) VALUES
	(17, 'Klobouk', 'obyc klobouk..', '2018-12-12', 'S', 'Klobouk', 'Látka', 3, 'nove', 50, 'Klobouky s.r.o.', 'klobuk.jpg');
/*!40000 ALTER TABLE `doplnek` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `doplnek_barva` (
  `doplnek_id` int(11) NOT NULL,
  `barva` varchar(20) COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`doplnek_id`,`barva`),
  KEY `barva` (`barva`),
  CONSTRAINT `doplnek_barva_ibfk_1` FOREIGN KEY (`barva`) REFERENCES `barva` (`barva`) ON DELETE CASCADE,
  CONSTRAINT `doplnek_barva_ibfk_2` FOREIGN KEY (`doplnek_id`) REFERENCES `doplnek` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

/*!40000 ALTER TABLE `doplnek_barva` DISABLE KEYS */;
REPLACE INTO `doplnek_barva` (`doplnek_id`, `barva`) VALUES
	(17, 'červená');
/*!40000 ALTER TABLE `doplnek_barva` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `doplnek_vypujcka` (
  `doplnek_id` int(11) NOT NULL,
  `vypujcka_id` int(11) NOT NULL,
  PRIMARY KEY (`doplnek_id`,`vypujcka_id`),
  KEY `vypujcka_id` (`vypujcka_id`),
  CONSTRAINT `doplnek_vypujcka_ibfk_1` FOREIGN KEY (`doplnek_id`) REFERENCES `doplnek` (`id`) ON DELETE CASCADE,
  CONSTRAINT `doplnek_vypujcka_ibfk_2` FOREIGN KEY (`vypujcka_id`) REFERENCES `vypujcka` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

/*!40000 ALTER TABLE `doplnek_vypujcka` DISABLE KEYS */;
/*!40000 ALTER TABLE `doplnek_vypujcka` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `klient` (
  `clenstvi` enum('zlate','stribrne','bronzove') COLLATE utf8_czech_ci DEFAULT NULL,
  `osoba_rc` varchar(10) COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`osoba_rc`),
  CONSTRAINT `klient_ibfk_1` FOREIGN KEY (`osoba_rc`) REFERENCES `osoba` (`rc`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

/*!40000 ALTER TABLE `klient` DISABLE KEYS */;
REPLACE INTO `klient` (`clenstvi`, `osoba_rc`) VALUES
	('bronzove', '9609255832');
/*!40000 ALTER TABLE `klient` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `kostym` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vyrobce` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  `material` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  `popis` varchar(512) COLLATE utf8_czech_ci NOT NULL,
  `velikost` enum('S','M','L','XL','XXL','XXXL') COLLATE utf8_czech_ci DEFAULT NULL,
  `opotrebeni` enum('nove','stare','zanovni') COLLATE utf8_czech_ci DEFAULT NULL,
  `pocet` int(11) DEFAULT NULL,
  `datum_vyroby` date NOT NULL,
  `cena` int(11) NOT NULL,
  `nazev` varchar(128) COLLATE utf8_czech_ci NOT NULL,
  `obrazek` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

/*!40000 ALTER TABLE `kostym` DISABLE KEYS */;
REPLACE INTO `kostym` (`id`, `vyrobce`, `material`, `popis`, `velikost`, `opotrebeni`, `pocet`, `datum_vyroby`, `cena`, `nazev`, `obrazek`) VALUES
	(42, 'Uniformy s.r.o.', 'Bavlna', 'prostě uniforma', 'XL', 'zanovni', 2, '2018-07-09', 300, 'Uniforma', 'uniforma.jpg');
/*!40000 ALTER TABLE `kostym` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `kostym_vyuziti` (
  `kostym_id` int(11) NOT NULL,
  `vyuziti_id` int(11) NOT NULL,
  PRIMARY KEY (`kostym_id`,`vyuziti_id`),
  KEY `vyuziti_id` (`vyuziti_id`),
  CONSTRAINT `kostym_vyuziti_ibfk_1` FOREIGN KEY (`kostym_id`) REFERENCES `kostym` (`id`) ON DELETE CASCADE,
  CONSTRAINT `kostym_vyuziti_ibfk_2` FOREIGN KEY (`vyuziti_id`) REFERENCES `vyuziti` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

/*!40000 ALTER TABLE `kostym_vyuziti` DISABLE KEYS */;
REPLACE INTO `kostym_vyuziti` (`kostym_id`, `vyuziti_id`) VALUES
	(42, 5);
/*!40000 ALTER TABLE `kostym_vyuziti` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `osoba` (
  `rc` varchar(10) COLLATE utf8_czech_ci NOT NULL,
  `email` varchar(200) COLLATE utf8_czech_ci NOT NULL,
  `heslo` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `jmeno` varchar(128) COLLATE utf8_czech_ci NOT NULL,
  `prijmeni` varchar(128) COLLATE utf8_czech_ci NOT NULL,
  `ulice` varchar(256) COLLATE utf8_czech_ci DEFAULT NULL,
  `cislo_popisne` varchar(10) COLLATE utf8_czech_ci DEFAULT NULL,
  `tel_cislo` varchar(10) COLLATE utf8_czech_ci DEFAULT NULL,
  `obec` varchar(60) COLLATE utf8_czech_ci DEFAULT NULL,
  PRIMARY KEY (`rc`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

/*!40000 ALTER TABLE `osoba` DISABLE KEYS */;
REPLACE INTO `osoba` (`rc`, `email`, `heslo`, `jmeno`, `prijmeni`, `ulice`, `cislo_popisne`, `tel_cislo`, `obec`) VALUES
	('9609255832', 'willaschek.t@gmail.com', 'pbkdf2:sha256:50000$DkkDX79s$bc274096fc04ae040dde864198190ff014357c95399a25504f257afc88989baa', 'Tomáš', 'Willaschek', '', '', '', NULL);
/*!40000 ALTER TABLE `osoba` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `vypujcka` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazev_akce` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `datum_vypujceni` date NOT NULL,
  `vracen` int(11) NOT NULL,
  `klient` varchar(10) COLLATE utf8_czech_ci DEFAULT NULL,
  `zamestnanec` varchar(10) COLLATE utf8_czech_ci DEFAULT NULL,
  `datum_vraceni` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `klient` (`klient`),
  KEY `zamestnanec` (`zamestnanec`),
  CONSTRAINT `vypujcka_ibfk_1` FOREIGN KEY (`klient`) REFERENCES `osoba` (`rc`) ON DELETE CASCADE,
  CONSTRAINT `vypujcka_ibfk_2` FOREIGN KEY (`zamestnanec`) REFERENCES `osoba` (`rc`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

/*!40000 ALTER TABLE `vypujcka` DISABLE KEYS */;
/*!40000 ALTER TABLE `vypujcka` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `vypujcka_kostym` (
  `vypujcka_id` int(11) NOT NULL,
  `kostym_id` int(11) NOT NULL,
  PRIMARY KEY (`vypujcka_id`,`kostym_id`),
  KEY `kostym_id` (`kostym_id`),
  CONSTRAINT `vypujcka_kostym_ibfk_1` FOREIGN KEY (`kostym_id`) REFERENCES `kostym` (`id`) ON DELETE CASCADE,
  CONSTRAINT `vypujcka_kostym_ibfk_2` FOREIGN KEY (`vypujcka_id`) REFERENCES `vypujcka` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

/*!40000 ALTER TABLE `vypujcka_kostym` DISABLE KEYS */;
/*!40000 ALTER TABLE `vypujcka_kostym` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `vyuziti` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `druh_akce` varchar(128) COLLATE utf8_czech_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

/*!40000 ALTER TABLE `vyuziti` DISABLE KEYS */;
REPLACE INTO `vyuziti` (`id`, `druh_akce`) VALUES
	(5, 'Armádní akce');
/*!40000 ALTER TABLE `vyuziti` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `zamestnanec` (
  `pozice` enum('zamestnanec','vedouci') COLLATE utf8_czech_ci DEFAULT NULL,
  `osoba_rc` varchar(10) COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`osoba_rc`),
  CONSTRAINT `zamestnanec_ibfk_1` FOREIGN KEY (`osoba_rc`) REFERENCES `osoba` (`rc`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

/*!40000 ALTER TABLE `zamestnanec` DISABLE KEYS */;
REPLACE INTO `zamestnanec` (`pozice`, `osoba_rc`) VALUES
	('vedouci', '9609255832');
/*!40000 ALTER TABLE `zamestnanec` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
