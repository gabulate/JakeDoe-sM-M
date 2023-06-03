/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `fotoproducto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `fotoproducto` DROP FOREIGN KEY `FotoProducto_categoriaId_fkey`;

-- AlterTable
ALTER TABLE `fotoproducto` DROP COLUMN `categoriaId`;
