/*
  Warnings:

  - Added the required column `payload` to the `Devices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Devices` ADD COLUMN `payload` JSON NOT NULL;
