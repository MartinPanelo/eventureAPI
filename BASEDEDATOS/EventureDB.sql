-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 02-12-2024 a las 03:16:23
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `EventureDB`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Fecha` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Ubicacion` varchar(255) NOT NULL,
  `Descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`Id`, `Nombre`, `Fecha`, `Ubicacion`, `Descripcion`) VALUES
(1, 'Torneo de Lol', '2024-12-20 14:00:00', 'Centro de Convenciones', 'Evento sobre las últimas tecnologías'),
(2, 'Feria de Emprendimiento', '2024-12-05 18:00:00', 'Plaza Mayor', 'Exposición de startups y proyectos'),
(3, 'Taller de Programación', '2024-10-10 14:00:00', 'Laboratorio', 'Curso intensivo de programación'),
(4, 'Concierto de Rock', '2024-12-15 18:30:00', 'Estadio Municipal', 'Presentación de bandas de rock'),
(5, 'Maratón Anual', '2024-12-20 07:00:00', 'Parque Central', 'Carrera para recaudar fondos'),
(6, 'Exposición de Arte', '2024-12-22 11:00:00', 'Galería Nacional', 'Muestra de artistas locales'),
(7, 'Feria de Ciencias', '2025-01-10 08:00:00', 'Centro Cultural', 'Proyectos científicos escolares'),
(15, 'Conferencia de Tecnología', '2024-11-28 12:00:22', 'Centro de Convenciones', 'Star ward');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registros`
--

CREATE TABLE `registros` (
  `Id` int(11) NOT NULL,
  `UsuarioId` int(11) DEFAULT NULL,
  `EventoId` int(11) DEFAULT NULL,
  `Asistencia` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registros`
--

INSERT INTO `registros` (`Id`, `UsuarioId`, `EventoId`, `Asistencia`) VALUES
(1, 1, 1, 0),
(2, 2, 1, 0),
(3, 3, 2, 1),
(4, 4, 3, 0),
(5, 5, 4, 1),
(6, 1, 5, 0),
(7, 2, 6, 1),
(8, 3, 7, 0),
(9, 4, 7, 1),
(10, 5, 2, 0),
(25, 8, 3, 1),
(27, 8, 15, 0),
(38, 13, 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Correo` varchar(255) NOT NULL,
  `Rol` enum('organizador','cliente') NOT NULL,
  `Contrasena` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id`, `Nombre`, `Correo`, `Rol`, `Contrasena`) VALUES
(1, 'Admin', 'admin@admin.com', 'cliente', '123'),
(2, 'Ana Gómez', 'ana.gomez@example.com', 'cliente', 'password456'),
(3, 'Carlos López', 'carlos.lopez@example.com', 'organizador', 'password789'),
(4, 'María Torres', 'maria.torres@example.com', 'cliente', 'password321'),
(5, 'Luis Fernández', 'luis.fernandez@example.com', 'organizador', 'password654'),
(6, 'Martin', 'mar@mar.com', 'cliente', '$2b$10$vzd1m1XgmlWdw7jmDx7gSu5/5whQfEfRcTjApm.OLDNt9OBgwzrQq'),
(8, 'Martin', 'mart@mar.com', 'cliente', '$2b$10$rRlRIYCzMgPRwuM8MjmK3efq0oZShuiE.CDchmhTfSQcu5x1M48Ny'),
(9, 'wqwqwqwqw', 'qwqwqwmart@mar.com', 'cliente', '$2a$10$SdB1VKRSww7ZFQuthh6sVeCRbTPpFY9WNMD9gp6mxjsnuh4AQBz7S'),
(10, 'asd', 'mart@mar.coma', 'organizador', '$2a$10$jzZLnqjuGbDcF0d2nDhho.2JNe1bj3OGMUVwxgLB/BieNPcBjyfqK'),
(11, 'martin', 'mamart@mar.com', 'cliente', '$2a$10$ppiqhqGFUvXXimsvYU1EiOnuKpbVQbJvlSwrkYxOnMmp3H7CyZudy'),
(12, 'martin', 'rodrigo@mar.com', 'cliente', '$2a$10$efQoZG7f0AQ6SdICgxf4vunk.Cm/EqQey4jtYI6p5xUAZxu30cBWW'),
(13, 'rodrigo', 'rodrigo@rod.com', 'cliente', '$2a$10$Rdv2I0a/cI02jiAqhOv0o.5oXhxJ387729UB4l2CkX2nJrR3qrb0K'),
(14, 'rodrigo', 'rodirgo@rod.com', 'cliente', '$2a$10$1C1k2q6wbob.yQyTIH8vzuaz8fxSrJqHaqfb7Ie9itfNbZiLi3nRa'),
(15, 'Rodrigo', 'rodri@mar.com', 'cliente', '$2a$10$samnnDT8.zkxmBmmoXfsxu77e/4bIaiaAA6UAu/DChOYVdGZQCKLu'),
(16, 'rodri', 'rodri@ro.com', 'cliente', '$2a$10$hh967fXbsZkyAxDkCY8Ic.0JD5FcWyX0fV7OcAVPN54n56nBCWQxi');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `registros`
--
ALTER TABLE `registros`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UsuarioId` (`UsuarioId`),
  ADD KEY `EventoId` (`EventoId`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Correo` (`Correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `registros`
--
ALTER TABLE `registros`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `registros`
--
ALTER TABLE `registros`
  ADD CONSTRAINT `registros_ibfk_1` FOREIGN KEY (`UsuarioId`) REFERENCES `usuarios` (`Id`),
  ADD CONSTRAINT `registros_ibfk_2` FOREIGN KEY (`EventoId`) REFERENCES `eventos` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
