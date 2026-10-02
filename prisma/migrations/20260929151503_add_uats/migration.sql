-- CreateTable
CREATE TABLE "uats" (
    "id" SERIAL NOT NULL,
    "county_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "siruta" INTEGER NOT NULL,
    "svg_path" TEXT NOT NULL,
    "is_residence" BOOLEAN NOT NULL DEFAULT false,
    "slots_status" INTEGER,
    "population" INTEGER,
    "hall_mail" TEXT,
    "petition_link" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "uats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uats_siruta_key" ON "uats"("siruta");

-- AddForeignKey
ALTER TABLE "uats" ADD CONSTRAINT "uats_county_id_fkey" FOREIGN KEY ("county_id") REFERENCES "counties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
