-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Apellido` VARCHAR(191) NOT NULL,
    `Telefono` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Contrasenna` VARCHAR(191) NOT NULL,
    `Calificacion` DECIMAL(10, 2) NOT NULL,
    `Deshabilitado` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Usuario_Email_key`(`Email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Descripcion` VARCHAR(191) NOT NULL,
    `Borrado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolOnUsuario` (
    `RolId` INTEGER NOT NULL,
    `UsuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`RolId`, `UsuarioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoPago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Descripcion` VARCHAR(191) NOT NULL,
    `Borrado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MetodoPago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `UsuarioId` INTEGER NOT NULL,
    `TipoPagoId` INTEGER NOT NULL,
    `NumeroCuenta` VARCHAR(191) NOT NULL,
    `Expiracion` DATETIME(3) NOT NULL,
    `Titulo` VARCHAR(191) NOT NULL,
    `Borrado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Direccion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `UsuarioId` INTEGER NOT NULL,
    `Provincia` VARCHAR(191) NOT NULL,
    `Canton` VARCHAR(191) NOT NULL,
    `Distrito` VARCHAR(191) NOT NULL,
    `Detalle` VARCHAR(191) NOT NULL,
    `CodigoPostal` VARCHAR(191) NOT NULL,
    `Telefono` VARCHAR(191) NOT NULL,
    `Titulo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NOT NULL,
    `Precio` DECIMAL(10, 2) NOT NULL,
    `Cantidad` INTEGER NOT NULL,
    `CategoriaId` INTEGER NOT NULL,
    `EstadoId` INTEGER NOT NULL,
    `VendedorId` INTEGER NOT NULL,
    `Borrado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Descripcion` VARCHAR(191) NOT NULL,
    `Borrado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EstadoProducto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Descripcion` VARCHAR(191) NOT NULL,
    `Borrado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FotoProducto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ProductoId` INTEGER NOT NULL,
    `Foto` LONGBLOB NOT NULL,
    `Borrado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mensaje` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ClienteId` INTEGER NOT NULL,
    `ProductoId` INTEGER NOT NULL,
    `Pregunta` VARCHAR(191) NOT NULL,
    `Respuesta` VARCHAR(191) NULL,
    `Borrado` BOOLEAN NOT NULL DEFAULT false,
    `Fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EstadoCompra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Descripcion` VARCHAR(191) NOT NULL,
    `Borrado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ClienteId` INTEGER NOT NULL,
    `DireccionId` INTEGER NOT NULL,
    `MetodoPagoId` INTEGER NOT NULL,
    `Subtotal` DECIMAL(10, 2) NOT NULL,
    `Total` DECIMAL(10, 2) NOT NULL,
    `Fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Borrado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompraDetalle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `CompraId` INTEGER NOT NULL,
    `ProductoId` INTEGER NOT NULL,
    `Cantidad` INTEGER NOT NULL,
    `Subtotal` DECIMAL(10, 2) NOT NULL,
    `EstadoCompraId` INTEGER NOT NULL DEFAULT 1,
    `Borrado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evaluacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `CompraId` INTEGER NOT NULL,
    `EvaluadorId` INTEGER NOT NULL,
    `EvaluadoId` INTEGER NOT NULL,
    `Calificacion` INTEGER NOT NULL,
    `Borrado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RolOnUsuario` ADD CONSTRAINT `RolOnUsuario_RolId_fkey` FOREIGN KEY (`RolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolOnUsuario` ADD CONSTRAINT `RolOnUsuario_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MetodoPago` ADD CONSTRAINT `MetodoPago_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MetodoPago` ADD CONSTRAINT `MetodoPago_TipoPagoId_fkey` FOREIGN KEY (`TipoPagoId`) REFERENCES `TipoPago`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Direccion` ADD CONSTRAINT `Direccion_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_CategoriaId_fkey` FOREIGN KEY (`CategoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_EstadoId_fkey` FOREIGN KEY (`EstadoId`) REFERENCES `EstadoProducto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_VendedorId_fkey` FOREIGN KEY (`VendedorId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FotoProducto` ADD CONSTRAINT `FotoProducto_ProductoId_fkey` FOREIGN KEY (`ProductoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensaje` ADD CONSTRAINT `Mensaje_ClienteId_fkey` FOREIGN KEY (`ClienteId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensaje` ADD CONSTRAINT `Mensaje_ProductoId_fkey` FOREIGN KEY (`ProductoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_ClienteId_fkey` FOREIGN KEY (`ClienteId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_DireccionId_fkey` FOREIGN KEY (`DireccionId`) REFERENCES `Direccion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_MetodoPagoId_fkey` FOREIGN KEY (`MetodoPagoId`) REFERENCES `MetodoPago`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompraDetalle` ADD CONSTRAINT `CompraDetalle_CompraId_fkey` FOREIGN KEY (`CompraId`) REFERENCES `Compra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompraDetalle` ADD CONSTRAINT `CompraDetalle_ProductoId_fkey` FOREIGN KEY (`ProductoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompraDetalle` ADD CONSTRAINT `CompraDetalle_EstadoCompraId_fkey` FOREIGN KEY (`EstadoCompraId`) REFERENCES `EstadoCompra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluacion` ADD CONSTRAINT `Evaluacion_CompraId_fkey` FOREIGN KEY (`CompraId`) REFERENCES `Compra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluacion` ADD CONSTRAINT `Evaluacion_EvaluadorId_fkey` FOREIGN KEY (`EvaluadorId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluacion` ADD CONSTRAINT `Evaluacion_EvaluadoId_fkey` FOREIGN KEY (`EvaluadoId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
