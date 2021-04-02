/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[login]` on the table `User`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User.login_unique" ON "User"("login");
