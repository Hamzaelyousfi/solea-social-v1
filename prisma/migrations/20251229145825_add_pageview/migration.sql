-- CreateEnum
CREATE TYPE "TrafficSource" AS ENUM ('DIRECT', 'INSTAGRAM', 'GOOGLE', 'LINKEDIN', 'FACEBOOK', 'REFERRAL', 'OTHER');

-- CreateTable
CREATE TABLE "PageView" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "referrer" TEXT,
    "source" "TrafficSource" NOT NULL,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PageView_createdAt_idx" ON "PageView"("createdAt");

-- CreateIndex
CREATE INDEX "PageView_source_createdAt_idx" ON "PageView"("source", "createdAt");
