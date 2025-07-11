--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `population` int DEFAULT NULL,
  `surface` int DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `is_coastal` tinyint(1) DEFAULT NULL,
  `country_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_city_country_idx` (`country_id`),
  CONSTRAINT `fk_city_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*!40101 SET character_set_client = @saved_cs_client */;


-- Dumping routines for ABM city and advanced queries

DELIMITER $$

CREATE PROCEDURE `city_create` (
    IN p_name VARCHAR(100),
    IN p_population INT,
    IN p_surface INT,
    IN p_postal_code VARCHAR(20),
    IN p_is_coastal BOOLEAN,
    IN p_country_id INT
)
BEGIN
    INSERT INTO city (name, population, surface, postal_code, is_coastal, country_id)
    VALUES (p_name, p_population, p_surface, p_postal_code, p_is_coastal, p_country_id);
END$$

CREATE PROCEDURE `city_update` (
    IN p_id INT,
    IN p_name VARCHAR(100),
    IN p_population INT,
    IN p_surface INT,
    IN p_postal_code VARCHAR(20),
    IN p_is_coastal BOOLEAN,
    IN p_country_id INT
)
BEGIN
    UPDATE city
    SET name = p_name,
        population = p_population,
        surface = p_surface,
        postal_code = p_postal_code,
        is_coastal = p_is_coastal,
        country_id = p_country_id
    WHERE id = p_id;
END$$

CREATE PROCEDURE `city_delete` (
    IN p_id INT
)
BEGIN
    DELETE FROM city WHERE id = p_id;
END$$


-- Procedimiento: país con ciudad más poblada
CREATE PROCEDURE `get_country_with_most_populated_city` ()
BEGIN
    SELECT c.name AS country_name
    FROM country c
    JOIN city ci ON c.id = ci.country_id
    ORDER BY ci.population DESC
    LIMIT 1;
END$$

-- Procedimiento: países con ciudades costeras de +1M habitantes
CREATE PROCEDURE `get_countries_with_large_coastal_cities` ()
BEGIN
    SELECT DISTINCT c.name AS country_name
    FROM country c
    JOIN city ci ON c.id = ci.country_id
    WHERE ci.is_coastal = TRUE AND ci.population > 1000000;
END$$

-- Procedimiento: país y ciudad con mayor densidad poblacional
CREATE PROCEDURE `get_city_with_highest_density` ()
BEGIN
    SELECT c.name AS country_name, ci.name AS city_name,
           (ci.population / ci.surface) AS density
    FROM country c
    JOIN city ci ON c.id = ci.country_id
    WHERE ci.surface > 0
    ORDER BY density DESC
    LIMIT 1;
END$$

DELIMITER ;

-- Prueba: insertar una ciudad
-- CALL city_create('Lima', 10000000, 2672, '15001', TRUE, 6);
-- CALL get_country_with_most_populated_city();
-- CALL get_countries_with_large_coastal_cities();
-- CALL get_city_with_highest_density();
