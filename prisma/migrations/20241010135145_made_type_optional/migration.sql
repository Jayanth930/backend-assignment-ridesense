-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bikes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "type" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_bikes" ("createdAt", "id", "make", "model", "type", "updatedAt", "year") SELECT "createdAt", "id", "make", "model", "type", "updatedAt", "year" FROM "bikes";
DROP TABLE "bikes";
ALTER TABLE "new_bikes" RENAME TO "bikes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
