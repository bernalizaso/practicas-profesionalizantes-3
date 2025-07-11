/*!50003 DROP TABLE IF EXISTS `city` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
CREATE TABLE `city` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `population` INT,
  `surface` INT,
  `postal_code` VARCHAR(10),
  `coastal` BOOLEAN,
  `country_id` INT,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_city_country`
    FOREIGN KEY (`country_id`)
    REFERENCES `country` (`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!50003 SET character_set_client  = @saved_cs_client */ ;

-- ======================================================
-- Procedimientos almacenados para Ciudad (ABM)
-- ======================================================
DELIMITER ;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `city_create`(
    IN p_name VARCHAR(45),
    IN p_population INT,
    IN p_surface INT,
    IN p_postal_code VARCHAR(10),
    IN p_coastal BOOLEAN,
    IN p_country_id INT
)
BEGIN
    INSERT INTO city (name, population, surface, postal_code, coastal, country_id)
    VALUES (p_name, p_population, p_surface, p_postal_code, p_coastal, p_country_id);
END ;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `city_get`(IN p_id INT)
BEGIN
    SELECT * FROM city WHERE id = p_id;
END ;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `city_update`(
    IN p_id INT,
    IN p_name VARCHAR(45),
    IN p_population INT,
    IN p_surface INT,
    IN p_postal_code VARCHAR(10),
    IN p_coastal BOOLEAN,
    IN p_country_id INT
)
BEGIN
    UPDATE city
    SET name = p_name,
        population = p_population,
        surface = p_surface,
        postal_code = p_postal_code,
        coastal = p_coastal,
        country_id = p_country_id
    WHERE id = p_id;
END ;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `city_delete`(IN p_id INT)
BEGIN
    DELETE FROM city WHERE id = p_id;
END ;;

-- ======================================================
-- Procedimientos especiales
-- ======================================================
CREATE DEFINER=`root`@`localhost` PROCEDURE `most_populated_city_country`()
BEGIN
    SELECT c.name AS country_name
    FROM country c
    JOIN city ci ON ci.country_id = c.id
    ORDER BY ci.population DESC
    LIMIT 1;
END ;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `coastal_cities_over_million`()
BEGIN
    SELECT DISTINCT co.name AS country_name
    FROM city ci
    JOIN country co ON ci.country_id = co.id
    WHERE ci.coastal = TRUE AND ci.population > 1000000;
END ;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `highest_density_city_country`()
BEGIN
    SELECT co.name AS country_name, ci.name AS city_name, 
           (ci.population / ci.surface) AS density
    FROM city ci
    JOIN country co ON ci.country_id = co.id
    ORDER BY density DESC
    LIMIT 1;
END ;;

DELIMITER ;
