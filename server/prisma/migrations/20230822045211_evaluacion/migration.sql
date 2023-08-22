/*
  Warnings:

  - Added the required column `Comentario` to the `Evaluacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `evaluacion` ADD COLUMN `Comentario` VARCHAR(191) NOT NULL;
