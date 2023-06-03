/*
  Warnings:

  - You are about to drop the column `TipoEstadoId` on the `compra` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `direccion` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `metodopago` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `tipoestado` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[Email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UsuarioId` to the `Direccion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Foto` to the `FotoProducto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UsuarioId` to the `MetodoPago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Nombre` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `compra` DROP FOREIGN KEY `Compra_TipoEstadoId_fkey`;

-- DropForeignKey
ALTER TABLE `direccion` DROP FOREIGN KEY `Direccion_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `metodopago` DROP FOREIGN KEY `MetodoPago_usuarioId_fkey`;

-- DropIndex
DROP INDEX `Usuario_email_key` ON `usuario`;

-- AlterTable
ALTER TABLE `compra` DROP COLUMN `TipoEstadoId`,
    ADD COLUMN `EstadoCompraId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `direccion` DROP COLUMN `usuarioId`,
    ADD COLUMN `UsuarioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `fotoproducto` ADD COLUMN `Foto` LONGBLOB NOT NULL;

-- AlterTable
ALTER TABLE `metodopago` DROP COLUMN `usuarioId`,
    ADD COLUMN `UsuarioId` INTEGER NOT NULL,
    MODIFY `NumeroCuenta` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `email`,
    DROP COLUMN `nombre`,
    ADD COLUMN `Email` VARCHAR(191) NOT NULL,
    ADD COLUMN `Nombre` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `tipoestado`;

-- CreateTable
CREATE TABLE `EstadoCompra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Descripcion` VARCHAR(191) NOT NULL,
    `Borrado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_Email_key` ON `Usuario`(`Email`);

-- AddForeignKey
ALTER TABLE `MetodoPago` ADD CONSTRAINT `MetodoPago_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Direccion` ADD CONSTRAINT `Direccion_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_EstadoCompraId_fkey` FOREIGN KEY (`EstadoCompraId`) REFERENCES `EstadoCompra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
