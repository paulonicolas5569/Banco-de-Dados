CREATE DATABASE  IF NOT EXISTS `cadastro` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;
USE `cadastro`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cadastro
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alunos`
--

DROP TABLE IF EXISTS `alunos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) NOT NULL,
  `profissao` varchar(30) DEFAULT NULL,
  `nascimento` date DEFAULT NULL,
  `sexo` enum('M','F') DEFAULT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `altura` decimal(3,2) DEFAULT NULL,
  `nacionalidade` varchar(20) DEFAULT 'Brasil',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos`
--

LOCK TABLES `alunos` WRITE;
/*!40000 ALTER TABLE `alunos` DISABLE KEYS */;
INSERT INTO `alunos` VALUES (1,'Andres Cristian Yapiticona Flo','Engenheiro Civil','2004-05-09','',62.30,1.75,'Brasil'),(2,'Edinaldo Pereira de Barros','Administrador','1978-07-25','',85.00,1.90,'Brasil'),(3,'Érica da Silva Pires','Contadora','1993-10-25','F',67.00,1.75,'Espanha'),(4,'Erick Luan Ferreira','Astronauta','1999-11-02','M',79.90,1.69,'Brasil'),(5,'Gabriela Gomes Da Silva','Advogada','2003-12-12','F',48.00,1.62,'Italia'),(6,'Gabriel Rodrigues Dos Santos','Administrador','2002-07-20','M',100.00,1.85,'Portugal'),(7,'Gustavo Pinheiro Leite','Analista de Dados','2003-12-22','M',62.00,1.68,'Brasil'),(8,'Gustavo Teodoro Gabilan','Programador','2005-01-21','M',47.00,1.65,'Brasil'),(9,'Julia Picole Turubia','Veterinaria','2004-10-01','F',58.00,1.62,'Italia'),(10,'Luiz Henrique Da Silva Costa','Desenvolvedor FrontEnd','2005-04-18','M',97.00,1.78,'Brasil'),(11,'Millena Gutemberg Dos Santos S','Modelo','2003-05-22','F',62.50,1.65,'Brasil'),(12,'Paulo Nicolas dos Santos','Vendedor','2003-04-29','M',65.50,1.89,'Brasil'),(13,'Pedro Henrique','Programador','2002-05-25','M',70.00,1.79,'Espanha'),(14,'Ryan Gomes dos Santos','Uber','2005-09-09','M',62.00,1.82,'Portugal'),(15,'Vinicius de Souza Nascimento','Vendedor','1996-08-18','M',67.00,1.75,'Portugal'),(16,'Vitor Fialho Bergami','Lutador','1998-01-25','M',75.00,1.85,'Nova Zelândia'),(17,'Weslley Carlos Gonçalves da Si','Administrador','2005-06-04','M',75.00,1.80,'Canada'),(18,'Weslley Moreira Nascimento Da ','Analista de dados','2006-06-12','M',70.00,1.83,'Brasil'),(19,'Sirlene Sanches','Professor','1979-08-10','F',60.50,1.56,'Espanha'),(20,'José de Assis','Professor','1970-04-10','M',65.80,1.57,'Portugal'),(21,'Leandro Ramos','Professor','1979-04-02','M',95.80,1.85,'Canadá'),(22,'Robson Vaamonde','Professor','1979-07-02','M',78.90,1.72,'Itália');
/*!40000 ALTER TABLE `alunos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `idcurso` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `carga` int(10) unsigned DEFAULT NULL,
  `totalAulas` int(11) DEFAULT NULL,
  `ano` year(4) DEFAULT 2024,
  PRIMARY KEY (`idcurso`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES (1,'Algoriitimos','Lógica de programação. Você aprenderá sobre o desenvolvimento de soluções com aplicação da lógica de programação, que permite a criação de softwares amigáveis, seguros e funcionais',40,10,2024),(2,'Exel Essencl','Você aprenderá a criar planilhas e tabelas, fazer gráficos simples, além de salvar arquivos em nuvem e realizar cálculos usando fórmulas e funções de Excel básico.',2,10,2024),(3,'Excel Avançado I','Você aprofundará conhecimentos em funções do Excel avançado para otimizar cálculos e facilitar a construção de planilhas, banco de dados, relatórios e gráficos.',24,6,2024),(4,'Excel Avado II','Você saberá mais sobre ferramentas avançadas e em recursos de banco de dados no Excel para automatizar tarefas e aprimorar consultas, relatórios, gráficos e cálculos.',24,6,2024),(5,'Form Excel: do básico ao avançado','Você aprenderá a inserir informações em planilhas, usando recursos, funções e ferramentas avançadas do Excel 365 para criar gráficos, fazer cálculos e manipular dados.',72,1,2025),(6,'Desenvvidor Web Front-end 1','Você aprenderá a planejar e desenvolver sites responsivos com imagens.',60,15,2025),(7,'Desenvolvedor GeWeb Front-end 2: JavaScript','Você aprenderá como utilizar a codificação JavaScript para criar e usar recursos básicos de interatividade em um site.',40,12,2023),(8,'PHP com MySQL','Você aprenderá a desenvolver sistemas computacionais e websites com recursos da linguagem de programação PHP e do gerenciador de banco de dados MySQL.',40,12,2023),(9,'Lógica de Programação Direcionada a PHP','Você aprenderá a criar algoritmos e desenvolver aplicações e sistemas web com a linguagem de programação PHP.',40,12,2023),(10,'PHP','Você aprenderá a desenvolver sistemas computacionais e websites com recursos da linguagem de programação PHP.',24,6,2023),(11,'PHP4','Você aprenderá a desenvolver sistemas computacionais e websites com recursos da linguagem de programação PHP.',32,8,2025),(12,'Photoshop','Você aprenderá como tratar, manipular e editar imagens, utilizando filtros, cores, efeitos de camada e demais recursos do Adobe Photoshop.',36,9,2025),(13,'Photoshop para Mídias Sociais','Você aprenderá técnicas de criação, edição, composição e exportação de conteúdo gráfico para mídias sociais, utilizando recursos e ferramentas do Adobe Photoshop.',36,9,2025),(14,'Python','Você aprenderá a desenvolver programação web por meio da linguagem Python.',32,8,2025),(15,'Python I - fundamentos','Você aprenderá a desenvolver programação web por meio da linguagem Python, que possibilita a pesquisa e a extração de dados de páginas da internet.',44,11,2024),(16,'Python II - desenvolvendo aplicações web','Você aprenderá a desenvolver soluções para a web aplicando linguagem Python em framework de projetos de software e a manipular banco de dados.',60,15,2024),(17,'Introdução à Linguagem Java','Você aprenderá a programar aplicações básicas com a linguagem Java.',40,10,2023),(18,'Formação Front-end','Você aprenderá a planejar e produzir site com imagens, linguagem HTML5, CSS3 e Web Semântica usando codificação JavaScript.',108,27,2026),(19,'Desenvolvedor Web Back-end: NodeJs','Você aprenderá a configurar ambiente Node.js, desenvolvendo código JavaScript e executando no back-end. Também criará APTI Rest para acessar banco de dados e atender requisições HTTPs.',48,12,2026),(20,'POO','Curso de Programação Orientada ao Objeto',60,15,2022),(21,'C++','Curso de C++',40,10,2023),(22,'C#','Curso de C#',24,6,2023),(23,'PowerPoint','Curso completo de PowerPoint',24,6,2023),(24,'Word','Curso completo de Word',24,6,2023),(25,'Pacote Office','Curso de Word, PowerPoint e Excel',60,15,2024),(26,'Hardware','Curso de Montagem e Manutenção de Computadores',36,9,2021),(27,'Redes','Curso de Redes para Iniciantes',40,10,2021),(28,'Segurança da Informação','Curso de Segurança',16,4,2021);
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-08 19:35:38
