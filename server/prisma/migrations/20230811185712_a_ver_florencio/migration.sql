/*
  Warnings:

  - Added the required column `Identificacion` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `Identificacion` VARCHAR(191) NOT NULL,
    ADD COLUMN `NombreVendedor` VARCHAR(191) NULL;
