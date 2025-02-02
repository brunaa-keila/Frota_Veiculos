CREATE DATABASE frota_veiculos;

USE frota_veiculos;

CREATE TABLE veiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    fabricante VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    preco DOUBLE NOT NULL,
    tipo ENUM('carro', 'moto') NOT NULL,
    quantidadePortas INT DEFAULT NULL,
    tipoCombustivel ENUM('gasolina', 'etanol', 'diesel', 'flex') DEFAULT NULL,
    cilindrada INT DEFAULT NULL
);

INSERT INTO veiculos (modelo, fabricante, ano, preco, tipo, quantidadePortas, tipoCombustivel, cilindrada) VALUES
('Fusca', 'Volkswagen', 1970, 15000.00, 'carro', 4, 'gasolina', NULL),
('Hornet', 'Honda', 2015, 30000.00, 'moto', NULL, NULL, 600),
('Civic', 'Honda', 2020, 80000.00, 'carro', 4, 'flex', NULL),
('XJ6', 'Yamaha', 2018, 45000.00, 'moto', NULL, NULL, 600);
