-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-10-2023 a las 07:17:19
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `municipalidadbd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `id_articulo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `codigo` varchar(255) COLLATE utf8mb4_general_nopad_ci NOT NULL,
  `nombre_articulo` varchar(255) COLLATE utf8mb4_general_nopad_ci NOT NULL,
  `no_serie` varchar(255) COLLATE utf8mb4_general_nopad_ci NOT NULL,
  `valor_unitario` decimal(10,0) NOT NULL,
  `valor_total` decimal(10,0) NOT NULL,
  `valor_baja` decimal(10,0) NOT NULL,
  `observaciones` varchar(255) COLLATE utf8mb4_general_nopad_ci NOT NULL,
  `qr` varchar(50) COLLATE utf8mb4_general_nopad_ci NOT NULL,
  `cantidad` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_nopad_ci;

--
-- Disparadores `articulos`
--
DELIMITER $$
CREATE TRIGGER `after_insert_articulos` AFTER INSERT ON `articulos` FOR EACH ROW BEGIN
    INSERT INTO historial (id_articulo, fecha, observaciones, id_usuario, codigo, nombre_articulo, no_serie, valor_unitario, valor_total, valor_baja, qr, cantidad)
    VALUES (NEW.id_articulo, NOW(), NEW.observaciones, NEW.id_usuario, NEW.codigo, NEW.nombre_articulo, NEW.no_serie, NEW.valor_unitario, NEW.valor_total, NEW.valor_baja, NEW.qr, NEW.cantidad);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_articulos` AFTER UPDATE ON `articulos` FOR EACH ROW BEGIN
    INSERT INTO historial (id_articulo, fecha, observaciones, id_usuario, codigo, nombre_articulo, no_serie, valor_unitario, valor_total, valor_baja, qr, cantidad)
    VALUES (NEW.id_articulo, NOW(), NEW.observaciones, NEW.id_usuario, NEW.codigo, NEW.nombre_articulo, NEW.no_serie, NEW.valor_unitario, NEW.valor_total, NEW.valor_baja, NEW.qr, NEW.cantidad);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargo`
--

CREATE TABLE `cargo` (
  `id_cargo` int(11) NOT NULL,
  `nombre_cargo` varchar(255) COLLATE utf8mb4_general_nopad_ci NOT NULL,
  `id_dependencia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_nopad_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dependencia`
--

CREATE TABLE `dependencia` (
  `id_dependencia` int(11) NOT NULL,
  `nombre_dependencia` varchar(255) COLLATE utf8mb4_general_nopad_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_nopad_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id_historial` int(11) NOT NULL,
  `id_articulo` int(11) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `codigo` varchar(255) COLLATE utf8mb4_general_nopad_ci NOT NULL,
  `nombre_articulo` varchar(255) COLLATE utf8mb4_general_nopad_ci NOT NULL,
  `no_serie` varchar(255) COLLATE utf8mb4_general_nopad_ci NOT NULL,
  `cantidad` decimal(10,2) NOT NULL,
  `valor_unitario` decimal(10,2) NOT NULL,
  `valor_total` decimal(10,2) NOT NULL,
  `valor_baja` decimal(10,2) NOT NULL,
  `observaciones` varchar(50) COLLATE utf8mb4_general_nopad_ci NOT NULL,
  `qr` varchar(50) COLLATE utf8mb4_general_nopad_ci NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_nopad_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `tipo_rol` varchar(255) COLLATE utf8mb4_general_nopad_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_nopad_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(255) COLLATE utf8mb4_general_nopad_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_general_nopad_ci NOT NULL,
  `apellido` varchar(255) COLLATE utf8mb4_general_nopad_ci NOT NULL,
  `contrasena` varchar(255) COLLATE utf8mb4_general_nopad_ci NOT NULL,
  `codigo` varchar(255) COLLATE utf8mb4_general_nopad_ci DEFAULT NULL,
  `id_rol` int(11) DEFAULT NULL,
  `id_cargo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_nopad_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`id_articulo`),
  ADD KEY `Id_usuario` (`id_usuario`);

--
-- Indices de la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`id_cargo`),
  ADD KEY `cargo_ibfk_1` (`id_dependencia`);

--
-- Indices de la tabla `dependencia`
--
ALTER TABLE `dependencia`
  ADD PRIMARY KEY (`id_dependencia`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `Id_articulo` (`id_articulo`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  ADD KEY `Id_rol` (`id_rol`),
  ADD KEY `Id_cargo` (`id_cargo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `id_articulo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
  MODIFY `id_cargo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `dependencia`
--
ALTER TABLE `dependencia`
  MODIFY `id_dependencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD CONSTRAINT `articulos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD CONSTRAINT `cargo_ibfk_1` FOREIGN KEY (`id_dependencia`) REFERENCES `dependencia` (`id_dependencia`);

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`id_articulo`) REFERENCES `articulos` (`id_articulo`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`id_cargo`) REFERENCES `cargo` (`id_cargo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
