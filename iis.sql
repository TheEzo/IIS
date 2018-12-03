-- --------------------------------------------------------
-- Hostitel:                     127.0.0.1
-- Verze serveru:                10.1.25-MariaDB - mariadb.org binary distribution
-- OS serveru:                   Win32
-- HeidiSQL Verze:               9.5.0.5357
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Exportování struktury databáze pro
CREATE DATABASE IF NOT EXISTS `iis` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_czech_ci */;
USE `iis`;

-- Exportování struktury pro tabulka iis.alembic_version
CREATE TABLE IF NOT EXISTS `alembic_version` (
  `version_num` varchar(32) COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Export dat nebyl vybrán.
-- Exportování struktury pro tabulka iis.doplnek
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
  `obrazek` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `barva` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Export dat nebyl vybrán.
-- Exportování struktury pro tabulka iis.doplnek_vypujcka
CREATE TABLE IF NOT EXISTS `doplnek_vypujcka` (
  `doplnek_id` int(11) NOT NULL,
  `vypujcka_id` int(11) NOT NULL,
  `pocet` int(11) DEFAULT NULL,
  PRIMARY KEY (`doplnek_id`,`vypujcka_id`),
  KEY `vypujcka_id` (`vypujcka_id`),
  CONSTRAINT `doplnek_vypujcka_ibfk_1` FOREIGN KEY (`doplnek_id`) REFERENCES `doplnek` (`id`) ON DELETE CASCADE,
  CONSTRAINT `doplnek_vypujcka_ibfk_2` FOREIGN KEY (`vypujcka_id`) REFERENCES `vypujcka` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Export dat nebyl vybrán.
-- Exportování struktury pro tabulka iis.klient
CREATE TABLE IF NOT EXISTS `klient` (
  `clenstvi` enum('zlate','stribrne','bronzove') COLLATE utf8_czech_ci DEFAULT NULL,
  `osoba_rc` varchar(10) COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`osoba_rc`),
  CONSTRAINT `klient_ibfk_1` FOREIGN KEY (`osoba_rc`) REFERENCES `osoba` (`rc`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Export dat nebyl vybrán.
-- Exportování struktury pro tabulka iis.kostym
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
  `obrazek` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `barva` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Export dat nebyl vybrán.
-- Exportování struktury pro tabulka iis.kostym_vyuziti
CREATE TABLE IF NOT EXISTS `kostym_vyuziti` (
  `kostym_id` int(11) NOT NULL,
  `vyuziti_id` int(11) NOT NULL,
  PRIMARY KEY (`kostym_id`,`vyuziti_id`),
  KEY `vyuziti_id` (`vyuziti_id`),
  CONSTRAINT `kostym_vyuziti_ibfk_1` FOREIGN KEY (`kostym_id`) REFERENCES `kostym` (`id`) ON DELETE CASCADE,
  CONSTRAINT `kostym_vyuziti_ibfk_2` FOREIGN KEY (`vyuziti_id`) REFERENCES `vyuziti` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Export dat nebyl vybrán.
-- Exportování struktury pro tabulka iis.osoba
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

-- Export dat nebyl vybrán.
-- Exportování struktury pro tabulka iis.vypujcka
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Export dat nebyl vybrán.
-- Exportování struktury pro tabulka iis.vypujcka_kostym
CREATE TABLE IF NOT EXISTS `vypujcka_kostym` (
  `vypujcka_id` int(11) NOT NULL,
  `kostym_id` int(11) NOT NULL,
  `pocet` int(11) DEFAULT NULL,
  PRIMARY KEY (`vypujcka_id`,`kostym_id`),
  KEY `kostym_id` (`kostym_id`),
  CONSTRAINT `vypujcka_kostym_ibfk_1` FOREIGN KEY (`kostym_id`) REFERENCES `kostym` (`id`) ON DELETE CASCADE,
  CONSTRAINT `vypujcka_kostym_ibfk_2` FOREIGN KEY (`vypujcka_id`) REFERENCES `vypujcka` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Export dat nebyl vybrán.
-- Exportování struktury pro tabulka iis.vyuziti
CREATE TABLE IF NOT EXISTS `vyuziti` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `druh_akce` varchar(128) COLLATE utf8_czech_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Export dat nebyl vybrán.
-- Exportování struktury pro tabulka iis.zamestnanec
CREATE TABLE IF NOT EXISTS `zamestnanec` (
  `pozice` enum('zamestnanec','vedouci') COLLATE utf8_czech_ci DEFAULT NULL,
  `osoba_rc` varchar(10) COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`osoba_rc`),
  CONSTRAINT `zamestnanec_ibfk_1` FOREIGN KEY (`osoba_rc`) REFERENCES `osoba` (`rc`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Export dat nebyl vybrán.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
