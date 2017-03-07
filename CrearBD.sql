/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  develop
 * Created: 24-feb-2017
 */

-- COMO ROOT PARA CREAR LA BBDD Y EL USUARIO

-- Mostrar los CHARSETs instalados:
SHOW CHARACTER SET;
-- Mostrar COLLATIONS instalados:
SHOW COLLATION;
-- CREAMOS LA BBDD PARA UTF-8 COLLATION EN ESPAÑOL
CREATE DATABASE libreria  
    CHARACTER SET utf8 COLLATE utf8_spanish_ci;

--drop database gestion_academica;

-- CREAMOS EL USUARIO 
--DROP USER damuser23;
--CREATE USER damuser23 IDENTIFIED BY 'damuser';

-- DAMOS PERMISOS EN LA BBDD PARA EL NUEVO USUARIO
--grant all privileges on gestion_academica.* to 'damuser23'@'%' identified by 'damuser';
--grant all privileges on gestion_academica.* to 'damuser23'@'localhost' identified by 'damuser';
--flush privileges;


-- COMO USUARIO PARA CREAR LAS TABLAS Y POBLAR DE DATOS

DROP TABLE IF EXISTS USUARIOS;
DROP TABLE IF EXISTS LIBROS;
DROP TABLE IF EXISTS RESERVAS;

CREATE TABLE USUARIO (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(25) NOT NULL ,
	apellido VARCHAR(50) NOT NULL ) ;

CREATE TABLE LIBRO (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(25) NOT NULL ,
	autor VARCHAR(50) NOT NULL ,
        isbn VARCHAR(25) NOT NULL);

CREATE TABLE RESERVA(
	LIBRO INT,
	USUARIO INT,
        NOMBRE_RESERVA VARCHAR(50) NOT NULL,
	PRIMARY KEY(LIBRO,USUARIO),
	FOREIGN KEY (USUARIO) REFERENCES USUARIO(id) ,
	FOREIGN KEY (LIBRO) REFERENCES LIBRO(id) );


INSERT INTO USUARIO VALUES (
	NULL,
	'PEPE',
	'PEREZ');
INSERT INTO LIBRO VALUES (
	NULL,
	'HARRY POTTER 1',
	'JK ROWLLING','9780747560722');
INSERT INTO RESERVA VALUES (
	1,
	1,
	'RESERVA1'
);

SELECT * FROM LIBRO;
SELECT * FROM USUARIO;
SELECT * FROM RESERVA;
-- INSERT INTO PROF_ASIG VALUES ();
-- INSERT INTO PROF_ASIG VALUES ();
