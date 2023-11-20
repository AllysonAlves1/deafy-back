/*
  Warnings:

  - You are about to drop the column `file_path` on the `Audios` table. All the data in the column will be lost.
  - Added the required column `audio` to the `Audios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Audios` DROP COLUMN `file_path`,
    ADD COLUMN `audio` VARCHAR(191) NOT NULL;
