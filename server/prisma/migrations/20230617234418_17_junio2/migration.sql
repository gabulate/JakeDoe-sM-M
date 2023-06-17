/*
  Warnings:

  - You are about to drop the column `EstadoCompraId` on the `compra` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `compra` DROP FOREIGN KEY `Compra_EstadoCompraId_fkey`;

-- AlterTable
ALTER TABLE `compra` DROP COLUMN `EstadoCompraId`;

-- AlterTable
ALTER TABLE `compradetalle` ADD COLUMN `EstadoCompraId` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `CompraDetalle` ADD CONSTRAINT `CompraDetalle_EstadoCompraId_fkey` FOREIGN KEY (`EstadoCompraId`) REFERENCES `EstadoCompra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
