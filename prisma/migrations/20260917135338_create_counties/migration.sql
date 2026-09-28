-- CreateTable
CREATE TABLE "counties" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "svg_path" TEXT NOT NULL,
    "view_box" TEXT NOT NULL,
    "label_x" DOUBLE PRECISION NOT NULL,
    "label_y" DOUBLE PRECISION NOT NULL,
    "petition_url" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "counties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "counties_slug_key" ON "counties"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "counties_code_key" ON "counties"("code");
