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
drop database `iis`;
CREATE DATABASE IF NOT EXISTS `iis` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_czech_ci */;
USE `iis`;

-- Exportování struktury pro tabulka iis.alembic_version
CREATE TABLE IF NOT EXISTS `alembic_version` (
  `version_num` varchar(32) COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Exportování dat pro tabulku iis.alembic_version: ~0 rows (přibližně)
DELETE FROM `alembic_version`;
/*!40000 ALTER TABLE `alembic_version` DISABLE KEYS */;
INSERT INTO `alembic_version` (`version_num`) VALUES
	('c7a78c49e5c0');
/*!40000 ALTER TABLE `alembic_version` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Exportování dat pro tabulku iis.doplnek: ~4 rows (přibližně)
DELETE FROM `doplnek`;
/*!40000 ALTER TABLE `doplnek` DISABLE KEYS */;
INSERT INTO `doplnek` (`id`, `nazev`, `popis_vyuziti`, `datum_vyroby`, `velikost`, `typ`, `material`, `pocet`, `opotrebeni`, `cena`, `vyrobce`, `obrazek`, `barva`) VALUES
(8, 'Červený baret Armády ČR', 'Replika červeného baretu Armády ČR užíván jednotkami parašutistů', '2001-10-20', 'S', 'Vojenský', 'Bavlna', 8, 'nove', 100, 'Army Costumes', 'baret_červeny.jpg', 'Červená'),
(9, 'Koruna', 'Doplněk imitující skutečnou korunu. Vhodné pro historické filmy či karnevaly.', '2003-07-20', 'L', 'Historický', 'Kov', 1, 'stare', 800, 'Jewels', 'koruna.jpg', 'Zlatá'),
(17, 'Klobouk', 'obyc klobouk..', '2018-12-12', 'S', 'Klobouk', 'Látka', 2, 'nove', 50, 'Klobouky s.r.o.', 'klobuk.jpg', 'Černá'),
(18, 'Kouzelnický klobouk', 'Kouzelnický klobouk k plášti', '2018-11-29', 'S', 'Klobouk', 'Látka', 3, 'nove', 50, 'kloboučníci', 'kol_klobouk.jpeg', 'černá'),
(22, 'Pirátská šavle', 'Šavle vhodná jako doplněk k pirátskému kostýmu', '2009-02-03', 'S', 'Zbraň', 'Plast', 2, 'stare', 25, 'Costumes s.r.o', 'šavle.jpg', 'Stříbrná'),
(23, 'Mikulášská hůl', 'Zlatá mikulášská hůl ke kostýmu MIkuláše', '2009-02-03', 'S', 'Hůl ke kostýmu', 'Plast', 1, 'stare', 25, 'TK', 'berla.jpg', 'Zlatá'),
(24, 'Čertovské rohy', 'Čertovské rohy jako doplněk k čertovskému obleku', '2018-12-01', 'S', 'Pokrývka hlavy', 'Plast', 4, 'nove', 15, 'TK', 'rohy.jpg', 'Hnědá');
/*!40000 ALTER TABLE `doplnek` ENABLE KEYS */;

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

-- Exportování dat pro tabulku iis.doplnek_vypujcka: ~2 rows (přibližně)
DELETE FROM `doplnek_vypujcka`;
/*!40000 ALTER TABLE `doplnek_vypujcka` DISABLE KEYS */;
INSERT INTO `doplnek_vypujcka` (`doplnek_id`, `vypujcka_id`, `pocet`) VALUES
(17, 3, 3),
(17, 4, 1),
(23, 9, 1),
(24, 9, 1);
/*!40000 ALTER TABLE `doplnek_vypujcka` ENABLE KEYS */;

-- Exportování struktury pro tabulka iis.klient
CREATE TABLE IF NOT EXISTS `klient` (
  `clenstvi` enum('zlate','stribrne','bronzove') COLLATE utf8_czech_ci DEFAULT NULL,
  `osoba_rc` varchar(10) COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`osoba_rc`),
  CONSTRAINT `klient_ibfk_1` FOREIGN KEY (`osoba_rc`) REFERENCES `osoba` (`rc`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Exportování dat pro tabulku iis.klient: ~0 rows (přibližně)
DELETE FROM `klient`;
/*!40000 ALTER TABLE `klient` DISABLE KEYS */;
INSERT INTO `klient` (`clenstvi`, `osoba_rc`) VALUES
('bronzove', '7551123656'),
('stribrne', '9602155648'),
('bronzove', '9609255832'),
('bronzove', '9610086548'),
('zlate', '9808123654');
/*!40000 ALTER TABLE `klient` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Exportování dat pro tabulku iis.kostym: ~6 rows (přibližně)
DELETE FROM `kostym`;
/*!40000 ALTER TABLE `kostym` DISABLE KEYS */;
INSERT INTO `kostym` (`id`, `vyrobce`, `material`, `popis`, `velikost`, `opotrebeni`, `pocet`, `datum_vyroby`, `cena`, `nazev`, `obrazek`, `barva`) VALUES
(31, 'Costumes s.r.o', 'polyester', 'Kostým klauna je vhodný pro děti či dospělé na karneval.', 'S', 'nove', 3, '2007-08-20', 350, 'Kostým Klaun', 'klaun.jpg', 'Žlutá, Zelená'),
(33, 'Army Costumes', 'polyester', 'Uniforma vojáka rudé armády z období 2. světové války, Vhodné pro vojenské přehlídky', 'L', 'nove', 5, '2003-09-20', 700, 'Vojenská uniforma vojáka SSSR', 'sssr_uniform.jpg', 'Hnědá'),
(43, 'Uniformy s.r.o.', 'Bavlna', 'Vojenská uniforma na slavnostní ceremoniály', 'XL', 'zanovni', 3, '2018-07-02', 300, 'Uniforma', 'uniforma.jpg', 'Zelená'),
(44, 'Hadry sro', 'Látka', 'nějaký ten plášť', 'S', 'nove', 2, '2018-12-02', 200, 'Kouzelnický plášť', 'magic_cloak.jpeg', 'černá'),
(46, 'Obleky sro', 'Bavlna', 'Oblek pro slavnostní příležitosti', 'XL', 'nove', 2, '2018-12-03', 2000, 'Oblek', 'oblek.jpg', 'Modrá'),
(47, 'TK', 'Polyester', 'Kostým vhodný na den sv.Mikuláše či karneval', 'L', 'stare', 1, '2009-02-03', 450, 'Kostým Mikuláše', 'mikulas.jpg', 'Červená'),
(48, 'Costumes s.r.o', 'Polyester', 'Kostým Piráta vhodný na karneval', 'M', 'zanovni', 3, '2018-01-01', 300, 'Kostým Piráta', 'pirat.jpg', 'Černo-Bílá'),
(49, 'TK', 'Polyester', 'Kostým Čerta vhodný na den sv. Mikuláše nebo Halloween', 'L', 'nove', 0, '2018-11-09', 550, 'Kostým Čert', 'čert.jpg', 'Červená');


-- Exportování struktury pro tabulka iis.kostym_vyuziti
CREATE TABLE IF NOT EXISTS `kostym_vyuziti` (
  `kostym_id` int(11) NOT NULL,
  `vyuziti_id` int(11) NOT NULL,
  PRIMARY KEY (`kostym_id`,`vyuziti_id`),
  KEY `vyuziti_id` (`vyuziti_id`),
  CONSTRAINT `kostym_vyuziti_ibfk_1` FOREIGN KEY (`kostym_id`) REFERENCES `kostym` (`id`) ON DELETE CASCADE,
  CONSTRAINT `kostym_vyuziti_ibfk_2` FOREIGN KEY (`vyuziti_id`) REFERENCES `vyuziti` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Exportování dat pro tabulku iis.kostym_vyuziti: ~5 rows (přibližně)
DELETE FROM `kostym_vyuziti`;
/*!40000 ALTER TABLE `kostym_vyuziti` DISABLE KEYS */;
INSERT INTO `kostym_vyuziti` (`kostym_id`, `vyuziti_id`) VALUES
(31, 3),
(44, 3),
(33, 5),
(43, 5),
(47, 6),
(49, 6),
(49, 7),
(44, 8),
(46, 8);

/*!40000 ALTER TABLE `kostym_vyuziti` ENABLE KEYS */;

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

-- Exportování dat pro tabulku iis.osoba: ~1 rows (přibližně)
DELETE FROM `osoba`;
/*!40000 ALTER TABLE `osoba` DISABLE KEYS */;
INSERT INTO `osoba` (`rc`, `email`, `heslo`, `jmeno`, `prijmeni`, `ulice`, `cislo_popisne`, `tel_cislo`, `obec`) VALUES
('7551123656', 'jana@seznam.cz', 'pbkdf2:sha256:50000$Q4Z3JwL8$d96595ca850c1713a0d42c19a4daa1c6020bb4b2f73a79afde90e0d32ee707e0', 'Jana', 'Modrá', '', '', '', NULL),
('9602155648', 'jan@seznam.cz', 'pbkdf2:sha256:50000$Wb2xPpOK$b21b4b2685035773e636d5fb35e0cb26655c85e025826392eaf5e82cf85cdcef', 'Jan', 'Novák', 'Česká', '22', '', NULL),
('9609255832', 'willaschek.t@gmail.com', 'pbkdf2:sha256:50000$DkkDX79s$bc274096fc04ae040dde864198190ff014357c95399a25504f257afc88989baa', 'Tomáš', 'Willaschek', 'Opavská', '94a', '601395550', 'Kravaře'),
('9610086548', 'domino.ruta@gmail.com', 'pbkdf2:sha256:50000$Gat2IuGy$eeb6fe35c089167977bf448266580f237948c7d0680935a4235d6a8954ea3cb4', 'Dominik', 'Ruta', 'Přemyslovců', '11', '123456789', 'Opava'),
('9808123654', 'admin@seznam.cz', 'pbkdf2:sha256:50000$nlRUeE16$640ba550c9fb3532980f59a3d160b3065d9451bae0135c83d2477e00aec974eb', 'Adam', 'Admin', '', '', '', NULL);

/*!40000 ALTER TABLE `osoba` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Exportování dat pro tabulku iis.vypujcka: ~5 rows (přibližně)
DELETE FROM `vypujcka`;
/*!40000 ALTER TABLE `vypujcka` DISABLE KEYS */;
INSERT INTO `vypujcka` (`id`, `nazev_akce`, `datum_vypujceni`, `vracen`, `klient`, `zamestnanec`, `datum_vraceni`) VALUES
(2, 'Mikulášský den', '2018-12-03', 0, '9609255832', '9610086548', '2018-12-12');
(3, 'Nějaká akce', '2018-12-02', 1, '9609255832', '9609255832', '2018-12-13'),
(4, 'test akce', '2018-12-02', 1, '9609255832', '9609255832', '2018-12-13'),
(6, 'test akce', '2018-12-03', 1, '9609255832', '9609255832', '2018-12-13'),
(7, 'akce', '2018-12-03', 1, '9609255832', '9609255832', '2018-12-13'),
(8, 'Nějaká akce', '2018-12-03', 1, '9609255832', '9609255832', '2018-12-13'),
(9, 'Mikulášský den', '2018-12-03', 0, '9610086548', '9610086548', '2018-12-12');
/*!40000 ALTER TABLE `vypujcka` ENABLE KEYS */;

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

-- Exportování dat pro tabulku iis.vypujcka_kostym: ~5 rows (přibližně)
DELETE FROM `vypujcka_kostym`;
/*!40000 ALTER TABLE `vypujcka_kostym` DISABLE KEYS */;
INSERT INTO `vypujcka_kostym` (`vypujcka_id`, `kostym_id`, `pocet`) VALUES
(3, 43, 1),
(6, 43, 1),
(6, 44, 1),
(7, 43, 2),
(8, 44, 2),
(9, 43, 1),
(9, 47, 1),
(9, 49, 1);
/*!40000 ALTER TABLE `vypujcka_kostym` ENABLE KEYS */;

-- Exportování struktury pro tabulka iis.vyuziti
CREATE TABLE IF NOT EXISTS `vyuziti` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `druh_akce` varchar(128) COLLATE utf8_czech_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Exportování dat pro tabulku iis.vyuziti: ~3 rows (přibližně)
DELETE FROM `vyuziti`;
/*!40000 ALTER TABLE `vyuziti` DISABLE KEYS */;
INSERT INTO `vyuziti` (`id`, `druh_akce`) VALUES
(3, 'Karneval'),
(5, 'Armádní akce'),
(6, 'Mikulášský den'),
(7, 'Halloween'),
(8, 'Sváteční akce');
/*!40000 ALTER TABLE `vyuziti` ENABLE KEYS */;

-- Exportování struktury pro tabulka iis.zamestnanec
CREATE TABLE IF NOT EXISTS `zamestnanec` (
  `pozice` enum('zamestnanec','vedouci') COLLATE utf8_czech_ci DEFAULT NULL,
  `osoba_rc` varchar(10) COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`osoba_rc`),
  CONSTRAINT `zamestnanec_ibfk_1` FOREIGN KEY (`osoba_rc`) REFERENCES `osoba` (`rc`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Exportování dat pro tabulku iis.zamestnanec: ~1 rows (přibližně)
DELETE FROM `zamestnanec`;
/*!40000 ALTER TABLE `zamestnanec` DISABLE KEYS */;
INSERT INTO `zamestnanec` (`pozice`, `osoba_rc`) VALUES
('zamestnanec', '7551123656'),
('vedouci', '9609255832'),
('vedouci', '9610086548'),
('vedouci', '9808123654');

/*!40000 ALTER TABLE `zamestnanec` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
